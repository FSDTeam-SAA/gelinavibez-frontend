


"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ------- TYPE DEFINITIONS ------------------- */
interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "contractor" | "admin";
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio?: string;
  location?: string;
  phone?: string;
  jobTitle?: string;
  stripeAccountId?: string;
}

interface ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

/* ------------ STRIPE CREATE ACCOUNT ---------------------------------------- */
interface StripeCreateResponse {
  accountId: string;
  url: string;
}

/* ------------ STRIPE DASHBOARD LINK ---------------------------------------- */
interface StripeDashboardResponse {
  url: string;
}

/* -----------------  NAVBAR COMPONENT  ------------------------------- */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();

  /* ----------------------- FETCH USER PROFILE ----------------------- */
  const fetchUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  };

  const { data: userProfile } = useQuery<ApiResponse<UserProfile>>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!token,
  });

  const role = userProfile?.data?.role;
  const hasStripe = !!userProfile?.data?.stripeAccountId;

  /* --------------------- CREATE STRIPE ACCOUNT --------------------- */
  const createStripeAccount = async (): Promise<ApiResponse<StripeCreateResponse>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/create-stripe-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? "Failed to create Stripe account");
    }
    return res.json();
  };

  const { mutate: startStripeOnboarding, isPending: stripeLoading } = useMutation({
    mutationFn: createStripeAccount,
    onSuccess: (response) => {
      const url = response.data.url;
      window.open(url, "_blank", "noopener,noreferrer");
      toast.success("Stripe onboarding link opened");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  /* --------------------- GET STRIPE DASHBOARD LINK --------------------- */
  const getStripeDashboardLink = async (): Promise<ApiResponse<StripeDashboardResponse>> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/dashboard-link`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? "Failed to get Stripe dashboard link");
    }
    return res.json();
  };

  const {
    mutate: openStripeDashboard,
    isPending: dashboardLoading,
  } = useMutation({
    mutationFn: getStripeDashboardLink,
    onSuccess: (response) => {
      const url = response.data.url;
      window.open(url, "_blank", "noopener,noreferrer");
      toast.success("Opening Stripe Dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  /* ----------------------- AVATAR NAVIGATION ----------------------- */
  const handleAvatarClick = () => {
    if (!role) return;

    switch (role) {
      case "user":
        router.push("/user/property");
        break;
      case "contractor":
        router.push("/contractor/order-list");
        break;
      case "admin":
        router.push("/admin");
        break;
      default:
        toast.error("Unknown role");
    }
  };

  /* --------------------------- NAV ITEMS --------------------------- */
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/apartments", label: "Apartments" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const handleMenuItemClick = () => setMobileMenuOpen(false);

  /* ------------------------------------------------------------------ */
  return (
    <header className="bg-[#0F3D61] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col items-center w-[80px] h-[60px] lg:w-[120px] lg:h-[95px]">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
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
                  <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-[#EFDACB] transition-all duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* DESKTOP AUTH */}
          <div className="hidden lg:flex items-center gap-4">
            {token && userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-10 w-10 bg-white cursor-pointer hover:opacity-80 transition-opacity">
                      <AvatarImage
                        src={userProfile.data.profileImage || ""}
                        alt={userProfile.data.firstName || "User"}
                      />
                      <AvatarFallback>
                        {userProfile.data.firstName?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white rounded-[8px] shadow-lg text-base font-semibold text-[#0F3D61] py-2"
                >
                  {/* Contractor only */}
                  {role === "contractor" && (
                    <>
                      <DropdownMenuItem
                        onClick={() => router.push("/contractor/order-list")}
                        className="cursor-pointer h-[40px] hover:bg-[#EFDACB] transition-colors px-3 rounded-md"
                      >
                        Contractor Profile
                      </DropdownMenuItem>

                      {/* CREATE ACCOUNT (if no stripe) */}
                      {!hasStripe && (
                        <DropdownMenuItem
                          onClick={() => startStripeOnboarding()}
                          disabled={stripeLoading}
                          className="cursor-pointer h-[40px] hover:bg-[#EFDACB] transition-colors px-3 rounded-md flex items-center justify-between"
                        >
                          {stripeLoading ? "Creating…" : "Add Stripe Account"}
                        </DropdownMenuItem>
                      )}

                      {/* DASHBOARD (if stripe exists) */}
                      {hasStripe && (
                        <DropdownMenuItem
                          onClick={() => openStripeDashboard()}
                          disabled={dashboardLoading}
                          className="cursor-pointer h-[40px] hover:bg-[#EFDACB] transition-colors px-3 rounded-md flex items-center justify-between"
                        >
                          {dashboardLoading ? "Opening…" : "Stripe Dashboard"}
                        </DropdownMenuItem>
                      )}
                    </>
                  )}

                  {/* Regular user */}
                  {role === "user" && (
                    <DropdownMenuItem
                      onClick={() => router.push("/user/property")}
                      className="cursor-pointer h-[40px] hover:bg-[#EFDACB] transition-colors px-3 rounded-md"
                    >
                      View Profile
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer px-3 rounded-md flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="text-[#0F3D61] text-[18px] bg-[#EFDACB] hover:bg-[#c4a886] font-semibold px-[42px] h-[48px] rounded-[8px]">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuItemClick}
                className={`block text-white hover:text-[#d4b896] transition-colors duration-300 ${
                  pathname === item.href ? "text-[#d4b896]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#1a5a7a] space-y-3">
              {token && userProfile ? (
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={userProfile.data.profileImage || ""}
                        alt={userProfile.data.firstName || "User"}
                      />
                      <AvatarFallback>
                        {userProfile.data.firstName?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {userProfile.data.firstName || "N/A"}
                      </p>
                      <p className="text-xs text-[#d4b896]">
                        {userProfile.data.role || "User"}
                      </p>
                    </div>
                  </div>

                  {/* Profile link */}
                  <button
                    onClick={() => {
                      handleAvatarClick();
                      handleMenuItemClick();
                    }}
                    className="w-full text-left px-2 py-2 text-white hover:text-[#d4b896] transition-colors"
                  >
                    {role === "admin"
                      ? "Admin Dashboard"
                      : role === "contractor"
                      ? "Contractor Profile"
                      : "View Profile"}
                  </button>

                  {/* Stripe actions for contractor (mobile) */}
                  {role === "contractor" && (
                    <>
                      {!hasStripe && (
                        <button
                          onClick={() => {
                            startStripeOnboarding();
                            handleMenuItemClick();
                          }}
                          disabled={stripeLoading}
                          className="w-full text-left px-2 py-2 text-white hover:text-[#d4b896] transition-colors disabled:opacity-50"
                        >
                          {stripeLoading ? "Creating…" : "Add Stripe Account"}
                        </button>
                      )}

                      {hasStripe && (
                        <button
                          onClick={() => {
                            openStripeDashboard();
                            handleMenuItemClick();
                          }}
                          disabled={dashboardLoading}
                          className="w-full text-left px-2 py-2 text-white hover:text-[#d4b896] transition-colors disabled:opacity-50"
                        >
                          {dashboardLoading ? "Opening…" : "Stripe Dashboard"}
                        </button>
                      )}
                    </>
                  )}

                  {/* Sign out */}
                  <button
                    onClick={() => {
                      signOut();
                      handleMenuItemClick();
                    }}
                    className="w-full text-left px-2 py-2 text-white hover:text-[#d4b896] transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={handleMenuItemClick}>
                  <Button className="w-full bg-[#d4b896] text-[#1a4d6d] hover:bg-[#c4a886] font-semibold">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}