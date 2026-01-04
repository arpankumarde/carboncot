import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, ExternalLinkIcon, CheckIcon } from "lucide-react";
import sdgs from "@/data/sdgs";
import Image from "next/image";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
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

  // Fetch last 5 retirements separately for display
  const recentRetirements = await prisma.retirement.findMany({
    where: {
      projectId: id,
    },
    orderBy: {
      retirementDate: "desc",
    },
    take: 5,
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const totalRetirementsCount = await prisma.retirement.count({
    where: {
      projectId: id,
    },
  });

  if (!project) {
    return notFound();
  }

  // Calculate total retirements
  const totalRetirements = project.retirements.reduce(
    (sum, retirement) => sum + Number(retirement.creditsRetired),
    0
  );

  const totalRemainingSupply = project.creditsAvailable - totalRetirements;

  // Get project SDGs
  const projectSDGs = sdgs.filter((sdg) => project.sdgs.includes(sdg.id));

  // Project image - use project imageUrl or fallback
  const projectImage =
    project.imageUrl ||
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop";

  // Build Google Maps query string from region and country
  // Format: "region, country" with spaces as + and comma as %2C
  const locationParts = [project.region, project.country].filter(
    (part): part is string => Boolean(part)
  );

  const locationQuery = locationParts
    .map((part) => part.toLowerCase().replace(/\s+/g, "+"))
    .join("%2C+");

  const googleMapUrl = `https://maps.google.com/maps?q=${locationQuery}&t=k&z=11&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm md:text-base text-slate-300">
            <span>{project.standard}</span>
            <span>•</span>
            <span>{project.country}</span>
            <span>•</span>
            <span>{project.projectType}</span>
            <span>•</span>
            <span>ISO-14064-2</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Map */}
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="relative w-full h-96 bg-slate-100 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={googleMapUrl}
                    className="border-0"
                    title="Project Location Map"
                  />
                  <div className="absolute bottom-2 left-2 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded">
                    {project.region && `${project.region}, `}
                    {project.country}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Image */}
            <Card className="p-0">
              <CardContent className="p-0">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={projectImage}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description Section */}
            <Card>
              <CardHeader className="p-0">
                <CardTitle className="text-2xl sr-only">Description</CardTitle>
              </CardHeader>
              <CardContent>
                {project.description ? (
                  <div className="prose prose-slate max-w-none -mt-3">
                    <ReactMarkdown>{project.description}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-slate-600">No description available.</p>
                )}
              </CardContent>
            </Card>

            {/* Technology & Methodology Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Technology & Methodology
                </CardTitle>
                <p className="text-lg font-semibold text-slate-700 mt-2">
                  {project.methodology}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  This project follows the {project.methodology} methodology
                  under the {project.standard} standard, focusing on{" "}
                  {project.projectType.toLowerCase()} to deliver verified carbon
                  credits.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">
                    Seller listing
                  </div>
                  <div className="text-sm text-slate-500">
                    @
                    {project.supplier
                      ? `${project.supplier.firstName}${project.supplier.lastName
                        ? ` ${project.supplier.lastName}`
                        : ""
                        }`
                        .toLowerCase()
                        .replace(/\s+/g, "")
                      : "supplier"}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  ${Number(project.pricePerCredit).toFixed(2)}
                </div>
                <div className="text-sm text-slate-600">
                  Available tonnes:{" "}
                  <span className="font-semibold text-slate-900">
                    {totalRemainingSupply.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-600">Asset:</span>
                  <span className="font-semibold text-slate-900">
                    {project.standard}-{project.vintageYear}
                  </span>
                  {project.certificationLink && (
                    <a
                      href={project.certificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLinkIcon className="w-4 h-4 inline" />
                    </a>
                  )}
                </div>
                <div className="text-sm text-slate-600">
                  Vintage:{" "}
                  <span className="font-semibold text-slate-900">
                    {project.vintageYear}
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                >
                  <Link href={`/retire/${id}`}>RETIRE</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Registry Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>Registry</CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-4 h-4 text-slate-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Registry information and verification details</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center">
                    {project.standard.charAt(0) === "V" ? (
                      <Image
                        src="https://verra.org/wp-content/uploads/2022/10/VERIFIED-CARBON-STANDARD.svg"
                        alt="Verra Verified Carbon Standard"
                        className="size-8 object-contain"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-700">
                        {project.standard.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-slate-900">
                    {project.standard}
                  </span>
                </div>
                {project.certificationLink && (
                  <Link
                    href={project.certificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    View detailed project verification.
                    <ExternalLinkIcon className="w-3 h-3" />
                  </Link>
                )}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">
                      Verified & Certified
                    </span>
                  </div>
                  <p className="text-sm text-green-800">
                    Each credit represents one tonne of CO₂ emissions reduced,
                    removed, or avoided, as verified by registry-approved
                    third-party auditors.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sustainable Development Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Sustainable Development Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-4">
                  {projectSDGs.map((sdg) => (
                    <Image
                      key={sdg.id}
                      src={sdg.logo}
                      alt={sdg.name}
                      width={64}
                      height={64}
                      className="overflow-hidden border border-slate-200"
                    />
                  ))}
                </div>
                <Link
                  href="https://www.un.org/sustainabledevelopment/sustainable-development-goals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Learn more about the UN&apos;s SDGs.
                </Link>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Data for this project
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">
                        Total Retirements:
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="w-3 h-3 text-slate-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total credits retired from this project</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {totalRetirements.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (totalRetirements / project.creditsAvailable) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">
                        Total Remaining Supply:
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="w-3 h-3 text-slate-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Credits still available for purchase</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {totalRemainingSupply.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-yellow-100 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (totalRemainingSupply / project.creditsAvailable) *
                          100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Retirements Section */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Retirements</CardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  Latest credit retirements for this project
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentRetirements.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No retirements yet
                  </p>
                ) : (
                  <>
                    {recentRetirements.map((retirement) => (
                      <div
                        key={retirement.id}
                        className="border border-green-200 bg-green-50/50 rounded-lg p-3 hover:bg-green-50 transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 text-sm">
                              {retirement.beneficiaryName ||
                                (retirement.user
                                  ? `${retirement.user.firstName}${retirement.user.lastName
                                    ? ` ${retirement.user.lastName}`
                                    : ""
                                  }`
                                  : "Anonymous")}
                            </div>
                            {retirement.purpose && (
                              <div className="text-xs text-slate-600 mt-1 line-clamp-1">
                                {retirement.purpose}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-800">
                              {Number(retirement.creditsRetired).toFixed(2)}
                            </div>
                            <div className="text-xs text-slate-500">
                              tCO₂e
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500">
                          {new Date(retirement.retirementDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    ))}
                    {totalRetirementsCount > 5 && (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 mt-2"
                      >
                        <Link href={`/projects/${id}/retirements`}>
                          View All Retirements
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
