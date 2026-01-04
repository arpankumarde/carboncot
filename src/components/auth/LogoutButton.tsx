"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });
            // Force a hard refresh to ensure server components (Header) update immediately
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50"
            title="Logout"
        >
            <LogOut className="w-5 h-5" />
        </Button>
    );
}
