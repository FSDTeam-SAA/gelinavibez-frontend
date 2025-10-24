"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/web/AuthLayout"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()


  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Failed to send reset email")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Password reset email sent successfully!")
      router.push(`/verify-email?email=${encodeURIComponent(email)}`)
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      forgotPasswordMutation.mutate(email)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[624px]">
        <div className="bg-[#FFFFFF1A]/10 border border-white/10 p-8 md:p-10 rounded-[6px]">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#C5A574] mb-2">
              Forgot Password!
            </h1>
            <h3 className="text-[#F9F6F1] text-base font-normal">
              Enter your email to recover your password
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F5F5F5] text-base font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full placeholder:text-[#F9F6F1] text-[#F9F6F1]"
                required
                disabled={forgotPasswordMutation.isPending}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={forgotPasswordMutation.isPending || !email}
              className="w-full h-12 bg-[#D4AF7A] hover:bg-[#C5A574] font-medium rounded-full transition-colors text-[18px] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}