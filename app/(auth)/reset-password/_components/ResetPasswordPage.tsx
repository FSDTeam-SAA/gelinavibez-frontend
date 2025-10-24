"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { AuthLayout } from "@/components/web/AuthLayout"
import { toast } from "sonner"

// API function
const resetPassword = async ({ email, newPassword }: { email: string; newPassword: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to reset password")
  }

  return data
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract email from URL query params (e.g., ?email=user@example.com)
  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    } else {
      toast.error("Invalid or missing email. Please use the link from your email.")
    }
  }, [searchParams])

  // TanStack Query Mutation
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully! Redirecting to login...")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    },
    onError: () => {
      toast.error( "Failed to reset password. Please try again.")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Email is missing. Please use the reset link sent to your email.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    mutation.mutate({ email, newPassword })
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[624px]">
        <div className="bg-[#FFFFFF1A]/10 border border-white/10 p-8 md:p-10 rounded-[6px]">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#C5A574] mb-2">
              Reset Password
            </h1>
            <h3 className="text-[#F9F6F1] text-base font-normal">
              Enter your new password
            </h3>
            {email && (
              <p className="text-[#F9F6F1]/70 text-sm mt-2">
                Resetting password for: <span className="font-medium">{email}</span>
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-[#F5F5F5] text-base font-medium">
                Create New Password *
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter Password..."
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full pr-12 placeholder:text-[#F9F6F1] text-[#F9F6F1]"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#F5F5F5] text-base font-medium">
                Confirm New Password *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password..."
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full pr-12 placeholder:text-[#F9F6F1] text-[#F9F6F1]"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={mutation.isPending || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="w-full h-12 bg-[#D4AF7A] hover:bg-[#C5A574] font-medium rounded-full transition-colors text-[18px] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Changing..." : "Change Password"}
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/login")}
              className="text-[#C5A574] text-sm hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}