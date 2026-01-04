import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Default password check
        if (password !== "12345678") {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 1. Check User Table
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (user) {
            const cookieStore = await cookies();
            cookieStore.set("auth_user", user.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });
            cookieStore.set("auth_role", "user", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });

            return NextResponse.json(
                {
                    message: "Login successful",
                    redirectUrl: "/dashboard",
                    user: { id: user.id, email: user.email, name: user.firstName },
                },
                { status: 200 }
            );
        }

        // 2. Check Supplier Table
        const supplier = await prisma.supplier.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (supplier) {
            const cookieStore = await cookies();
            cookieStore.set("auth_user", supplier.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            });
            cookieStore.set("auth_role", "supplier", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });

            return NextResponse.json(
                {
                    message: "Login successful",
                    redirectUrl: "/supplier-dashboard",
                    user: { id: supplier.id, email: supplier.email, name: supplier.firstName },
                },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: "Account not found" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
