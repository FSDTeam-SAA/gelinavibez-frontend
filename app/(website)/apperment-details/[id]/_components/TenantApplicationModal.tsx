"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// === Reusable Input Class ===
const inputClasses =
  "h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#6C757D]";

// API Response Types
interface TenantFeeResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    applicationFee: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface TenantCreateResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    stripeSessionUrl: string;
  };
}

interface TenantApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TenantApplicationModal({
  open,
  onOpenChange,
}: TenantApplicationModalProps) {
  const params = useParams();
  const apartmentId = params.id as string;

  const [hasVoucher, setHasVoucher] = useState<string>("no");
  const [livesInShelter, setLivesInShelter] = useState<string>("no");
  const [affiliatedWithHomebase, setAffiliatedWithHomebase] =
    useState<string>("no");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [ssnFile, setSsnFile] = useState<File | null>(null);
  const [voucherFile, setVoucherFile] = useState<File | null>(null);
  const [incomeFile, setIncomeFile] = useState<File | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [consent, setConsent] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // === Get Session & Token ===
  const { data: session, status } = useSession();
  const token = session?.accessToken as string | undefined;

  // === Fetch Application Fee ===
  const { data: feeData, isLoading: feeLoading } = useQuery<TenantFeeResponse>({
    queryKey: ["tenantFee"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tenantfree`
      );
      if (!res.ok) throw new Error("Failed to fetch application fee");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const applicationFee = feeData?.data?.applicationFee;

  // === Submit Mutation ===
  const mutation = useMutation<TenantCreateResponse, Error, FormData>({
    mutationFn: async (formData) => {
      if (!token) throw new Error("Authentication token is missing");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tenant`,
        {
          method: "POST",
          headers: {
            // DO NOT set Content-Type → browser sets multipart boundary
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const err = await res
          .json()
          .catch(() => ({ message: "Submission failed" }));
        throw new Error(err.message || "Failed to submit application");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Application submitted! Redirecting to payment...");
      setTimeout(() => {
        window.location.href = data.data.stripeSessionUrl;
      }, 1500);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit application");
    },
  });

  // === Handle Form Submit ===
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") {
      toast.error("Please wait, authentication is loading...");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to submit an application.");
      return;
    }

    if (!acceptedTerms || !consent) {
      toast.error("You must accept terms and consent to proceed.");
      return;
    }

    if (!apartmentId) {
      toast.error("Invalid apartment ID.");
      return;
    }

    const formData = new FormData();
    const form = formRef.current!;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value || "";

    const payload = {
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      phone: get("phone"),
      ssn: get("ssn"),
      rentalHistory: {
        currentAddress: get("currentAddress"),
        city: get("rentalCity"),
        state: get("rentalState"),
        zip: get("rentalZip"),
        landlordName: get("landlordName"),
        landlordNumber: get("landlordNumber"),
      },
      employmentInfo: {
        employerName: get("employerName"),
        jobTitle: get("jobTitle"),
        monthlyIncome: Number(get("monthlyIncome")) || 0,
        employerAddress: get("employerAddress"),
        sourceOfIncome: get("sourceOfIncome"),
      },
      appliedAddress: {
        address: get("appliedAddress"),
        city: get("appliedCity"),
        state: get("appliedState"),
        zip: get("appliedZip"),
      },
      hasVoucher: hasVoucher === "yes",
      livesInShelter: livesInShelter === "yes",
      affiliatedWithHomebase: affiliatedWithHomebase === "yes",
      voucherInfo:
        hasVoucher === "yes"
          ? {
              programType: get("programType"),
              caseworkerName: get("caseworkerName"),
              caseworkerEmail: get("caseworkerEmail"),
              caseworkerNumber: get("caseworkerNumber"),
            }
          : null,
      applicantSignature: get("signature"),
      acceptedTerms: true,
      apartmentId,
    };

    formData.append("data", JSON.stringify(payload));
    if (idFile) formData.append("idCard", idFile);
    if (ssnFile) formData.append("ssnDoc", ssnFile);
    if (voucherFile && hasVoucher === "yes")
      formData.append("voucherDoc", voucherFile);
    if (incomeFile) formData.append("incomeDoc", incomeFile);

    mutation.mutate(formData);
  };

  // === Handle File Change ===
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  // === Loading State ===
  if (status === "loading") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[1400px]">
          <div className="flex items-center justify-center h-64">
            <p className="text-lg">Loading session...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px] bg-white p-0">
        <DialogHeader className="px-6 sm:px-10 pt-6 sm:pt-8">
          <DialogTitle>
            <h1 className="text-xl sm:text-[40px] font-serif tracking-wide text-[#0F3D61]">
              TENANT APPLICATION FORM
            </h1>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-100px)] px-6 sm:px-10 py-6">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8 pb-10"
          >
            {/* Applicant Info */}
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-[#424242]">
                Applicant Information
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    First Name *
                  </Label>
                  <Input
                    name="firstName"
                    placeholder="Saurav"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Last Name *
                  </Label>
                  <Input
                    name="lastName"
                    placeholder="Sarkar"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    SSN *
                  </Label>
                  <Input
                    name="ssn"
                    placeholder="123-45-6789"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Phone Number *
                  </Label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+880123456789"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Rental History */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">
                Rental History
              </h3>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">
                  Current Address
                </Label>
                <Input
                  name="currentAddress"
                  placeholder="123/A, Example Street"
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    City
                  </Label>
                  <Input
                    name="rentalCity"
                    placeholder="Dhaka"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    State
                  </Label>
                  <Input
                    name="rentalState"
                    placeholder="Dhaka"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Zip
                  </Label>
                  <Input
                    name="rentalZip"
                    placeholder="1207"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Landlord Name
                  </Label>
                  <Input
                    name="landlordName"
                    placeholder="Rahim Uddin"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Landlord Number
                  </Label>
                  <Input
                    name="landlordNumber"
                    placeholder="+8801987654321"
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Employment */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">
                Employment Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Employer Name
                  </Label>
                  <Input
                    name="employerName"
                    placeholder="Tech Company Ltd"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Job Title
                  </Label>
                  <Input
                    name="jobTitle"
                    placeholder="Software Engineer"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Monthly Income
                  </Label>
                  <Input
                    name="monthlyIncome"
                    type="number"
                    placeholder="5000"
                    className={`${inputClasses} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]`}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Employer Address
                  </Label>
                  <Input
                    name="employerAddress"
                    placeholder="45/B, Tech Park"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">
                  Source of Income
                </Label>
                <Input
                  name="sourceOfIncome"
                  placeholder="Salary"
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Applied Address */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">
                Which Address Are You Applying For?
              </h3>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">
                  Address
                </Label>
                <Input
                  name="appliedAddress"
                  placeholder="56/C, Green Apartment"
                  required
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    City
                  </Label>
                  <Input
                    name="appliedCity"
                    placeholder="Dhaka"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    State
                  </Label>
                  <Input
                    name="appliedState"
                    placeholder="Dhaka"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">
                  Zip
                </Label>
                <Input
                  name="appliedZip"
                  placeholder="1212"
                  required
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Radio Questions */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base text-[#424242] font-medium">
                  Do you have a voucher?
                </Label>
                <RadioGroup
                  value={hasVoucher}
                  onValueChange={setHasVoucher}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="voucher-yes" />
                    <Label
                      htmlFor="voucher-yes"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="voucher-no" />
                    <Label
                      htmlFor="voucher-no"
                      className="text-sm font-normal cursor-pointer"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-[#424242] font-medium">
                  Do you live in a shelter?
                </Label>
                <RadioGroup
                  value={livesInShelter}
                  onValueChange={setLivesInShelter}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="shelter-yes" />
                    <Label
                      htmlFor="shelter-yes"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="shelter-no" />
                    <Label
                      htmlFor="shelter-no"
                      className="text-sm font-normal cursor-pointer"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-[#424242] font-medium">
                  Are you affiliated with Homebase?
                </Label>
                <RadioGroup
                  value={affiliatedWithHomebase}
                  onValueChange={setAffiliatedWithHomebase}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="homebase-yes" />
                    <Label
                      htmlFor="homebase-yes"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="homebase-no" />
                    <Label
                      htmlFor="homebase-no"
                      className="text-sm font-normal cursor-pointer"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "Upload ID *",
                    id: "idFile",
                    file: idFile,
                    setFile: setIdFile,
                    name: "idCard",
                    required: true,
                  },
                  {
                    label: "Upload SSN *",
                    id: "ssnFile",
                    file: ssnFile,
                    setFile: setSsnFile,
                    name: "ssnDoc",
                    required: true,
                  },
                  {
                    label: "Upload Voucher",
                    id: "voucherFile",
                    file: voucherFile,
                    setFile: setVoucherFile,
                    name: "voucherDoc",
                    required: hasVoucher === "yes",
                  },
                  {
                    label: "Upload Income *",
                    id: "incomeFile",
                    file: incomeFile,
                    setFile: setIncomeFile,
                    name: "incomeDoc",
                    required: true,
                  },
                ].map(({ label, id, file, setFile, name, required }) => (
                  <div key={id} className="space-y-2">
                    <Label className="text-base text-[#424242] font-semibold">
                      {label}
                    </Label>
                    <div className="border-2 border-dashed rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
                      <input
                        type="file"
                        id={id}
                        name={name}
                        onChange={(e) => handleFileChange(e, setFile)}
                        className="hidden"
                        required={required}
                        accept="image/*,.pdf"
                      />
                      <label
                        htmlFor={id}
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-2"
                      >
                        <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
                        <span className="text-xs text-[#9E9E9E] text-center truncate px-1">
                          {file ? file.name : `Upload ${label.split(" ")[1]}`}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voucher Info */}
            {hasVoucher === "yes" && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-base font-semibold text-[#131313]">
                  Voucher Information
                </h3>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Type of Program
                  </Label>
                  <Input
                    name="programType"
                    placeholder="Housing Assistance"
                    className={inputClasses}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-base text-[#424242] font-semibold">
                      Caseworker Name
                    </Label>
                    <Input
                      name="caseworkerName"
                      placeholder="Jamal Uddin"
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base text-[#424242] font-semibold">
                      Caseworker Email
                    </Label>
                    <Input
                      name="caseworkerEmail"
                      type="email"
                      placeholder="jamal@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Caseworker Number
                  </Label>
                  <Input
                    name="caseworkerNumber"
                    placeholder="+8801777888999"
                    className={inputClasses}
                  />
                </div>
              </div>
            )}

            {/* Signature */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">
                Applicant Signature
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Signature *
                  </Label>
                  <Input
                    name="signature"
                    placeholder="Type your full name"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">
                    Date
                  </Label>
                  <Input
                    value={new Date().toLocaleDateString()}
                    className="h-[48px] rounded-[4px] bg-gray-50 text-[#6C757D]"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Consent */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(v) => setAcceptedTerms(!!v)}
                />
                <label
                  htmlFor="terms"
                  className="text-base text-[#616161] leading-relaxed cursor-pointer"
                >
                  I accept the{" "}
                  <Link href="/terms">
                    <span className="text-[#011DD5] underline">
                      Terms & Conditions
                    </span>
                  </Link>{" "}
                  *
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(!!v)}
                />
                <label
                  htmlFor="consent"
                  className="text-base text-[#616161] leading-relaxed cursor-pointer"
                >
                  By submitting, you confirm all details are accurate and
                  complete. A{" "}
                  <span className="font-semibold text-xl text-[#0F3D61]">
                    {feeLoading ? "$..." : `$${applicationFee}`}
                  </span>{" "}
                  non-refundable fee applies. Application does not guarantee
                  approval; a lease is valid only once signed by both parties.
                  Bridge Point Solutions may request additional information.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={mutation.isPending || !token}
                className="w-[200px] h-12 bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white rounded-[4px] text-base font-medium disabled:opacity-50"
              >
                {mutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
