
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

    const document = await prisma.document.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
      include: {
        client: true,
        lineItems: true
      }
    });

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
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
    const { status, services, lineItems, driveLink } = body;

    // Calculate total from line items
    const total = lineItems?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || 0;

    // Update document
    const document = await prisma.document.updateMany({
      where: { 
        id: params.id,
        userId: session.user.id 
      },
      data: {
        status,
        services: services || "",
        total,
        driveLink
      }
    });

    if (document.count === 0) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Update line items if provided
    if (lineItems) {
      // Delete existing line items
      await prisma.lineItem.deleteMany({
        where: { documentId: params.id }
      });

      // Create new line items
      await prisma.lineItem.createMany({
        data: lineItems.map((item: any) => ({
          documentId: params.id,
          description: item.description,
          quantity: item.quantity || 1,
          rate: item.rate || 0,
          amount: item.amount || 0
        }))
      });
    }

    const updatedDocument = await prisma.document.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        lineItems: true
      }
    });

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
