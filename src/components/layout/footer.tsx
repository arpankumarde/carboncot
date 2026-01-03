import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-green-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              CarbonCot
            </h3>
            <p className="text-sm text-green-900">
              A transparent platform to explore, buy, and retire carbon credits
              with instant retirement certificates.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-green-900 hover:text-green-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-green-900 hover:text-green-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-green-900 hover:text-green-700 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-800 mb-4">
              Contact
            </h4>
            <p className="text-sm text-green-900">
              Email: info@carboncot.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-green-200 text-center text-sm text-green-900">
          <p>&copy; {new Date().getFullYear()} CarbonCot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

