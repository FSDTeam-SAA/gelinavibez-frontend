import type React from "react"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <Image src="/assets/authbg.jpg" alt="Background" width={1000} height={1000} className="w-full h-full object-cover" priority />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Logo */}
      <div className="absolute left-6 top-6 z-10 md:left-[150px] md:top-2 w-[120px] h-[90px]">
        <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">{children}</div>
    </div>
  )
}
