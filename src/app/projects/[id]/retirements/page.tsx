import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProjectRetirementsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { id },
        select: {
            name: true,
            standard: true,
            country: true,
            projectType: true,
        },
    });

    if (!project) {
        return notFound();
    }

    const retirements = await prisma.retirement.findMany({
        where: { projectId: id },
        orderBy: { retirementDate: "desc" },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            certificate: {
                select: {
                    fileUrl: true,
                    serialNumber: true,
                },
            },
        },
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-12 px-4">
                <div className="container mx-auto">
                    <Button
                        asChild
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-white/10 mb-6 -ml-4"
                    >
                        <Link href={`/projects/${id}`}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Project
                        </Link>
                    </Button>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Retirements Registry
                    </h1>
                    <p className="text-xl text-slate-300">
                        {project.name}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mt-2">
                        <span>{project.standard}</span>
                        <span>•</span>
                        <span>{project.country}</span>
                        <span>•</span>
                        <span>{project.projectType}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>All Retirements ({retirements.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {retirements.length === 0 ? (
                            <p className="text-center text-slate-500 py-8">
                                No retirements found for this project.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Beneficiary</TableHead>
                                        <TableHead>Certificate</TableHead>
                                        <TableHead>Purpose</TableHead>
                                        <TableHead className="text-right">Amount (tCO₂e)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {retirements.map((retirement) => (
                                        <TableRow key={retirement.id}>
                                            <TableCell className="font-medium whitespace-nowrap">
                                                {new Date(retirement.retirementDate).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-slate-900">
                                                    {retirement.beneficiaryName ||
                                                        (retirement.user
                                                            ? `${retirement.user.firstName}${retirement.user.lastName
                                                                ? ` ${retirement.user.lastName}`
                                                                : ""
                                                            }`
                                                            : "Anonymous")}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <a
                                                    href={`/certificate/${retirement.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                                                >
                                                    View Certificate
                                                </a>
                                            </TableCell>
                                            <TableCell className="text-slate-600 max-w-xs truncate">
                                                {retirement.purpose || "-"}
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-green-700">
                                                {Number(retirement.creditsRetired).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}
