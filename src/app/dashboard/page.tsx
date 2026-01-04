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
    const isLoggedIn = userId && role === "user";

    let user;
    if (isLoggedIn) {
        user = await prisma.user.findUnique({
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
    } else {
        // Fallback to Demo User
        user = await prisma.user.findUnique({
            where: { email: "arpan@steelforce.com" },
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
    }

    if (!user) {
        redirect("/login");
    }

    const totalRetired = user.retirements.reduce(
        (acc, r) => acc + Number(r.creditsRetired),
        0
    );

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-green-800 to-green-600 rounded-b-[3rem] shadow-xl z-0" />

            <div className="container mx-auto px-4 z-10 relative pt-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 text-white">
                    <div className="flex items-start gap-4">
                        <Button asChild variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 -ml-2">
                            <Link href="/">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-green-100 text-lg mt-1 font-light opacity-90">
                                Welcome back, <span className="font-semibold">{user.firstName}</span> {(!isLoggedIn) && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-2">Demo View</span>}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button asChild className="bg-white text-green-800 hover:bg-green-50 shadow-lg border-0">
                            <Link href="/projects">
                                <Leaf className="w-4 h-4 mr-2" />
                                Retire More Credits
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-white/95 backdrop-blur shadow-xl border-green-100 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Leaf className="w-24 h-24 text-green-600" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Total Carbon Retired
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-slate-900">{totalRetired.toFixed(2)}</span>
                                <span className="text-lg font-medium text-green-600">tCO₂e</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Lifetime positive impact on the planet
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/95 backdrop-blur shadow-xl border-green-100 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award className="w-24 h-24 text-blue-600" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                Retirements
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-slate-900">{user.retirements.length}</span>
                                <span className="text-lg font-medium text-slate-600">Certificates</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Total verified transactions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Retirements Section */}
                <div className="pb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Award className="w-6 h-6 text-green-600" />
                        Retirement Portfolio
                    </h2>

                    {user.retirements.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Start Your Journey</h3>
                            <p className="text-slate-500 mb-6 max-w-md mx-auto">You haven't retired any credits yet. Explore our projects to make your first contribution to a greener future.</p>
                            <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
                                <Link href="/projects">Browse Projects</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.retirements.map((retirement) => (
                                <Card key={retirement.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 p-0">
                                    <div className="relative h-48 overflow-hidden bg-slate-100">
                                        {retirement.project.imageUrl ? (
                                            <img
                                                src={retirement.project.imageUrl}
                                                alt={retirement.project.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-slate-300">
                                                <Leaf className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-xs font-bold text-green-700">
                                            {Number(retirement.creditsRetired).toFixed(2)} tCO₂e
                                        </div>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="mb-4">
                                            <div className="text-xs text-slate-500 mb-1">
                                                {new Date(retirement.retirementDate).toLocaleDateString(undefined, {
                                                    year: "numeric", month: "long", day: "numeric"
                                                })}
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 line-clamp-1" title={retirement.project.name}>
                                                {retirement.project.name}
                                            </h3>
                                            <div className="text-sm text-slate-600 line-clamp-2 md:h-10">
                                                On behalf of: <span className="font-medium text-slate-900">{retirement.beneficiaryName || "Self"}</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-slate-100 pt-4 mt-auto">
                                            <Button asChild variant="outline" className="w-full text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800 group-hover:border-green-300">
                                                <Link href={`/certificate/${retirement.id}`} target="_blank">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    View Certificate
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
