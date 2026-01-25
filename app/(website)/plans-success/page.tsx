

import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[white]/40 relative overflow-hidden">
      {/* Background blur effect */}
    

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-[8px] shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <CheckCircle className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900">Payment Successful</h1>

          {/* Subtext */}
          <p className="text-slate-600 text-sm">Your payment was completed successfully!</p>

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
