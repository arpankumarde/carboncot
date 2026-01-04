import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import RetirementForm from "./RetirementForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, LeafIcon, GlobeIcon } from "lucide-react";
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
    },
  });

  if (!project) {
    return notFound();
  }

  // Calculate total retirements and remaining supply
  const totalRetirements = project.retirements.reduce(
    (sum, retirement) => sum + Number(retirement.creditsRetired),
    0
  );

  const availableTonnes = project.creditsAvailable - totalRetirements;

  return (
    <div className="min-h-screen bg-white">
      {/* Project Header Banner */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.standard}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.vintageYear}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.projectType}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.standard}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Statement */}
            <Card className="bg-green-50 border-green-200 py-4">
              <CardContent>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-green-900 font-medium">
                      You&apos;re making a positive impact! These carbon credits
                      are independently verified and will be retired from
                      circulation.
                    </p>
                    <p className="text-sm text-green-800">
                      Retirement permanently removes a carbon credit from
                      circulation so it cannot be resold or reused, ensuring
                      that only the retiring party can claim its environmental
                      benefit while also preventing double counting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Introduction Text */}
            <Card className="py-4">
              <CardContent>
                <p className="text-slate-700">
                  You are retiring carbon credits. This information will be
                  public to verify your environmental claims. You can retire
                  credits for yourself or on behalf of an organization.
                </p>
              </CardContent>
            </Card>

            {/* Retirement Form */}
            <RetirementForm
              projectId={id}
              projectName={project.name}
              pricePerCredit={Number(project.pricePerCredit)}
              availableTonnes={availableTonnes}
            />
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Total Price Card */}
            <Card>
              <CardHeader>
                <CardTitle>Total price.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Amount to retire:</span>
                  <span className="font-semibold" id="amount-display">
                    0 tonnes
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Price per tonne:</span>
                  <span className="font-semibold">
                    ${Number(project.pricePerCredit).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Platform fees:</span>
                  <span className="font-semibold" id="platform-fees">
                    $0.00
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">
                      Total cost:
                    </span>
                    <span
                      className="font-bold text-lg text-slate-900"
                      id="total-cost"
                    >
                      $0.00
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Snapshot */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <LeafIcon className="w-5 h-5 text-green-600" />
                  <CardTitle>Project Snapshot</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-slate-700">
                  {project.projectType} project in {project.country}
                  {project.region && `, ${project.region}`}.
                </p>
                <p className="text-sm text-slate-600">
                  Vintage {project.vintageYear} | Verified by {project.standard}
                  .
                </p>
              </CardContent>
            </Card>

            {/* Asset Details */}
            <Card>
              <CardHeader>
                <CardTitle>Asset details.</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-600">Retiring Token:</span>
                  <span className="font-semibold">
                    {project.standard}-{project.vintageYear}
                  </span>
                  <GlobeIcon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm">
                  <span className="text-slate-600">Available to retire: </span>
                  <span className="font-semibold">
                    {availableTonnes.toLocaleString()} Tonnes
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
