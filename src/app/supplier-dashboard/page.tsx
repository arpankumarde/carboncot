import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, ArrowLeft } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function SupplierDashboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("auth_user")?.value;
    const role = cookieStore.get("auth_role")?.value;

    if (!userId || role !== "supplier") {
        redirect("/login");
    }

    const supplier = await prisma.supplier.findUnique({
        where: { id: userId },
        include: {
            projects: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!supplier) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" className="text-slate-600">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Supplier Dashboard</h1>
                            <p className="text-slate-600">
                                Welcome back, {supplier.firstName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/sell">List New Project</Link>
                        </Button>
                        <div className="bg-white p-2 rounded-lg border border-slate-200">
                            <LogoutButton />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-blue-600 text-white border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-blue-100">
                                Active Projects
                            </CardTitle>
                            <Briefcase className="h-4 w-4 text-blue-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {supplier.projects.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Projects List */}
                <h2 className="text-xl font-semibold mb-4 text-slate-900">Your Projects</h2>
                <Card>
                    <CardContent className="p-0">
                        {supplier.projects.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500 mb-4">No projects listed yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {supplier.projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div>
                                            <div className="font-medium text-slate-900">
                                                {project.name}
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {project.standard} • {project.country}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-blue-700">
                                                ${Number(project.pricePerCredit).toFixed(2)}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                per credit
                                            </div>
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
