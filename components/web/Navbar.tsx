"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

// === Type definitions ===
interface UserProfile {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: "user" | "contractor" | "admin"
  profileImage: string
  verified: boolean
  createdAt: string
  updatedAt: string
  __v: number
  bio?: string
  location?: string
  phone?: string
  jobTitle?: string
}

interface ApiResponse {
  statusCode: number
  success: boolean
  message: string
  data: UserProfile
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const router = useRouter()
  const token = session?.accessToken

  // === Fetch user profile from API ===
  const fetchUserProfile = async (): Promise<ApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user profile")
    }

    return response.json()
  }

  const { data: userProfile } = useQuery<ApiResponse>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!token, // only fetch if logged in
  })

  const role = userProfile?.data?.role

  // === Handle avatar click by role ===
  const handleAvatarClick = () => {
    if (!role) return

    switch (role) {
      case "user":
        router.push("/user/property")
        break
      case "contractor":
        router.push("/contractor/order-list")
        break
      case "admin":
        router.push("")
        break
      default:
        toast.error("Unknown role")
    }
  }

  // === Navbar items ===
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/apartments", label: "Apartments" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  const handleMenuItemClick = () => setMobileMenuOpen(false)

  return (
    <header className="bg-[#0F3D61] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* === Logo === */}
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

          {/* === Desktop Navigation === */}
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

          {/* === Desktop Auth Section === */}
          <div className="hidden lg:flex items-center gap-4">
            {token && userProfile ? (
              <DropdownMenu >
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
                 
                  {role === "contractor" && (
                    <DropdownMenuItem
                      onClick={() => router.push("/contractor/order-list")}
                      className="cursor-pointer h-[40px] hover:bg-[#EFDACB] transition-colors px-3 rounded-md"
                    >
                      Contractor Profile
                    </DropdownMenuItem>
                  )}
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
                    className="cursor-pointer  px-3 rounded-md flex items-center gap-2"
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

          {/* === Mobile Menu Button === */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* === Mobile Navigation === */}
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

                  <button
                    onClick={() => {
                      handleAvatarClick()
                      handleMenuItemClick()
                    }}
                    className="w-full text-left px-2 py-2 text-white hover:text-[#d4b896] transition-colors"
                  >
                    {role === "admin"
                      ? "Admin Dashboard"
                      : role === "contractor"
                      ? "Contractor Profile"
                      : "View Profile"}
                  </button>

                  <button
                    onClick={() => {
                      signOut()
                      handleMenuItemClick()
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
  )
}
