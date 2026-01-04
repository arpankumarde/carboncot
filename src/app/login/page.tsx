"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(data.redirectUrl || "/dashboard");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50/50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-green-900">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2 mb-6">
                        <Button
                            variant="outline"
                            className="w-full text-xs"
                            onClick={() => {
                                setEmail("arpan@steelforce.com");
                                setPassword("12345678");
                            }}
                        >
                            Fill Test Credentials (Buyer)
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-xs"
                            onClick={() => {
                                setEmail("admin@greencompany.com");
                                setPassword("12345678");
                            }}
                        >
                            Fill Test Credentials (Supplier)
                        </Button>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-green-200 focus:border-green-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-green-200 focus:border-green-500"
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-green-700 hover:bg-green-800"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <div className="text-center text-sm text-slate-500 mt-4">
                            <p>Default Password: 12345678</p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
