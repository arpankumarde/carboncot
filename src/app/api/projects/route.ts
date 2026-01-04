import { NextResponse } from "next/server";
import  prisma from "@/lib/prisma";
export const runtime = "nodejs";

/**
 * GET /api/projects
 * Supports:
 * - search
 * - country[]
 * - methodology[]
 * - standard[]
 * - vintage[]
 * - sdgs[]
 * - sort
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";

    const country = searchParams.getAll("country");
    const methodology = searchParams.getAll("methodology");
    const standard = searchParams.getAll("standard");
    const vintage = searchParams.getAll("vintage").map(Number);
    const sdgs = searchParams.getAll("sdgs").map(Number);

    const sort = searchParams.get("sort") || "price_desc";

    /* ---------------- Sorting ---------------- */
    let orderBy: any = { pricePerCredit: "desc" };

    if (sort === "price_asc") orderBy = { pricePerCredit: "asc" };
    if (sort === "vintage_desc") orderBy = { vintageYear: "desc" };
    if (sort === "vintage_asc") orderBy = { vintageYear: "asc" };
    if (sort === "latest") orderBy = { createdAt: "desc" };

    /* ---------------- Prisma Query ---------------- */
    const projects = await prisma.project.findMany({
      where: {
        AND: [
          search
            ? {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},

          country.length ? { country: { in: country } } : {},
          methodology.length ? { methodology: { in: methodology } } : {},
          standard.length ? { standard: { in: standard } } : {},
          vintage.length ? { vintageYear: { in: vintage } } : {},
          sdgs.length ? { sdgs: { hasSome: sdgs } } : {},
        ],
      },
      orderBy,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
