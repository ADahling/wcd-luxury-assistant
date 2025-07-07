
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await prisma.client.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
      include: {
        documents: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const client = await prisma.client.updateMany({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
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
        driveLink
      }
    });

    if (client.count === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const updatedClient = await prisma.client.findUnique({
      where: { id: params.id }
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await prisma.client.deleteMany({
      where: { 
        id: params.id,
        userId: session.user.id 
      }
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
