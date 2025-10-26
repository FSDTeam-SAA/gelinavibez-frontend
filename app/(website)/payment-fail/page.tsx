"use client"

import { XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg[white]/40 relative overflow-hidden">
      {/* Background blur effect */}
  

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-[8px] shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Error Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <XCircle className="w-10 h-10 text-red-600" strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900">Payment Failed</h1>

          {/* Subtext */}
          <p className="text-slate-600 text-sm">Your payment could not be processed. Please try again.</p>

          {/* Button */}
          <Link href="/" className="w-full">
            <Button className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white font-medium h-[48px] rounded-[8px] transition-colors">
              Back to Home Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
