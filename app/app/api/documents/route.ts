
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

    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
      include: {
        client: true,
        lineItems: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { docType, clientId, jobType, services, lineItems, driveLink } = body;

    // Get next document number
    let counter = await prisma.documentCounter.findUnique({
      where: { id: "counter" }
    });

    if (!counter) {
      counter = await prisma.documentCounter.create({
        data: { id: "counter", current: 1986 }
      });
    }

    const docNumber = counter.current;

    // Calculate total from line items
    const total = lineItems?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || 0;

    const document = await prisma.document.create({
      data: {
        docNumber,
        docType,
        clientId,
        jobType,
        services: services || "",
        total,
        driveLink,
        userId: session.user.id,
        lineItems: {
          create: lineItems?.map((item: any) => ({
            description: item.description,
            quantity: item.quantity || 1,
            rate: item.rate || 0,
            amount: item.amount || 0
          })) || []
        }
      },
      include: {
        client: true,
        lineItems: true
      }
    });

    // Increment counter
    await prisma.documentCounter.update({
      where: { id: "counter" },
      data: { current: counter.current + 1 }
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
