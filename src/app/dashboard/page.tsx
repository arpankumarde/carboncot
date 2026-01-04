import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leaf, Award, ExternalLink, ArrowLeft } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("auth_user")?.value;
    const role = cookieStore.get("auth_role")?.value;

    if (!userId || role !== "user") {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            retirements: {
                include: {
                    project: true,
                },
                orderBy: {
                    retirementDate: "desc",
                },
            },
        },
    });

    if (!user) {
        redirect("/login");
    }

    const totalRetired = user.retirements.reduce(
        (acc, r) => acc + Number(r.creditsRetired),
        0
    );

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" className="text-slate-600">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-600">
                                Welcome back, {user.firstName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/projects">Retire More Credits</Link>
                        </Button>
                        <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <LogoutButton />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-green-600 text-white border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-green-100">
                                Total Carbon Retired
                            </CardTitle>
                            <Leaf className="h-4 w-4 text-green-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalRetired.toFixed(2)} tCO₂e
                            </div>
                            <p className="text-xs text-green-100 mt-1">
                                Lifetime impact
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Retirements
                            </CardTitle>
                            <Award className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {user.retirements.length}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Total transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <h2 className="text-xl font-semibold mb-4 text-slate-900">Recent Retirements</h2>
                <Card>
                    <CardContent className="p-0">
                        {user.retirements.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500 mb-4">You haven't retired any credits yet.</p>
                                <Button asChild variant="outline">
                                    <Link href="/projects">Browse Projects</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {user.retirements.map((retirement) => (
                                    <div
                                        key={retirement.id}
                                        className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div>
                                            <div className="font-medium text-slate-900">
                                                {retirement.project.name}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {new Date(retirement.retirementDate).toLocaleDateString()}
                                                {" • "}
                                                {retirement.beneficiaryName || "Self"}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-bold text-green-700">
                                                    {Number(retirement.creditsRetired).toFixed(2)} tCO₂e
                                                </div>
                                            </div>
                                            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Link href={`/certificate/${retirement.id}`} target="_blank">
                                                    <ExternalLink className="h-4 w-4" />
                                                    <span className="sr-only">View Certificate</span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
