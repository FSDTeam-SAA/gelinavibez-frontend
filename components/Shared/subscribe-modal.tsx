"use client"

import type React from "react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {}
  
  if (!data.firstName.trim()) {
    errors.firstName = "First name is required"
  }
  
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required"
  }
  
  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format"
  }
  
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required"
 
  }
  
  return errors
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }
      
      return response.json()
    },
    onSuccess: () => {
      toast.success("Subscription successful!")
      setFormData({ firstName: "", lastName: "", email: "", phone: "" })
      onClose()
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    mutation.mutate(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-7xl rounded-[8px] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Side - Form */}
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl text-[#0F3D61] font-normal mb-2 tracking-wide">GET IN TOUCH</h1>
            <p className="text-base text-gray-600 mb-8 font-light">Our friendly team would love to hear from you.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-[#343A40] mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Name Here"
                    className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#C0C3C1] focus:border-transparent rounded-[4px] text-base`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-base font-medium text-[#343A40] mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Name Here"
                    className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#C0C3C1] focus:border-transparent rounded-[4px] text-base`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-base font-medium text-[#343A40] mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#C0C3C1] focus:border-transparent rounded-[4px] text-base`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-base font-medium text-[#343A40] mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#C0C3C1] focus:border-transparent rounded-[4px] text-base`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={mutation.isPending}
                className={`w-full h-[48px] bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white font-medium py-3 transition-colors mt-8 rounded-[8px] ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {mutation.isPending ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block relative h-full min-h-[500px] rounded-tr-[4px] rounded-br-[4px]">
            <Image
              src="/assets/getintuch.jpg"
              alt="Luxury house"
              width={1000}
              height={1000}
              className="w-full h-full object-cover !rounded-tr-[4px] !rounded-br-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}