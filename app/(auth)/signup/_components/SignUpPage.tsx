"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { AuthLayout } from "@/components/web/AuthLayout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreedToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  async function signUpUser(data: SignUpFormData) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    })

    const result = await response.json()
    toast.success(result.message || "Account created successfully")
    router.push("/login")
    setIsLoading(true)
    if (!response.ok) {
      setIsLoading(false)
      toast.error(result.message || "Something went wrong")
      throw new Error(result.message || "Something went wrong")

    }
    return result
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form submitted:", data)
    signUpUser(data)
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-[624px]">
        <div className="bg-[#FFFFFF1A]/10 border border-white/10 p-8 md:p-10 rounded-[6px]">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#C5A574] mb-2">
              Create Your Account
            </h1>
            <h3 className="text-[#F9F6F1] text-base font-normal">
              Connect families with trusted care today.
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#F5F5F5] text-base font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName")}
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full text-[#F9F6F1]"
                />
                {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#F5F5F5] text-base font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full text-[#F9F6F1]"
                />
                {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F5F5F5] text-base font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email..."
                {...register("email")}
                className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full text-[#F9F6F1]"
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#F5F5F5] text-base font-medium">
                Create New Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password..."
                  {...register("password")}
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full pr-12 text-[#F9F6F1]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#F5F5F5] text-base font-medium">
                Confirm Password *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Password..."
                  {...register("confirmPassword")}
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full pr-12 text-[#F9F6F1]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={!!errors.agreedToTerms ? false : undefined}
                {...register("agreedToTerms")}
                onCheckedChange={(checked) => setValue("agreedToTerms", checked as boolean)}
                className="mt-0.5 border-white/40 data-[state=checked]:bg-[#D4AF7A] data-[state=checked]:border-[#D4AF7A]"
              />
              <label htmlFor="terms" className="text-sm text-white/80 cursor-pointer leading-tight">
                I Agree to{" "}
                <Link href="/terms" className="text-[#D4AF7A] hover:text-[#E5C08B] transition-colors">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#D4AF7A] hover:text-[#E5C08B] transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreedToTerms && (
              <p className="text-red-400 text-sm">{errors.agreedToTerms.message}</p>
            )}

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#D4AF7A] hover:bg-[#C5A574] font-medium rounded-full transition-colors text-[18px] text-white"
            >
              Continue {isLoading && <Loader2 className="animate-spin ml-2" />}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center text-sm text-white/80">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-medium hover:text-[#D4AF7A] transition-colors">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
