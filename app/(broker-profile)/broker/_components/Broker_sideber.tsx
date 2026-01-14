

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Settings, LogOut, X,  MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "My Assigned Apartments", href: "/broker/my-apartment", icon: Building2 },
  { name: "Message", href: "/broker/message", icon: MessageSquare },
  { name: "Settings", href: "/broker/broker-profile", icon: Settings },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
}

// Renamed to Sidebar for consistency with your Layout import
export function Sidebar({ isMobileMenuOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

 

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-[18px] font-normal rounded-[4px] transition-colors w-full",
              isActive
                ? "bg-[#0F3D6133]/20 text-[#0F3D61]"
                : "text-[#0F3D61] hover:bg-[#0F3D6133]/20"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.name}</span>
          </Link>
        );
      })}

    
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-gray-900/50"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[386px] bg-[#EFEFEF] border-r border-gray-200">
        <div className="p-6">
          <Link href="/">
            <Image src="/assets/logo.png" width={120} height={40} alt="logo" priority />
          </Link>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavLinks />
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 text-[18px] font-normal text-red-600 rounded-[4px] hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <span className="font-bold text-[#0F3D61]">MENU</span>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-4 space-y-1">
          <NavLinks />
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 text-[18px] font-normal text-red-600 w-full"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
}