import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a4d6d] text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex flex-col items-start mb-6">
              <svg
                width="60"
                height="50"
                viewBox="0 0 60 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#d4b896] mb-3"
              >
                <path
                  d="M6 42 L18 30 L18 12 L30 6 L42 12 L42 30 L54 42"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path d="M18 12 L42 12" stroke="currentColor" strokeWidth="2.5" />
                <path d="M18 18 L42 18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 24 L42 24" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 30 L42 30" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div className="text-[#d4b896] font-bold text-sm tracking-wider">BPS</div>
              <div className="text-[#d4b896] text-xs tracking-wider">BRIDGE POINT SOLUTIONS</div>
            </div>
            <h3 className="text-white text-lg font-semibold mb-4">Bridge Point Solutions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering financial decisions through transparent credit scoring and connecting borrowers with trusted
              lenders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#d4b896] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Finance Street Douala, Cameroon</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#d4b896] flex-shrink-0" />
                <a href="tel:+237123456789" className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm">
                  +237 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#d4b896] flex-shrink-0" />
                <a
                  href="mailto:info@creditmatch.com"
                  className="text-gray-300 hover:text-[#d4b896] transition-colors text-sm"
                >
                  info@creditmatch.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2025 Bridge Point Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-[#d4b896] transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#d4b896] transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
