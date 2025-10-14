"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useState } from "react";

// Define validation schema using Zod
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,20}$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [agreed, setAgreed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    reset(); // Reset form after submission
    setAgreed(false); // Reset checkbox
  };

  return (
    <section className="py-16 lg:py-24 bg-[#e8e8e8]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch rounded-[20px] shadow-lg overflow-hidden">
          {/* Contact Form */}
          <div className=" p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-2">
              Get In Touch
            </h1>
            <p className="text-[#6C757D] text-base mb-8">
              Our friendly team would love to hear from you.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 flex-grow"
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-base font-medium text-[#343A40] mb-2"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Name Here"
                    {...register("firstName")}
                    className="w-full border border-[#C0C3C1] rounded-[4px] h-[48px] placeholder:text-base placeholder:text-[#B6B6B6]"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-base font-medium text-[#343A40] mb-2"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Name Here"
                    {...register("lastName")}
                    className="w-full border border-[#C0C3C1] rounded-[4px] h-[48px] placeholder:text-base placeholder:text-[#B6B6B6]"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-[#343A40] mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  {...register("email")}
                  className="w-full border border-[#C0C3C1] rounded-[4px] h-[48px] placeholder:text-base placeholder:text-[#B6B6B6]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-base font-medium text-[#343A40] mb-2"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="+1234567890"
                  {...register("phone")}
                  className="w-full border border-[#C0C3C1] rounded-[4px] h-[48px] placeholder:text-base placeholder:text-[#B6B6B6] 
  [&::-webkit-inner-spin-button]:appearance-none 
  [&::-webkit-outer-spin-button]:appearance-none 
  [appearance:textfield]"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-base font-medium text-[#343A40] mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={5}
                  {...register("message")}
                  className="w-full resize-none border border-[#C0C3C1] rounded-[4px] placeholder:text-base placeholder:text-[#B6B6B6]"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="text-[#8E938F]"
                />
                <label htmlFor="terms" className="text-sm text-[#8E938F]">
                  You agree to our friendly{" "}
                  <a
                    href="#"
                    className="text-[#0F3D61] underline font-semibold"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#0F3D61] underline font-semibold"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!agreed}
                className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 rounded-[8px] text-[#F8F9FA] font-medium h-[48px] text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Property Image */}
          <div className="relative h-full">
            <Image
              src="/assets/getintuch.jpg"
              alt="Modern luxury property"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
