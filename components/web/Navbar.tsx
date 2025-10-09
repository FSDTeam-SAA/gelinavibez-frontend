"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#0F3D61] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col items-center w-[80px] h-[60px] lg:w-[120px] lg:h-[95px] ">
            <Image src="/assets/logo.png" alt="Logo" width={1000} height={1000} className="w-full h-full object-cover" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-[#d4b896] transition-colors">
              Home
            </Link>
            <Link href="/apartments" className="text-white hover:text-[#d4b896] transition-colors">
              Apartments
            </Link>
            <Link href="/services" className="text-white hover:text-[#d4b896] transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-white hover:text-[#d4b896] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-white hover:text-[#d4b896] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Log Out Button */}
          <Button className="hidden lg:block text-[#0F3D61] text-[18px] bg-[#EFDACB] hover:bg-[#c4a886] font-semibold px-[42px] h-[48px] rounded-[8px]">
            Log Out
          </Button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-4">
            <Link href="/" className="block text-white hover:text-[#d4b896] transition-colors">
              Home
            </Link>
            <Link href="/apartments" className="block text-white hover:text-[#d4b896] transition-colors">
              Apartments
            </Link>
            <Link href="/services" className="block text-white hover:text-[#d4b896] transition-colors">
              Services
            </Link>
            <Link href="/about" className="block text-white hover:text-[#d4b896] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="block text-white hover:text-[#d4b896] transition-colors">
              Contact
            </Link>
            <Button className="w-full bg-[#d4b896] text-[#1a4d6d] hover:bg-[#c4a886] font-semibold">Log Out</Button>
          </nav>
        )}
      </div>
    </header>
  )
}
