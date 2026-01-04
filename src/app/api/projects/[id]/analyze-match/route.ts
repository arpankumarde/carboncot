import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { openai } from "@/lib/openai";
import sdgs from "@/data/sdgs";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { businessInfo } = await req.json();

    if (!businessInfo || typeof businessInfo !== "string" || businessInfo.trim().length === 0) {
      return NextResponse.json(
        { error: "Business information is required" },
        { status: 400 }
      );
    }

    // Fetch project with all necessary data
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        retirements: {
          select: {
            creditsRetired: true,
          },
        },
        supplier: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Calculate total retirements
    const totalRetirements = project.retirements.reduce(
      (sum, retirement) => sum + Number(retirement.creditsRetired),
      0
    );
    const totalRemainingSupply = project.creditsAvailable - totalRetirements;

    // Get project SDGs
    const projectSDGs = sdgs.filter((sdg) => project.sdgs.includes(sdg.id));

    // Build project summary text for OpenAI
    const projectInfo = `
Project Name: ${project.name}
Standard: ${project.standard}
Methodology: ${project.methodology}
Project Type: ${project.projectType}
Location: ${project.region ? `${project.region}, ` : ""}${project.country}
Vintage Year: ${project.vintageYear}
Credits Available: ${project.creditsAvailable}
Credits Retired: ${totalRetirements.toFixed(2)}
Remaining Supply: ${totalRemainingSupply}
Price per Credit: $${Number(project.pricePerCredit).toFixed(2)}
${project.description ? `Description: ${project.description}` : ""}
SDGs: ${projectSDGs.map((sdg) => sdg.name).join(", ")}
${project.certificationLink ? `Certification: ${project.certificationLink}` : ""}
`.trim();

    // Call OpenAI to analyze the match
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a carbon credit consultant. Provide a very brief analysis (maximum 100 words) of whether the carbon credit project matches the business. Include match assessment (Good/Moderate/Poor Match) and key reasons. Be concise and direct.",
        },
        {
          role: "user",
          content: `Analyze if this carbon credit project is a good match for this business (respond in maximum 100 words):\n\n**Business Information:**\n${businessInfo}\n\n**Project Information:**\n${projectInfo}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const analysis =
      completion.choices[0]?.message?.content ||
      "Unable to generate analysis at this time.";

    return NextResponse.json({ analysis });
  } catch (error: unknown) {
    console.error("Error analyzing project match:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate analysis", details: errorMessage },
      { status: 500 }
    );
  }
}

