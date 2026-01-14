


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Upload, X } from "lucide-react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";

// // ── TYPES ────────────────────────────────────────────────────────

// interface MediaFile {
//   file: File;
//   preview: string;
// }

// // ── SCHEMA ───────────────────────────────────────────────────────

// const formSchema = z.object({
//   companyName: z.string().min(2, "Company name must be at least 2 characters"),
//   companyAddress: z.string().min(5, "Company address must be at least 5 characters"),
//   clientName: z.string().min(2, "Client name must be at least 2 characters"),
//   clientNumber: z
//     .string()
//     .regex(/^(\+88)?\d{11}$/, "Must be +880XXXXXXXXXX or 01XXXXXXXXX"),
//   clientEmail: z.string().email("Invalid email address"),
//   serviceCategories: z
//     .array(z.string())
//     .min(1, "Please select at least one service category"),
//   serviceAreas: z.string().min(5, "Service areas must be at least 5 characters"),
//   scopeOfWork: z.string().min(3, "Scope of work must be at least 3 characters"),
//   workHours: z.string().regex(/^\d+$/, "Work hours must be a number"),
//   superContact: z
//     .string()
//     .regex(/^(\+88)?\d{11}$/, "Must be +880XXXXXXXXXX or 01XXXXXXXXX"),
//   superName: z.string().min(2, "Super name must be at least 2 characters"),
// });

// type FormData = z.infer<typeof formSchema>;

// export default function ContractorForm() {
//   const [agreed, setAgreed] = useState<boolean>(false);
//   const [images, setImages] = useState<MediaFile[]>([]);
//   const [videos, setVideos] = useState<MediaFile[]>([]);
//   const [isDraggingImages, setIsDraggingImages] = useState(false);
//   const [isDraggingVideos, setIsDraggingVideos] = useState(false);

//   const { data: session } = useSession();
//   const token = session?.accessToken;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       companyName: "",
//       companyAddress: "",
//       clientName: "",
//       clientNumber: "",
//       clientEmail: "",
//       serviceCategories: [],
//       serviceAreas: "",
//       scopeOfWork: "",
//       workHours: "",
//       superContact: "",
//       superName: "",
//     },
//   });

//   const selectedServices = watch("serviceCategories");

//   // Fetch services
//   const { data: servicesResp, isLoading: servicesLoading } = useQuery({
//     queryKey: ["services"],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/service/`);
//       if (!res.ok) throw new Error("Failed to load services");
//       return res.json();
//     },
//   });

//   const serviceOptions = servicesResp?.data ?? [];

//   // ── IMAGE HANDLERS ───────────────────────────────────────────────

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const newFiles: MediaFile[] = [];

//     Array.from(e.target.files).forEach((file) => {
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           newFiles.push({ file, preview: reader.result as string });
//         };
//         reader.readAsDataURL(file);
//       }
//     });

//     setTimeout(() => setImages((prev) => [...prev, ...newFiles]), 100);
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ── VIDEO HANDLERS ───────────────────────────────────────────────

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const newFiles: MediaFile[] = [];

//     Array.from(e.target.files).forEach((file) => {
//       if (file.type.startsWith("video/")) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           newFiles.push({ file, preview: reader.result as string });
//         };
//         reader.readAsDataURL(file);
//       }
//     });

//     setTimeout(() => setVideos((prev) => [...prev, ...newFiles]), 100);
//   };

//   const removeVideo = (index: number) => {
//     setVideos((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Drag & Drop handlers
//   const handleDragOverImages = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDraggingImages(true);
//   };

//   const handleDragLeaveImages = () => setIsDraggingImages(false);

//   const handleDropImages = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDraggingImages(false);
//     if (e.dataTransfer.files?.length) {
//       const syntheticEvent = { target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>;
//       handleImageChange(syntheticEvent);
//     }
//   };

//   const handleDragOverVideos = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDraggingVideos(true);
//   };

//   const handleDragLeaveVideos = () => setIsDraggingVideos(false);

//   const handleDropVideos = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDraggingVideos(false);
//     if (e.dataTransfer.files?.length) {
//       const syntheticEvent = { target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>;
//       handleVideoChange(syntheticEvent);
//     }
//   };

//   // ── SUBMIT ───────────────────────────────────────────────────────

//   const mutation = useMutation({
//     mutationFn: async (formValues: FormData) => {
//       const payload = new FormData();

//       images.forEach(({ file }) => payload.append("images", file));
//       videos.forEach(({ file }) => payload.append("videos", file));

//       const jsonData = {
//         companyName: formValues.companyName,
//         CompanyAddress: formValues.companyAddress,
//         name: formValues.clientName,
//         number: formValues.clientNumber,
//         email: formValues.clientEmail,
//         service: formValues.serviceCategories,
//         serviceAreas: formValues.serviceAreas,
//         scopeWork: formValues.scopeOfWork,
//         worlHour: Number(formValues.workHours),
//         superContact: formValues.superContact,
//         superName: formValues.superName,
//       };

//       payload.append("data", JSON.stringify(jsonData));

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor`, {
//         method: "POST",
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//         body: payload,
//       });

//       const responseData = await res.json();

//       if (!res.ok) {
//         // Throw the message from the API so onError can catch it
//         throw new Error(responseData.message || "Something went wrong with the submission.");
//       }

//       return responseData;
//     },

//     onSuccess: (response) => {
//       // Use the exact message from your API response
//       toast.success(response.message || "Contractor information submitted successfully!");
//       reset();
//       setImages([]);
//       setVideos([]);
//       setAgreed(false);
//     },

//     onError: (err: Error) => {
//       // Shows the exact error message thrown in mutationFn
//       toast.error(err.message);
//     },
//   });

//   const onSubmit = (data: FormData) => {
//     if (!agreed) {
//       toast.error("You must agree to the terms and conditions.");
//       return;
//     }
//     mutation.mutate(data);
//   };

//   return (
//     <section id="contractor-form" className="bg-[#e8e8e8] py-[120px] px-4 md:px-8 lg:px-16">
//       <div className="container">
//         <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#0F3D61] font-normal mb-8 text-center md:text-left">
//           CONTRACTOR INFORMATION FORM
//         </h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Company Details */}
//           <div className="mb-10">
//             <h2 className="text-lg font-semibold text-[#424242] mb-6">Company Details</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <Label htmlFor="company-name" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Company Name
//                 </Label>
//                 <Input
//                   id="company-name"
//                   placeholder="Name Here"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("companyName")}
//                 />
//                 {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
//               </div>
//               <div>
//                 <Label htmlFor="company-address" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Company Address
//                 </Label>
//                 <Input
//                   id="company-address"
//                   placeholder="Enter address"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("companyAddress")}
//                 />
//                 {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress.message}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <Label htmlFor="client-name" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Client Name
//                 </Label>
//                 <Input
//                   id="client-name"
//                   placeholder="Name Here"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("clientName")}
//                 />
//                 {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
//               </div>
//               <div>
//                 <Label htmlFor="client-number" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Client Number
//                 </Label>
//                 <Input
//                   id="client-number"
//                   placeholder="+8801812345678"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D] [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
//                   {...register("clientNumber")}
//                 />
//                 {errors.clientNumber && <p className="text-red-500 text-sm mt-1">{errors.clientNumber.message}</p>}
//               </div>
//               <div>
//                 <Label htmlFor="client-email" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Client Email
//                 </Label>
//                 <Input
//                   id="client-email"
//                   type="email"
//                   placeholder="hello@example.com"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("clientEmail")}
//                 />
//                 {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail.message}</p>}
//               </div>
//             </div>
//           </div>

//           {/* Work Details */}
//           <div className="mb-10">
//             <h2 className="text-lg font-semibold text-[#424242] mb-6">Work Details</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <Label className="text-base text-[#424242] font-semibold mb-2 block">Service Categories</Label>
//                 <Select
//                   onValueChange={(value) => {
//                     const current = selectedServices || [];
//                     if (!current.includes(value)) {
//                       setValue("serviceCategories", [...current, value], { shouldValidate: true });
//                     }
//                   }}
//                   disabled={servicesLoading}
//                 >
//                   <SelectTrigger className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]">
//                     <SelectValue placeholder={servicesLoading ? "Loading..." : "Select services..."} />
//                   </SelectTrigger>
//                   <SelectContent className="bg-[#e8e8e8]">
//                     {serviceOptions.map((svc: any) => (
//                       <SelectItem
//                         key={svc._id}
//                         value={svc._id}
//                         className={selectedServices?.includes(svc._id) ? "bg-blue-100" : ""}
//                       >
//                         {svc.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 {selectedServices?.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {selectedServices.map((id) => {
//                       const svc = serviceOptions.find((s: any) => s._id === id);
//                       return svc ? (
//                         <div
//                           key={id}
//                           className="bg-[#0F3D61]/10 text-[#0F3D61] px-3 py-1 rounded-full text-sm flex items-center gap-2"
//                         >
//                           {svc.name}
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setValue(
//                                 "serviceCategories",
//                                 selectedServices.filter((s) => s !== id)
//                               )
//                             }
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ) : null;
//                     })}
//                   </div>
//                 )}

//                 {errors.serviceCategories && (
//                   <p className="text-red-500 text-sm mt-1">{errors.serviceCategories.message}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="service-areas" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Service Areas
//                 </Label>
//                 <Input
//                   id="service-areas"
//                   placeholder="Enter service areas"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("serviceAreas")}
//                 />
//                 {errors.serviceAreas && <p className="text-red-500 text-sm mt-1">{errors.serviceAreas.message}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div>
//                 <Label htmlFor="scope-of-work" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Scope of Work
//                 </Label>
//                 <Input
//                   id="scope-of-work"
//                   placeholder="e.g. Full electrical setup"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("scopeOfWork")}
//                 />
//                 {errors.scopeOfWork && <p className="text-red-500 text-sm mt-1">{errors.scopeOfWork.message}</p>}
//               </div>
//               <div>
//                 <Label htmlFor="work-hours" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Work Hours
//                 </Label>
//                 <Input
//                   id="work-hours"
//                   type="number"
//                   placeholder="10"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D] [appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
//                   {...register("workHours")}
//                 />
//                 {errors.workHours && <p className="text-red-500 text-sm mt-1">{errors.workHours.message}</p>}
//               </div>
//               <div>
//                 <Label htmlFor="super-contact" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Super Contact
//                 </Label>
//                 <Input
//                   id="super-contact"
//                   placeholder="+8801999888777"
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("superContact")}
//                 />
//                 {errors.superContact && <p className="text-red-500 text-sm mt-1">{errors.superContact.message}</p>}
//               </div>
//               <div>
//                 <Label htmlFor="super-name" className="text-base text-[#424242] font-semibold mb-2 block">
//                   Super Name
//                 </Label>
//                 <Input
//                   id="super-name"
//                   placeholder="Super Name.."
//                   className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
//                   {...register("superName")}
//                 />
//                 {errors.superName && <p className="text-red-500 text-sm mt-1">{errors.superName.message}</p>}
//               </div>
//             </div>
//           </div>

//           {/* IMAGES UPLOAD */}
//           <div className="mb-10">
//             <h2 className="text-lg font-semibold text-[#1a3a52] mb-4">Images</h2>
//             <div
//               className={`relative border-2 border-dashed rounded-[4px] p-12 md:p-24 flex flex-col items-center justify-center min-h-[300px] overflow-hidden cursor-pointer transition-colors ${
//                 isDraggingImages ? "border-blue-400 bg-blue-50" : "border-gray-300"
//               }`}
//               onDragOver={handleDragOverImages}
//               onDragLeave={handleDragLeaveImages}
//               onDrop={handleDropImages}
//               onClick={() => document.getElementById("image-upload")?.click()}
//             >
//               {images.length === 0 ? (
//                 <>
//                   <Upload className="w-12 h-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500 text-sm">Drag and drop or click to upload images</p>
//                 </>
//               ) : (
//                 <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {images.map((img, idx) => (
//                     <div key={idx} className="relative group">
//                       <Image
//                         src={img.preview}
//                         alt="preview"
//                         width={300}
//                         height={300}
//                         className="object-cover rounded-[4px] aspect-square"
//                       />
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeImage(idx);
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* VIDEOS UPLOAD */}
//           <div className="mb-10">
//             <h2 className="text-lg font-semibold text-[#1a3a52] mb-4">Videos</h2>
//             <div
//               className={`relative border-2 border-dashed rounded-[4px] p-12 md:p-24 flex flex-col items-center justify-center min-h-[300px] overflow-hidden cursor-pointer transition-colors ${
//                 isDraggingVideos ? "border-blue-400 bg-blue-50" : "border-gray-300"
//               }`}
//               onDragOver={handleDragOverVideos}
//               onDragLeave={handleDragLeaveVideos}
//               onDrop={handleDropVideos}
//               onClick={() => document.getElementById("video-upload")?.click()}
//             >
//               {videos.length === 0 ? (
//                 <>
//                   <Upload className="w-12 h-12 text-gray-400 mb-4" />
//                   <p className="text-gray-500 text-sm">Drag and drop or click to upload videos</p>
//                 </>
//               ) : (
//                 <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {videos.map((vid, idx) => (
//                     <div key={idx} className="relative group">
//                       <video
//                         src={vid.preview}
//                         className="object-cover rounded-[4px] aspect-square"
//                         muted
//                         loop
//                         playsInline
//                       />
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeVideo(idx);
//                         }}
//                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <input
//                 id="video-upload"
//                 type="file"
//                 accept="video/*"
//                 multiple
//                 onChange={handleVideoChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* Terms and Submit */}
//           <div className="space-y-6">
//             <div className="flex items-start gap-3">
//               <Checkbox
//                 id="terms"
//                 checked={agreed}
//                 onCheckedChange={(checked: boolean) => setAgreed(!!checked)}
//                 className="mt-1"
//               />
//               <Label
//                 htmlFor="terms"
//                 className="text-base text-[#616161] leading-relaxed cursor-pointer"
//               >
//                 By submitting this form, you confirm that all information provided is
//                 accurate, valid, and up to date. Bridge Point Solutions may verify your
//                 credentials, licenses, and supporting documents before approval.
//               </Label>
//             </div>

//             <div className="flex justify-end">
//               <Button
//                 type="submit"
//                 disabled={!agreed || mutation.isPending}
//                 className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white px-8 py-6 text-base rounded-[4px] disabled:opacity-60"
//               >
//                 {mutation.isPending ? "Submitting..." : "Submit Listing"}
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }



/* eslint-disable */
"use client";

import { useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// ── TYPES ────────────────────────────────────────────────────────

interface MediaFile {
  file: File;
  preview: string;
}

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyAddress: z.string().min(5, "Company address must be at least 5 characters"),
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientNumber: z
    .string()
    .regex(/^(\+88)?\d{11}$/, "Must be +880XXXXXXXXXX or 01XXXXXXXXX"),
  clientEmail: z.string().email("Invalid email address"),
  serviceCategories: z
    .array(z.string())
    .min(1, "Please select at least one service category"),
  serviceAreas: z.string().min(5, "Service areas must be at least 5 characters"),
  scopeOfWork: z.string().min(3, "Scope of work must be at least 3 characters"),
  workHours: z.string().regex(/^\d+$/, "Work hours must be a number"),
  superContact: z
    .string()
    .regex(/^(\+88)?\d{11}$/, "Must be +880XXXXXXXXXX or 01XXXXXXXXX"),
  superName: z.string().min(2, "Super name must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContractorForm() {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [images, setImages] = useState<MediaFile[]>([]);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [isDraggingImages, setIsDraggingImages] = useState(false);
  const [isDraggingVideos, setIsDraggingVideos] = useState(false);

  const { data: session } = useSession();
  const token = session?.accessToken;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyAddress: "",
      clientName: "",
      clientNumber: "",
      clientEmail: "",
      serviceCategories: [],
      serviceAreas: "",
      scopeOfWork: "",
      workHours: "",
      superContact: "",
      superName: "",
    },
  });

  const selectedServices = watch("serviceCategories");

  const { data: servicesResp, isLoading: servicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/service/`);
      if (!res.ok) throw new Error("Failed to load services");
      return res.json();
    },
  });

  const serviceOptions = servicesResp?.data ?? [];

  // ── IMPROVED MEDIA HANDLERS ──────────────────────────────────────

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file) // More efficient than FileReader
    }));

    if (type === 'image') {
      setImages(prev => [...prev, ...newFiles]);
    } else {
      setVideos(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview); // Clean up memory
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    URL.revokeObjectURL(videos[index].preview); // Clean up memory
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  // Drag & Drop handlers
  const handleDropImages = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingImages(false);
    if (e.dataTransfer.files?.length) {
      handleFileChange({ target: { files: e.dataTransfer.files } } as any, 'image');
    }
  };

  const handleDropVideos = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingVideos(false);
    if (e.dataTransfer.files?.length) {
      handleFileChange({ target: { files: e.dataTransfer.files } } as any, 'video');
    }
  };

  // ── SUBMIT WITH ROBUST ERROR CATCHING ────────────────────────────

  const mutation = useMutation({
    mutationFn: async (formValues: FormData) => {
      const payload = new FormData();

      images.forEach(({ file }) => payload.append("images", file));
      videos.forEach(({ file }) => payload.append("videos", file));

      const jsonData = {
        companyName: formValues.companyName,
        CompanyAddress: formValues.companyAddress,
        name: formValues.clientName,
        number: formValues.clientNumber,
        email: formValues.clientEmail,
        service: formValues.serviceCategories,
        serviceAreas: formValues.serviceAreas,
        scopeWork: formValues.scopeOfWork,
        worlHour: Number(formValues.workHours),
        superContact: formValues.superContact,
        superName: formValues.superName,
      };

      payload.append("data", JSON.stringify(jsonData));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: payload,
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Specifically look for 'message' or 'error' key from your API
        const errorMsg = responseData.message || responseData.error || "Submission failed";
        throw new Error(errorMsg);
      }

      return responseData;
    },

    onSuccess: (response) => {
      toast.success(response.message || "Contractor information submitted successfully!");
      reset();
      // Clean up object URLs to prevent memory leaks
      images.forEach(img => URL.revokeObjectURL(img.preview));
      videos.forEach(vid => URL.revokeObjectURL(vid.preview));
      setImages([]);
      setVideos([]);
      setAgreed(false);
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: FormData) => {
    if (!agreed) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <section id="contractor-form" className="bg-[#e8e8e8] py-[120px] px-4 md:px-8 lg:px-16">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#0F3D61] font-normal mb-8 text-center md:text-left">
          CONTRACTOR INFORMATION FORM
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Company Details */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#424242] mb-6">Company Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="company-name" className="text-base text-[#424242] font-semibold mb-2 block">
                  Company Name
                </Label>
                <Input
                  id="company-name"
                  placeholder="Name Here"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("companyName")}
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
              </div>
              <div>
                <Label htmlFor="company-address" className="text-base text-[#424242] font-semibold mb-2 block">
                  Company Address
                </Label>
                <Input
                  id="company-address"
                  placeholder="Enter address"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("companyAddress")}
                />
                {errors.companyAddress && <p className="text-red-500 text-sm mt-1">{errors.companyAddress.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="client-name" className="text-base text-[#424242] font-semibold mb-2 block">
                  Client Name
                </Label>
                <Input
                  id="client-name"
                  placeholder="Name Here"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("clientName")}
                />
                {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
              </div>
              <div>
                <Label htmlFor="client-number" className="text-base text-[#424242] font-semibold mb-2 block">
                  Client Number
                </Label>
                <Input
                  id="client-number"
                  placeholder="+8801812345678"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("clientNumber")}
                />
                {errors.clientNumber && <p className="text-red-500 text-sm mt-1">{errors.clientNumber.message}</p>}
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
                {errors.clientEmail && <p className="text-red-500 text-sm mt-1">{errors.clientEmail.message}</p>}
              </div>
            </div>
          </div>

          {/* Work Details */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#424242] mb-6">Work Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="text-base text-[#424242] font-semibold mb-2 block">Service Categories</Label>
                <Select
                  onValueChange={(value) => {
                    const current = selectedServices || [];
                    if (!current.includes(value)) {
                      setValue("serviceCategories", [...current, value], { shouldValidate: true });
                    }
                  }}
                  disabled={servicesLoading}
                >
                  <SelectTrigger className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]">
                    <SelectValue placeholder={servicesLoading ? "Loading..." : "Select services..."} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#e8e8e8]">
                    {serviceOptions.map((svc: any) => (
                      <SelectItem
                        key={svc._id}
                        value={svc._id}
                        className={selectedServices?.includes(svc._id) ? "bg-blue-100" : ""}
                      >
                        {svc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedServices?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedServices.map((id) => {
                      const svc = serviceOptions.find((s: any) => s._id === id);
                      return svc ? (
                        <div
                          key={id}
                          className="bg-[#0F3D61]/10 text-[#0F3D61] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {svc.name}
                          <button
                            type="button"
                            onClick={() =>
                              setValue(
                                "serviceCategories",
                                selectedServices.filter((s) => s !== id)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                {errors.serviceCategories && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceCategories.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="service-areas" className="text-base text-[#424242] font-semibold mb-2 block">
                  Service Areas
                </Label>
                <Input
                  id="service-areas"
                  placeholder="Enter service areas"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("serviceAreas")}
                />
                {errors.serviceAreas && <p className="text-red-500 text-sm mt-1">{errors.serviceAreas.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="scope-of-work" className="text-base text-[#424242] font-semibold mb-2 block">
                  Scope of Work
                </Label>
                <Input
                  id="scope-of-work"
                  placeholder="e.g. Full electrical setup"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("scopeOfWork")}
                />
                {errors.scopeOfWork && <p className="text-red-500 text-sm mt-1">{errors.scopeOfWork.message}</p>}
              </div>
              <div>
                <Label htmlFor="work-hours" className="text-base text-[#424242] font-semibold mb-2 block">
                  Work Hours
                </Label>
                <Input
                  id="work-hours"
                  type="number"
                  placeholder="10"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("workHours")}
                />
                {errors.workHours && <p className="text-red-500 text-sm mt-1">{errors.workHours.message}</p>}
              </div>
              <div>
                <Label htmlFor="super-contact" className="text-base text-[#424242] font-semibold mb-2 block">
                  Super Contact
                </Label>
                <Input
                  id="super-contact"
                  placeholder="+8801999888777"
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("superContact")}
                />
                {errors.superContact && <p className="text-red-500 text-sm mt-1">{errors.superContact.message}</p>}
              </div>
              <div>
                <Label htmlFor="super-name" className="text-base text-[#424242] font-semibold mb-2 block">
                  Super Name
                </Label>
                <Input
                  id="super-name"
                  placeholder="Super Name.."
                  className="border-[#C0C3C1] h-[48px] rounded-[4px] text-[#6C757D]"
                  {...register("superName")}
                />
                {errors.superName && <p className="text-red-500 text-sm mt-1">{errors.superName.message}</p>}
              </div>
            </div>
          </div>

          {/* IMAGES UPLOAD */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#1a3a52] mb-4">Images</h2>
            <div
              className={`relative border-2 border-dashed rounded-[4px] p-12 md:p-24 flex flex-col items-center justify-center min-h-[300px] overflow-hidden cursor-pointer transition-colors ${
                isDraggingImages ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDraggingImages(true); }}
              onDragLeave={() => setIsDraggingImages(false)}
              onDrop={handleDropImages}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {images.length === 0 ? (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-sm">Drag and drop or click to upload images</p>
                </>
              ) : (
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <Image
                        src={img.preview}
                        alt="preview"
                        width={300}
                        height={300}
                        className="object-cover rounded-[4px] aspect-square"
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, 'image')}
                className="hidden"
              />
            </div>
          </div>

          {/* VIDEOS UPLOAD */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-[#1a3a52] mb-4">Videos</h2>
            <div
              className={`relative border-2 border-dashed rounded-[4px] p-12 md:p-24 flex flex-col items-center justify-center min-h-[300px] overflow-hidden cursor-pointer transition-colors ${
                isDraggingVideos ? "border-blue-400 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDraggingVideos(true); }}
              onDragLeave={() => setIsDraggingVideos(false)}
              onDrop={handleDropVideos}
              onClick={() => document.getElementById("video-upload")?.click()}
            >
              {videos.length === 0 ? (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-sm">Drag and drop or click to upload videos</p>
                </>
              ) : (
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {videos.map((vid, idx) => (
                    <div key={idx} className="relative group">
                      <video
                        src={vid.preview}
                        className="object-cover rounded-[4px] aspect-square"
                        muted
                        loop
                        playsInline
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeVideo(idx); }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileChange(e, 'video')}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked: boolean) => setAgreed(!!checked)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-base text-[#616161] leading-relaxed cursor-pointer">
                By submitting this form, you confirm that all information provided is accurate...
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