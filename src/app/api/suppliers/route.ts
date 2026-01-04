export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, standards, otherStandard } = body;

    if (!firstName || !email || !standards?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.create({
      data: {
        firstName,
        lastName,
        email,
        standards,
        otherStandard: otherStandard || null,
      },
    });

    return NextResponse.json(supplier, { status: 201 });
  } catch (error: any) {
    console.error("SUPPLIER CREATE ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Supplier with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit supplier application" },
      { status: 500 }
    );
  }
}
