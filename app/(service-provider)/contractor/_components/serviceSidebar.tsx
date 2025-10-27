"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Settings, LogOut, X, CardSim } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useProfileQuery } from "@/hooks/ApiClling";

const navigation = [
  { name: "Order Lists", href: "/contractor/order-list", icon: Building2 },

  { name: "Settings", href: "/contractor/provider-profile", icon: Settings },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
}

export function ServiceSidebar({ isMobileMenuOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const token = session?.accessToken || "";
  const getUser = useProfileQuery(token)

  React.useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const renderLinks = () =>
    navigation.map((item) => {
      const isActive =
        pathname === item.href ||
        (item.href === "/profile" &&
          (pathname === "/profile" || pathname === "/change-password")) ||
        (item.href === "/property" &&
          (pathname === "/property" || pathname === "/add-property"));

      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-4 py-3 text-[18px] font-normal rounded-lg transition-colors w-full",
            isActive
              ? "bg-[#0F3D6133]/20 text-[#0F3D61]"
              : "text-[#0F3D61] hover:bg-[#0F3D6133]/20"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="flex-1">{item.name}</span>
        </Link>
      );
    });

  const handelGO = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/dashboard-link`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Stripe dashboard link");
      }

      const data = await response.json();
      if (data.data.url) {
        window.location.href = data.data.url;
      } else {
        // Otherwise, redirect to your dashboard manually.
      }
    } catch (error) {
      console.error("Error redirecting to dashboard:", error);
    }
  };




  return (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-gray-900/50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[386px] bg-[#EFEFEF] border-r border-gray-200">
        <div className="flex items-center justify-center h-[90px] w-[120px] pl-5">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={1000}
              height={1000}
              alt="logo"
              className="w-full h-full"
            />
          </Link>
        </div>

        {/* Nav Links + Logout right below Settings */}
        <nav className="flex-1 py-6 space-y-1">
          {renderLinks()}

          {getUser.data?.data.stripeAccountId &&
            <button
              onClick={handelGO}
              className="flex items-center gap-3 px-4 py-3 text-[18px]  font-normal  rounded-lg hover:bg-red-50 transition-colors w-full"
            >
              <CardSim className="w-5 h-5" />
              Stripe Dashboard
            </button>
          }



          {/* Logout button right below other links */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 text-[18px] font-normal text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-20 border-b border-gray-200 px-6">
          <div className="flex flex-col items-center flex-1">
            <div className="text-2xl font-serif text-amber-700">BPS</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Property
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              Management
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {renderLinks()}

          {/* Logout below other links */}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-4 py-3 text-[18px] font-normal text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
}
