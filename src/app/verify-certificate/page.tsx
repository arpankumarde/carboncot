"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, Search, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VerifyCertificatePage() {
    const [certificateId, setCertificateId] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
    const [verifiedId, setVerifiedId] = useState("");

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!certificateId.trim()) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/verify-certificate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ certificateId: certificateId.trim() }),
            });

            if (res.ok) {
                const data = await res.json();
                setVerifiedId(data.id);
                setStatus("valid");
            } else {
                setStatus("invalid");
            }
        } catch (error) {
            setStatus("invalid");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center py-12 px-4">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
                    <div className="absolute top-20 -left-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-20 -right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>
            </div>

            <div className="w-full max-w-lg relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Verify Credential</h1>
                    <p className="text-slate-600">Ensure the authenticity of your carbon retirement.</p>
                </div>

                <Card className="shadow-2xl border-white/50 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="text-center pb-6 border-b border-slate-100 bg-white/50">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mb-4 shadow-inner ring-4 ring-white">
                            <Search className="w-8 h-8 text-green-700" />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">Certificate Validation</CardTitle>
                        <CardDescription className="text-slate-500 max-w-xs mx-auto">
                            Enter the unique ID found on the certificate document.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 px-6 pb-8">
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="certificateId" className="text-slate-700 font-medium">Certificate ID</Label>
                                <div className="relative group">
                                    <Input
                                        id="certificateId"
                                        placeholder="e.g. 123e4567-e89b-..."
                                        value={certificateId}
                                        onChange={(e) => {
                                            setCertificateId(e.target.value);
                                            if (status !== 'idle') setStatus('idle');
                                        }}
                                        className="pl-4 h-12 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-green-500/20 text-lg transition-all"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold text-lg shadow-lg shadow-green-900/10 hover:shadow-green-900/20 transition-all rounded-lg"
                                disabled={status === "loading" || !certificateId.trim()}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify ID"
                                )}
                            </Button>
                        </form>

                        {/* Result Section */}
                        {status === "valid" && (
                            <div className="mt-8 p-6 bg-green-50/80 rounded-xl border border-green-200 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <CheckCircle2 className="w-24 h-24 text-green-600" />
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-700" />
                                    </div>
                                    <h4 className="title-font font-bold text-lg text-green-900 mb-1">Authentic Certificate</h4>
                                    <p className="text-sm text-green-800 mb-4">
                                        ID <span className="font-mono font-medium">{verifiedId}</span> is valid.
                                    </p>
                                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md">
                                        <a href={`/certificate/${verifiedId}`} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Official Record
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        )}

                        {status === "invalid" && (
                            <div className="mt-8 p-6 bg-red-50/80 rounded-xl border border-red-200 animate-in fade-in zoom-in-95 duration-300 text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <h4 className="font-bold text-lg text-red-900 mb-1">Invalid ID</h4>
                                <p className="text-sm text-red-700">
                                    No active record found for this ID.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
