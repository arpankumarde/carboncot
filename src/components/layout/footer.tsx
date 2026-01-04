import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="print:hidden border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-700" />
              <span className="text-xl font-bold font-serif text-green-900">CarbonCot</span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Empowering individuals and businesses to take climate action through transparent carbon credit retirement.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-slate-400 hover:text-green-700 transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-green-700 transition-colors"><Linkedin className="w-5 h-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-green-700 transition-colors"><Facebook className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/projects" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/supplier-dashboard" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Supplier Dashboard
                </Link>
              </li>
              <li>
                <Link href="/verify-certificate" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Verify Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-green-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span>123 Green Street,<br />San Francisco, CA 94107</span>
              </li>
              <li>
                <a href="mailto:info@carboncot.com" className="hover:text-green-700 transition-colors">info@carboncot.com</a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-green-700 transition-colors">+1 (555) 123-4567</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CarbonCot. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-green-700 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-green-700 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-green-700 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
