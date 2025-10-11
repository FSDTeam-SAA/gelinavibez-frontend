"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation" // Import usePathname

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname() // Get current route

  // Define menu items to avoid repetition
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/apartments", label: "Apartments" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-white hover:text-[#d4b896] transition-colors duration-300 ${
                  pathname === item.href ? "text-[#d4b896]" : ""
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#EFDACB] transition-all duration-300"></span>
                )}
              </Link>
            ))}
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block relative text-white hover:text-[#d4b896] transition-colors duration-300 ${
                  pathname === item.href ? "text-[#d4b896]" : ""
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#EFDACB] transition-all duration-300"></span>
                )}
              </Link>
            ))}
            <Button className="w-full bg-[#d4b896] text-[#1a4d6d] hover:bg-[#c4a886] font-semibold">Log Out</Button>
          </nav>
        )}
      </div>
    </header>
  )
}