"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // <-- Import Textarea
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface CallRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apartment: string;
  id: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string; // <-- New field
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  // note is optional, no error needed
}

export function CallRequestModal({
  open,
  onOpenChange,
  apartment,
  id,
}: CallRequestModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    note: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const session = useSession();
  const token = session.data?.accessToken;

  const postCallRequest = async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/callrequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          visiting: id,
          phone: data.phone,
          addNode: data.note, 
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit call request");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: postCallRequest,
    onSuccess: () => {
      toast.success("Call request submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        note: "",
      });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to submit call request");
    },
  });

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    mutation.mutate(formData);
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[602px] p-0 gap-0 bg-white !rounded-[4px]">
        <DialogHeader className="px-8 pt-8 pb-10">
          <DialogTitle>
            <h1 className="text-[40px] font-normal text-[#0F3D61]">
              CALL REQUEST
            </h1>
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-base text-[#343A40] font-medium">
                First Name
              </label>
              <Input
                placeholder="Name Here"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  clearError("firstName");
                }}
                className={`h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#B6B6B6] ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-base text-[#343A40] font-medium">
                Last Name
              </label>
              <Input
                placeholder="Name Here"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  clearError("lastName");
                }}
                className={`h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#B6B6B6] ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-base text-[#343A40] font-medium">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                clearError("email");
              }}
              className={`h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#B6B6B6] ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Visiting (Read-only) */}
          <div className="space-y-2">
            <label className="text-base text-[#343A40] font-medium">
              Visiting in
            </label>
            <Input
              value={apartment}
              readOnly
              className="h-[48px] rounded-[4px] border-[#C0C3C1] bg-gray-100 text-sm cursor-not-allowed placeholder:text-[#B6B6B6]"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-base text-[#343A40] font-medium">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setFormData({ ...formData, phone: value });
                clearError("phone");
              }}
              className={`h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#B6B6B6] text-sm ${
                errors.phone ? "border-red-500" : ""
              } [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Add Note - New Field */}
          <div className="space-y-2">
            <label className="text-base text-[#343A40] font-medium">
              Add Note
            </label>
            <Textarea
              placeholder="Any additional information..."
              value={formData.note}
              onChange={(e) => {
                setFormData({ ...formData, note: e.target.value });
              }}
              className={` rounded-[4px] border-[#C0C3C1] placeholder:text-[#B6B6B6] resize-none`}
            />
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="w-full h-[48px] bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white rounded-[8px] text-base font-medium"
          >
            {mutation.isPending ? "Submitting..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}