import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { certificateId } = body;

        if (!certificateId) {
            return NextResponse.json(
                { message: "Certificate ID is required" },
                { status: 400 }
            );
        }

        const retirement = await prisma.retirement.findUnique({
            where: {
                id: certificateId,
            },
        });

        if (retirement) {
            return NextResponse.json(
                { valid: true, id: retirement.id },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { valid: false, message: "Certificate not found" },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
