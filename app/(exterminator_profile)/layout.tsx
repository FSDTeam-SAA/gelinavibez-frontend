

'use client';
import { ReactNode, useState } from "react";
import "../globals.css";

import { Header } from "../(user-profile)/user/_components/Header";
import { Sidebar } from "./exterminator/_components/Contactor_sidebar";


export default function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar with toggle state */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Pass toggle function to Header */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
