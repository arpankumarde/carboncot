import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { UserCircle } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

export async function Header() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("auth_user");

  return (
    <header className="print:hidden border-b border-green-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold font-serif text-green-800"
          >
            CarbonCot
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
            >
              Contact
            </Link>

            <Button
              asChild
              variant="default"
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              <Link href="/projects">Browse Projects</Link>
            </Button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="text-green-800 hover:text-green-900 hover:bg-green-50"
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <UserCircle className="w-5 h-5" />
                    Dashboard
                  </Link>
                </Button>
                <LogoutButton />
              </div>
            ) : (
              <Button
                asChild
                variant="default"
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                <Link href="/login">Log In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
