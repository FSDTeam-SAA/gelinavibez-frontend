
"use client"
import { useState } from "react"
import { Sidebar } from "./_components/Sidebar"
import { Header } from "./_components/Header"
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => setIsMobileMenuOpen((prev) => !prev)
  const handleCloseMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} onClose={handleCloseMenu} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuToggle} />
        <main className="flex-1 p-6">
          {children}</main>
      </div>
    </div>
  )
}
