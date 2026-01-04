import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import QRCode from "react-qr-code";
import PrintButton from "./PrintButton";
import DownloadPDFButton from "./DownloadPDFButton";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `CarbonCot - Proof of Retirement - ${id}`,
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const retirement = await prisma.retirement.findUnique({
    where: {
      id,
    },
    include: {
      project: {
        select: {
          name: true,
          standard: true,
          vintageYear: true,
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  if (!retirement) {
    return notFound();
  }

  const retirementDate = new Date(retirement.retirementDate);
  const formattedDate = retirementDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedDateShort = retirementDate
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();

  const certificateUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/certificate/${id}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 print:py-0 print:bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Certificate Document */}
        <div
          id="certificate-content"
          className="relative bg-white border-4 border-green-600 shadow-2xl p-8 md:p-12 print:shadow-none print:border-4 print:border-green-600"
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-green-600">
            <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-green-400"></div>
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-green-300"></div>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-green-600">
            <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-green-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-green-300"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-green-600">
            <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-green-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-green-300"></div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-green-600">
            <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-green-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-green-300"></div>
          </div>

          {/* Decorative Top Border Pattern */}
          <div className="absolute top-0 left-24 right-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          <div className="absolute bottom-0 left-24 right-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>

          {/* Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute -top-2 -left-4 -right-4 -bottom-2 bg-green-100 rounded-full opacity-50"></div>
                <span className="relative text-4xl font-serif font-bold text-green-800">
                  CarbonCot
                </span>
              </div>
            </div>
            <div className="flex items-start justify-between print:justify-center mb-8">
              <h1 className="text-3xl font-bold print:text-center">
                <span className="text-slate-900">Proof of Retirement</span>
              </h1>
              <div className="print:hidden flex items-center gap-2 text-slate-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <CalendarIcon className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium">
                  {formattedDateShort}
                </span>
              </div>
            </div>
          </div>
          {/* Decorative Seal/Emblem */}
          {/* <div className="relative z-10 flex justify-center my-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30"></div>
              <div className="relative w-20 h-20 border-4 border-green-600 rounded-full flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-2 border-green-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Main Content - Two Column Layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Main Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Large Tonnes Number */}
              <div className="text-center md:text-left relative">
                {/* <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-green-500 to-green-400 rounded-full"></div> */}
                <div className="text-7xl md:text-8xl font-bold text-blue-600 mb-2 drop-shadow-sm">
                  {Number(retirement.creditsRetired).toLocaleString()}
                </div>
                <p className="text-sm uppercase tracking-wider text-slate-700 font-medium">
                  Verified Tonnes of Carbon Retired
                </p>
              </div>

              {/* Beneficiary Section */}
              <div className="space-y-2 relative pl-6 border-l-2 border-green-200">
                <p className="text-xs uppercase tracking-wider text-slate-600">
                  On Behalf Of
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {retirement.beneficiaryName}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="relative pl-6 border-l-2 border-green-200">
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl italic">
                  This represents the permanent retirement of carbon credits.
                  This retirement and the associated data are immutable public
                  records.
                </p>
              </div>

              {/* Retirement Message */}
              {retirement.purpose && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-6">
                  <p className="text-xs uppercase tracking-wider text-slate-700 font-semibold mb-3">
                    Retirement Message
                  </p>
                  <p className="text-slate-800 italic leading-relaxed">
                    &quot;{retirement.purpose}&quot;
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <Link
                  href={`/projects/${retirement.projectId}`}
                  className="block"
                >
                  <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                    Project
                  </p>
                  <p className="text-slate-900 font-semibold">
                    {retirement.project.name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {retirement.project.standard} • Vintage{" "}
                    {retirement.project.vintageYear}
                  </p>
                </Link>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                    Retirement Date
                  </p>
                  <p className="text-slate-900 font-semibold">
                    {formattedDate}
                  </p>
                </div>
                {retirement.user && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                      Retired By
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {retirement.user.firstName}
                      {retirement.user.lastName &&
                        ` ${retirement.user.lastName}`}
                    </p>
                    <p className="text-sm text-slate-600">
                      {retirement.user.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Decorative Pattern */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full opacity-10">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <pattern
                        id="leaf-pattern"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M20,20 Q30,10 40,20 T20,20"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="200" height="200" fill="url(#leaf-pattern)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Section - Certificate ID and QR Code */}
          <div className="relative z-10 border-t-2 border-green-200 pt-8 mt-8">
            {/* Decorative divider */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-white border-4 border-green-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-green-100 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Certificate ID */}
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-600 mb-2">
                  Certificate ID
                </p>
                <p className="text-sm font-mono text-slate-900 break-all">
                  {id}
                </p>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="bg-white p-3 border-2 border-green-200 rounded-lg shadow-sm relative">
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full"></div>
                  <QRCode
                    value={certificateUrl}
                    size={120}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox="0 0 120 120"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Hidden on Print */}
        <div className="print:hidden mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <DownloadPDFButton />
          <PrintButton />
          <Button variant="outline" asChild>
            <Link href={`/projects/${retirement.projectId}`}>View Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
