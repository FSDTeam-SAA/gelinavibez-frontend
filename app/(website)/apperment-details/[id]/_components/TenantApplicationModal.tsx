// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Upload } from "lucide-react"
// import Link from "next/link"

// interface TenantApplicationModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function TenantApplicationModal({ open, onOpenChange }: TenantApplicationModalProps) {
//   const [hasVoucher, setHasVoucher] = useState<string>("no")
//   const [hasPetPolicy, setHasPetPolicy] = useState<string>("no")
//   const [hasLandlord, setHasLandlord] = useState<string>("no")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Tenant application submitted")
//     onOpenChange(false)
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-[1400px] bg-white">
//         <DialogHeader className="px-6 sm:px-10 pt-6 sm:pt-8  ">
//           <DialogTitle className="">
//             <h1 className="text-xl sm:text-[40px] font-serif tracking-wide text-[#0F3D61]"> TENANT APPLICATION FROM</h1>
           
//           </DialogTitle>
//         </DialogHeader>

//         <ScrollArea className="h-[calc(90vh-100px)] px-6 sm:px-10 py-6 mt-6">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Applicant Information */}
//             <div className="space-y-4">
//               <h1 className="text-xl font-semibold text-[#424242]">Applicant Information</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">First Name</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] border-[#C0C3C1] " />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Last Name</Label>
//                   <Input placeholder="Name Here" className="h- rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1] " />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">SSN*</Label>
//                   <Input placeholder="0000" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Email Address*</Label>
//                   <Input type="email" placeholder="hello@example.com" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Phone Number*</Label>
//                   <Input type="tel" placeholder="+1234567890" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//             </div>

//             {/* Rental History */}
//             <div className="space-y-4">
//               <h3 className="text-base font-semibold text-[#131313]">Rental History</h3>
//               <div className="space-y-2">
//                 <Label className="text-base text-[#424242]  font-semibold">Current Address</Label>
//                 <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">City</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">State</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Zip</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Landlord Name</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Landlord Number</Label>
//                   <Input placeholder="000000" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//             </div>

//             {/* Employment Information */}
//             <div className="space-y-4">
//               <h3 className="text-base font-semibold text-[#131313]">Employment Information</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Employer Name</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Job Title</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Monthly Income</Label>
//                   <Input placeholder="0000, Annual" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Employer Address</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-base text-[#424242]  font-semibold">Source of Income</Label>
//                 <Input placeholder="Name" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//               </div>
//             </div>

//             {/* Which Address Are You Applying For */}
//             <div className="space-y-4">
//               <h3 className="text-base font-semibold text-[#131313]">Which Address Are You Applying For?</h3>
//               <div className="space-y-2">
//                 <Label className="text-base text-[#424242]  font-semibold">Address</Label>
//                 <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">City</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">State</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-base text-[#424242]  font-semibold">Zip</Label>
//                 <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//               </div>
//             </div>

//             {/* Radio Questions */}
//             <div className="space-y-6">
//               <div className="space-y-3">
//                 <Label className="text-base text-[#424242] font-medium">Do you have a voucher?</Label>
//                 <RadioGroup value={hasVoucher} onValueChange={setHasVoucher} className="flex gap-6">
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem className="" value="yes" id="voucher-yes" />
//                     <Label htmlFor="voucher-yes" className="text-sm font-normal cursor-pointer">
//                       Yes
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="no" id="voucher-no" />
//                     <Label htmlFor="voucher-no" className="text-sm font-normal cursor-pointer">
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <div className="space-y-3">
//                 <Label className="text-base text-[#424242]  font-medium">Do you live in a pet policy?</Label>
//                 <RadioGroup value={hasPetPolicy} onValueChange={setHasPetPolicy} className="flex gap-6">
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="yes" id="pet-yes" />
//                     <Label htmlFor="pet-yes" className="text-sm font-normal cursor-pointer">
//                       Yes
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="no" id="pet-no" />
//                     <Label htmlFor="pet-no" className="text-sm font-normal cursor-pointer">
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <div className="space-y-3">
//                 <Label className="text-base text-[#424242]   font-medium">Are you affiliated with a landlord?</Label>
//                 <RadioGroup value={hasLandlord} onValueChange={setHasLandlord} className="flex gap-6">
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="yes" id="landlord-yes" />
//                     <Label htmlFor="landlord-yes" className="text-sm font-normal cursor-pointer">
//                       Yes
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="no" id="landlord-no" />
//                     <Label htmlFor="landlord-no" className="text-sm font-normal cursor-pointer">
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//             </div>

//             {/* Upload Documents */}
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Upload ID</Label>
//                   <div className="border-2 border-dashed text-[#C0C3C1] placeholder:text-[#C0C3C1] rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
//                     <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
//                     <span className="text-xs text-[#9E9E9E]">Upload your ID here</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Upload SSN</Label>
//                   <div className="border-2 border-dashed text-[#C0C3C1] placeholder:text-[#C0C3C1] rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
//                     <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
//                     <span className="text-xs text-[#9E9E9E]">Upload your SSN here</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Upload Voucher</Label>
//                   <div className="border-2 border-dashed text-[#C0C3C1] placeholder:text-[#C0C3C1] rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
//                     <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
//                     <span className="text-xs text-[#9E9E9E]">Upload your voucher here</span>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Upload Source of Income</Label>
//                   <div className="border-2 border-dashed text-[#C0C3C1] placeholder:text-[#C0C3C1] rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
//                     <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
//                     <span className="text-xs text-[#9E9E9E]">Upload source voucher here</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Voucher Information */}
//             <div className="space-y-4">
//               <h3 className="text-base font-semibold text-[#131313]">Voucher information</h3>
//               <div className="space-y-2">
//                 <Label className="text-base text-[#424242]  font-semibold">Type of Program</Label>
//                 <Input placeholder="0000" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Caseworker Name</Label>
//                   <Input placeholder="hello@example.com" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Caseworker Email</Label>
//                   <Input placeholder="hello@example.com" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-base text-[#424242]  font-semibold">Caseworker Number</Label>
//                 <Input placeholder="+1234567890" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//               </div>
//             </div>

//             {/* Applicant Signature */}
//             <div className="space-y-4">
//               <h3 className="text-base font-semibold text-[#131313]">Applicant Signature</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Applicant Signature</Label>
//                   <Input placeholder="Signature" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label className="text-base text-[#424242]  font-semibold">Date</Label>
//                   <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
//                 </div>
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="space-y-4">
//               <div className="flex items-start space-x-2">
//                 <Checkbox id="terms" className="mt-1" />
//                 <label htmlFor="terms" className="text-base text-[#616161] leading-relaxed cursor-pointer">
//                   I do not Accept the <Link href='/terms'><span className="text-[#011DD5] underline">Term & Condition</span>*</Link> 
//                 </label>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <Checkbox id="consent" className="mt-1" />
//                 <label htmlFor="consent" className="text-base text-[#616161] leading-relaxed cursor-pointer">
//                   By submitting, you confirm all details are accurate and a <span className="font-semibold">$20</span>{" "}
//                   non-refundable fee applies. Approval does not guarantee approval. Keep track submission in both email.
//                   Keep track submission in both email.
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="w-[200px] h-12 bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white rounded-[4px] text-base font-medium "
//             >
//               Submit Application
//             </Button>
//             </div>
//           </form>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload } from "lucide-react"
import Link from "next/link"

interface TenantApplicationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TenantApplicationModal({ open, onOpenChange }: TenantApplicationModalProps) {
  const [hasVoucher, setHasVoucher] = useState<string>("no")
  const [hasPetPolicy, setHasPetPolicy] = useState<string>("no")
  const [hasLandlord, setHasLandlord] = useState<string>("no")
  const [idFile, setIdFile] = useState<File | null>(null)
  const [ssnFile, setSsnFile] = useState<File | null>(null)
  const [voucherFile, setVoucherFile] = useState<File | null>(null)
  const [incomeFile, setIncomeFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tenant application submitted with files:", {
      idFile: idFile ? { name: idFile.name, size: idFile.size, type: idFile.type } : null,
      ssnFile: ssnFile ? { name: ssnFile.name, size: ssnFile.size, type: ssnFile.type } : null,
      voucherFile: voucherFile ? { name: voucherFile.name, size: voucherFile.size, type: voucherFile.type } : null,
      incomeFile: incomeFile ? { name: incomeFile.name, size: incomeFile.size, type: incomeFile.type } : null,
    })
    onOpenChange(false)
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null
    setFile(file)
    if (file) {
      console.log(`Selected file for ${e.target.name}:`, {
        name: file.name,
        size: file.size,
        type: file.type,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1400px] bg-white">
        <DialogHeader className="px-6 sm:px-10 pt-6 sm:pt-8">
          <DialogTitle>
            <h1 className="text-xl sm:text-[40px] font-serif tracking-wide text-[#0F3D61]">
              TENANT APPLICATION FORM
            </h1>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-100px)] px-6 sm:px-10 py-6 mt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Applicant Information */}
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-[#424242]">Applicant Information</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">First Name</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] border-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Last Name</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">SSN*</Label>
                  <Input placeholder="0000" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Email Address*</Label>
                  <Input type="email" placeholder="hello@example.com" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Phone Number*</Label>
                  <Input type="tel" placeholder="+1234567890" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
            </div>

            {/* Rental History */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">Rental History</h3>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">Current Address</Label>
                <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">City</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">State</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Zip</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Landlord Name</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Landlord Number</Label>
                  <Input placeholder="000000" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">Employment Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Employer Name</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Job Title</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Monthly Income</Label>
                  <Input placeholder="0000, Annual" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Employer Address</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">Source of Income</Label>
                <Input placeholder="Name" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
              </div>
            </div>

            {/* Which Address Are You Applying For */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">Which Address Are You Applying For?</h3>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">Address</Label>
                <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">City</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">State</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">Zip</Label>
                <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
              </div>
            </div>

            {/* Radio Questions */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base text-[#424242] font-medium">Do you have a voucher?</Label>
                <RadioGroup value={hasVoucher} onValueChange={setHasVoucher} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="voucher-yes" />
                    <Label htmlFor="voucher-yes" className="text-sm font-normal cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="voucher-no" />
                    <Label htmlFor="voucher-no" className="text-sm font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-[#424242] font-medium">Do you live in a pet policy?</Label>
                <RadioGroup value={hasPetPolicy} onValueChange={setHasPetPolicy} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="pet-yes" />
                    <Label htmlFor="pet-yes" className="text-sm font-normal cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pet-no" />
                    <Label htmlFor="pet-no" className="text-sm font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-[#424242] font-medium">Are you affiliated with a landlord?</Label>
                <RadioGroup value={hasLandlord} onValueChange={setHasLandlord} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="landlord-yes" />
                    <Label htmlFor="landlord-yes" className="text-sm font-normal cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="landlord-no" />
                    <Label htmlFor="landlord-no" className="text-sm font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Upload Documents */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Upload ID</Label>
                  <div className="border-2 border-dashed rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
                    <input
                      type="file"
                      name="idFile"
                      onChange={(e) => handleFileChange(e, setIdFile)}
                      className="hidden"
                      id="idFile"
                    />
                    <label htmlFor="idFile" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
                      <span className="text-xs text-[#9E9E9E]">
                        {idFile ? idFile.name : "Upload your ID here"}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Upload SSN</Label>
                  <div className="border-2 border-dashed rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
                    <input
                      type="file"
                      name="ssnFile"
                      onChange={(e) => handleFileChange(e, setSsnFile)}
                      className="hidden"
                      id="ssnFile"
                    />
                    <label htmlFor="ssnFile" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
                      <span className="text-xs text-[#9E9E9E]">
                        {ssnFile ? ssnFile.name : "Upload your SSN here"}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Upload Voucher</Label>
                  <div className="border-2 border-dashed rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
                    <input
                      type="file"
                      name="voucherFile"
                      onChange={(e) => handleFileChange(e, setVoucherFile)}
                      className="hidden"
                      id="voucherFile"
                    />
                    <label htmlFor="voucherFile" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
                      <span className="text-xs text-[#9E9E9E]">
                        {voucherFile ? voucherFile.name : "Upload your voucher here"}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Upload Source of Income</Label>
                  <div className="border-2 border-dashed rounded-[4px] h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#0F3D61] transition-colors">
                    <input
                      type="file"
                      name="incomeFile"
                      onChange={(e) => handleFileChange(e, setIncomeFile)}
                      className="hidden"
                      id="incomeFile"
                    />
                    <label htmlFor="incomeFile" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <Upload className="w-6 h-6 text-[#9E9E9E] mb-1" />
                      <span className="text-xs text-[#9E9E9E]">
                        {incomeFile ? incomeFile.name : "Upload source voucher here"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Information */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">Voucher Information</h3>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">Type of Program</Label>
                <Input placeholder="0000" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Caseworker Name</Label>
                  <Input placeholder="hello@example.com" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Caseworker Email</Label>
                  <Input placeholder="hello@example.com" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#424242] font-semibold">Caseworker Number</Label>
                <Input placeholder="+1234567890" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
              </div>
            </div>

            {/* Applicant Signature */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#131313]">Applicant Signature</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Applicant Signature</Label>
                  <Input placeholder="Signature" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base text-[#424242] font-semibold">Date</Label>
                  <Input placeholder="Name Here" className="h-10 rounded-[4px] text-[#C0C3C1] placeholder:text-[#C0C3C1]" />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-base text-[#616161] leading-relaxed cursor-pointer">
                  I do not Accept the <Link href="/terms"><span className="text-[#011DD5] underline">Term & Condition</span>*</Link>
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="consent" className="mt-1" />
                <label htmlFor="consent" className="text-base text-[#616161] leading-relaxed cursor-pointer">
                  By submitting, you confirm all details are accurate and a <span className="font-semibold">$20</span>{" "}
                  non-refundable fee applies. Approval does not guarantee approval. Keep track submission in both email.
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-[200px] h-12 bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white rounded-[4px] text-base font-medium"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}