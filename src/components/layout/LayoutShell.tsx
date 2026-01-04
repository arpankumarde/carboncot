"use client";

import { usePathname } from "next/navigation";

export function LayoutShell({
    header,
    footer,
    children,
}: {
    header: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/supplier-dashboard");

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <>
            {header}
            <main className="flex-1">{children}</main>
            {footer}
        </>
    );
}
