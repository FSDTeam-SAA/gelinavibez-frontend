import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#0F3D61] text-white">
      <div className="container mx-auto px-4 py-12 lg:pt-16 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex flex-col items-start mb-6">
             <Image src="/assets/logo.png" alt="Logo" width={1000} height={1000} className="w-[120px] h-[90px]" />
            </div>
            <h4 className="text-[#F8F9FA] text-[24px] font-semibold mb-4">Bridge Point Solutions</h4>
            <p className="text-[#F8F9FA] text-base font-medium leading-relaxed">
              Empowering financial decisions through transparent credit scoring and connecting borrowers with trusted
              lenders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F8F9FA] text-[24px] font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors ">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors ">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors ">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors ">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors ">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-[#F8F9FA] text-[24px] font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-[#F8F9FA] text-base font-medium ">418 Broadway suite 6217, Albany,N.Y.12207</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                <a href="tel:+237123456789" className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors ">
                  +315-533-3918
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                <a
                  href="mailto:info@creditmatch.com"
                  className="text-[#F8F9FA] text-base font-medium hover:text-[#d4b896] transition-colors "
                >
                 Info@mybridgepointsolutions.com
                </a>
              </li>
              <li className="flex items-center gap-3">
               
                <p
                 
                  className="text-[#F8F9FA] text-sm font-medium transition-colors "
                >
                  Hours: 10:00 AM – 6:00 PM ET, Mon–Fri • Inquiries accepted online 24/7
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2025 Bridge Point Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-[#d4b896] transition-colors ">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#d4b896] transition-colors ">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
