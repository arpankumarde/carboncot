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

    // Call OpenAI to summarize
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a carbon credit project analyst. Summarize the project information in less than 6 lines, focusing on key highlights, impact, and value proposition. Use markdown formatting for better readability.",
        },
        {
          role: "user",
          content: `Summarize this carbon credit project:\n\n${projectInfo}`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const summary =
      completion.choices[0]?.message?.content ||
      "Unable to generate summary at this time.";

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("Error summarizing project:", error);
    return NextResponse.json(
      { error: "Failed to generate summary", details: error.message },
      { status: 500 }
    );
  }
}

