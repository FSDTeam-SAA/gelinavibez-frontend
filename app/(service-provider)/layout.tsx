


'use client';
import { ReactNode, useState } from "react";
import "../globals.css";
// Ensure this path is exactly where your Sidebar file is located
import { Sidebar } from "./contractor/_components/serviceSidebar"; 
import { Header } from "../(user-profile)/user/_components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0"> {/* added min-w-0 to prevent flex blowout */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}