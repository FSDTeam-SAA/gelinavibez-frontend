"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Image from "next/image"

export function ContactSection() {
  const [agreed, setAgreed] = useState(false)

  return (
    <section className="bg-[#e8e8e8] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white p-8 lg:p-12 rounded-lg shadow-lg">
            <h2 className="text-[#1a4d6d] text-3xl lg:text-4xl font-serif mb-2">Get In Touch</h2>
            <p className="text-gray-600 mb-8">Our friendly team would love to hear from you.</p>

            <form className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="Name Here" className="w-full" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Name Here" className="w-full" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="hello@example.com" className="w-full" />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="+1234567890" className="w-full" />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full resize-none"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  You agree to our friendly{" "}
                  <a href="#" className="text-[#1a4d6d] underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#1a4d6d] underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-[#1a4d6d] hover:bg-[#0f3a52] text-white font-semibold py-6 text-base">
                Send Message
              </Button>
            </form>
          </div>

          {/* Property Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image src="/modern-luxury-house-exterior-at-dusk.jpg" alt="Modern luxury property" width={1000} height={1000} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
