
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalClients, activeJobs, pendingFollowUps, recentDocuments] = await Promise.all([
      // Total clients
      prisma.client.count({
        where: { userId: session.user.id }
      }),
      
      // Active jobs (documents that are SENT or APPROVED)
      prisma.document.count({
        where: { 
          userId: session.user.id,
          status: { in: ['SENT', 'APPROVED'] }
        }
      }),
      
      // Pending follow-ups (clients with follow-up dates in the future)
      prisma.client.count({
        where: { 
          userId: session.user.id,
          followUpDate: {
            gte: new Date()
          }
        }
      }),
      
      // Recent documents (last 5)
      prisma.document.findMany({
        where: { userId: session.user.id },
        include: {
          client: {
            select: { name: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    return NextResponse.json({
      totalClients,
      activeJobs,
      pendingFollowUps,
      recentDocuments: recentDocuments.map(doc => ({
        id: doc.id,
        docNumber: doc.docNumber.toString(),
        docType: doc.docType,
        clientName: doc.client.name,
        total: doc.total.toString(),
        status: doc.status,
        date: doc.createdAt
      }))
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
