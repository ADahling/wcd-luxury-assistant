
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

    const clients = await prisma.client.findMany({
      where: { userId: session.user.id },
      include: {
        documents: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
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
    const {
      name,
      address,
      phone,
      email,
      referralSource,
      loyaltyReward,
      followUpDate,
      reminders,
      notes,
      driveLink
    } = body;

    const client = await prisma.client.create({
      data: {
        name,
        address,
        phone,
        email,
        referralSource,
        loyaltyReward,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        reminders,
        notes,
        driveLink,
        userId: session.user.id
      }
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
