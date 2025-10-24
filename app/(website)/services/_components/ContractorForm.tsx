"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Define form data interface
interface FormData {
  companyName: string;
  companyAddress: string;
  clientName: string;
  clientNumber: string;
  clientEmail: string;
  serviceCategories: string;
  serviceAreas: string;
  scopeOfWork: string;
  workHours: string;
  superContact: string;
  superName: string;
}

// Zod schema
const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyAddress: z
    .string()
    .min(5, "Company address must be at least 5 characters"),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientNumber: z
    .string()
    .regex(/^(\+88)?\d{11}$/, "Must be +880XXXXXXXXXX or 01XXXXXXXXX"),
  clientEmail: z.string().email("Invalid email address"),
  serviceCategories: z.string().min(1, "Please select a service category"),
  serviceAreas: z
    .string()
    .min(5, "Service areas must be at least 5 characters"),
  scopeOfWork: z.string().min(3, "Scope of work must be at least 3 characters"),
  workHours: z.string().regex(/^\d+$/, "Work hours must be a number"),
  superContact: z
    .string()
    .regex(/^(\+88)?\d{11}$/, "Must be +880XXXXXXXXXX or 01XXXXXXXXX"),
  superName: z.string().min(2, "Super name must be at least 2 characters"),
});

export default function ContractorForm() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyAddress: "",
      clientName: "",
      clientNumber: "",
      clientEmail: "",
      serviceCategories: "",
      serviceAreas: "",
      scopeOfWork: "",
      workHours: "",
      superContact: "",
      superName: "",
    },
  });

  // TanStack Query Mutation
  const mutation = useMutation({
    mutationFn: async (formData: FormData & { image?: File }) => {
      const payload = new FormData();

      // Map form fields to backend schema
      payload.append("companyName", formData.companyName);
      payload.append("CompanyAddress", formData.companyAddress);
      payload.append("name", formData.clientName);
      payload.append("number", formData.clientNumber);
      payload.append("email", formData.clientEmail);
      payload.append("service", formData.serviceCategories); // assuming this is the ID
      payload.append("serviceAreas", formData.serviceAreas);
      payload.append("scopeWork", formData.scopeOfWork);
      payload.append("worlHour", formData.workHours);
      payload.append("superContact", formData.superContact);
      payload.append("superName", formData.superName);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor`, {
        method: "POST",
        body: payload,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to submit");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Contractor information submitted successfully!");
      reset();
      setImagePreview(null);
      setSelectedFile(null);
      setAgreed(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit. Please try again.");
    },
  });

  const onSubmit = (data: FormData) => {
    if (!agreed) {
      toast.error("You must agree to the terms.");
      return;
    }

    mutation.mutate({
      ...data,
      image: selectedFile || undefined,
    });
  };

  // Handle image upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    const file =
      "dataTransfer" in event
        ? event.dataTransfer.files[0]
        : event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <section className="bg-[#e8e8e8] py-[120px] px-4 md:px-8 lg:px-16">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#0F3D61] font-normal mb-8 text-center md:text-left">
          CONTRACTOR INFORMATION FORM
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Company Details Section */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#424242] mb-6">
              Company Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="company-name" className="text-base text-[#424242] font-semibold mb-2 block">
                  Company Name
                </Label>
                <Input
                  id="company-name"
                  type="text"
                  placeholder="Name Here"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company-address" className="text-base text-[#424242] font-semibold mb-2 block">
                  Company Address
                </Label>
                <Input
                  id="company-address"
                  type="text"
                  placeholder="Enter address"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("companyAddress")}
                />
                {errors.companyAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyAddress.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="client-name" className="text-base text-[#424242] font-semibold mb-2 block">
                  Client Name
                </Label>
                <Input
                  id="client-name"
                  type="text"
                  placeholder="Name Here"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("clientName")}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="client-number" className="text-base text-[#424242] font-semibold mb-2 block">
                  Client Number
                </Label>
                <Input
                  id="client-number"
                  type="text"
                  placeholder="+8801812345678"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D] [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
                  {...register("clientNumber")}
                />
                {errors.clientNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.clientNumber.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="client-email" className="text-base text-[#424242] font-semibold mb-2 block">
                  Client Email
                </Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="hello@example.com"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("clientEmail")}
                />
                {errors.clientEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.clientEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Work Details Section */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#424242] mb-6">
              Work Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="service-categories" className="text-base text-[#424242] font-semibold mb-2 block">
                  Service Categories
                </Label>
                <Select
                  onValueChange={(value) => setValue("serviceCategories", value)}
                >
                  <SelectTrigger
                    id="service-categories"
                    className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e8e8e8]">
                    <SelectItem value="670c5c4b2f78e219b45d9112">
                      Commercial Construction
                    </SelectItem>
                    {/* Add more with actual IDs from your DB */}
                  </SelectContent>
                </Select>
                {errors.serviceCategories && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serviceCategories.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="service-areas" className="text-base text-[#424242] font-semibold mb-2 block">
                  Service Areas
                </Label>
                <Input
                  id="service-areas"
                  type="text"
                  placeholder="Enter service areas"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("serviceAreas")}
                />
                {errors.serviceAreas && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceAreas.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="scope-of-work" className="text-base text-[#424242] font-semibold mb-2 block">
                  Scope of Work
                </Label>
                <Input
                  id="scope-of-work"
                  type="text"
                  placeholder="e.g. Full electrical setup"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("scopeOfWork")}
                />
                {errors.scopeOfWork && (
                  <p className="text-red-500 text-sm mt-1">{errors.scopeOfWork.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="work-hours" className="text-base text-[#424242] font-semibold mb-2 block">
                  Work Hours
                </Label>
                <Input
                  id="work-hours"
                  type="number"
                  placeholder="10"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D] [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
                  {...register("workHours")}
                />
                {errors.workHours && (
                  <p className="text-red-500 text-sm mt-1">{errors.workHours.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="super-contact" className="text-base text-[#424242] font-semibold mb-2 block">
                  Super Contact
                </Label>
                <Input
                  id="super-contact"
                  type="text"
                  placeholder="+8801999888777"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("superContact")}
                />
                {errors.superContact && (
                  <p className="text-red-500 text-sm mt-1">{errors.superContact.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="super-name" className="text-base text-[#424242] font-semibold mb-2 block">
                  Super Name
                </Label>
                <Input
                  id="super-name"
                  type="text"
                  placeholder="Super Name.."
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("superName")}
                />
                {errors.superName && (
                  <p className="text-red-500 text-sm mt-1">{errors.superName.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1a3a52] mb-4">Image</h2>
            <div
              className={`relative border-2 border-dashed rounded-lg p-12 md:p-24 flex flex-col items-center justify-center min-h-[300px] overflow-hidden cursor-pointer transition-colors ${
                isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={1000}
                    height={1000}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-sm">
                    Drag and drop or click to upload
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked: boolean) => setAgreed(checked)}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-base text-[#616161] leading-relaxed cursor-pointer"
              >
                By submitting this form, you confirm that all information provided is
                accurate, valid, and up to date. Bridge Point Solutions may verify your
                credentials, licenses, and supporting documents before approval.
              </Label>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!agreed || mutation.isPending}
                className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white px-8 py-6 text-base rounded-[4px] disabled:opacity-60"
              >
                {mutation.isPending ? "Submitting..." : "Submit Listing"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}