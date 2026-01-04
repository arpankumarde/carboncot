import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      projectId,
      userId,
      firstName,
      lastName,
      email,
      beneficiaryName,
      purpose,
      creditsRetired,
    } = body;

    // Validate required fields
    if (!projectId || !beneficiaryName || !creditsRetired) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or find user if email is provided
    let finalUserId = userId;
    if (email && firstName) {
      try {
        // Try to find existing user by email
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Create new user if doesn't exist
          user = await prisma.user.create({
            data: {
              email,
              firstName,
              lastName: lastName || null,
            },
          });
        } else {
          // Update user info if exists but info might be different
          user = await prisma.user.update({
            where: { email },
            data: {
              firstName,
              lastName: lastName || user.lastName,
            },
          });
        }

        finalUserId = user.id;
      } catch (error: any) {
        // If user creation fails (e.g., duplicate email), try to find user
        if (error.code === "P2002") {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (user) {
            finalUserId = user.id;
          }
        } else {
          console.error("User creation/update error:", error);
        }
      }
    }

    // Check if project exists and has enough credits
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        retirements: {
          select: {
            creditsRetired: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Calculate available credits
    const totalRetired = project.retirements.reduce(
      (sum, r) => sum + Number(r.creditsRetired),
      0
    );
    const available = project.creditsAvailable - totalRetired;

    if (Number(creditsRetired) > available) {
      return NextResponse.json(
        {
          error: `Not enough credits available. Only ${available} tonnes available.`,
        },
        { status: 400 }
      );
    }

    // Create retirement
    const retirement = await prisma.retirement.create({
      data: {
        projectId,
        userId: finalUserId || null,
        beneficiaryName,
        purpose: purpose || null,
        creditsRetired: Number(creditsRetired),
      },
      include: {
        project: {
          select: {
            name: true,
            standard: true,
            vintageYear: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        retirement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/retirements error:", error);
    return NextResponse.json(
      { error: "Failed to create retirement" },
      { status: 500 }
    );
  }
}
