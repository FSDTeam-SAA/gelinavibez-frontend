"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEditProperty, useGetSingelProperty } from "@/hooks/ApiClling";
import { useSession } from "next-auth/react";
import { IProperty } from "@/types/ApartmentResponse";

const propertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.string().min(1, "Price is required"),
    month: z.string().min(1, "Select a month"),
    time: z.string().min(1, "Available time is required"),
    beds: z.string().min(1, "Beds is required"),
    address: z.string().min(1, "Address is required"),
    washrooms: z.string().min(1, "Washrooms is required"),
    squarefeets: z.string().min(1, "Square feet is required"),
    description: z.string().min(1, "Description is required"),
    about: z.string().min(1, "About listing is required"),
    day: z.string().min(1, "Select a day"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export function EditProperty({ id }: { id: string }) {
    const [thumbnails, setThumbnails] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [existingVideos, setExistingVideos] = useState<string[]>([]);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const { data: session } = useSession();
    const token = session?.accessToken || "";
    const { data: propertyData, isLoading } = useGetSingelProperty(token, id);
    const editPropertyMutation = useEditProperty(token, id);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: "",
            price: "",
            month: "",
            time: "",
            beds: "",
            address: "",
            washrooms: "",
            squarefeets: "",
            description: "",
            about: "",
            day: "",
        },
    });

    // Populate form with existing data
    useEffect(() => {
        if (propertyData?.data) {
            const data = propertyData.data;
            setValue("title", data?.title);
            setValue("price", data?.price?.toString());
            setValue("month", data?.availableFrom?.month?.split("T")[0]); // Format date to YYYY-MM-DD
            setValue("time", data?.availableFrom?.time?.split("T")[1].slice(0, 5)); // Format time to HH:MM
            setValue("beds", data?.bedrooms?.toString());
            setValue("address", data?.address?.state);
            setValue("washrooms", data?.bathrooms?.toString());
            setValue("squarefeets", data?.squareFeet?.toString());
            setValue("description", data?.description);
            setValue("about", data?.aboutListing);
            setValue("day", data?.day);
            setExistingImages(data?.images || []);
            setExistingVideos(data?.videos || []);
        }
    }, [propertyData, setValue]);

    const handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        const files = Array.from(e.target.files || []);
        setThumbnails((prev) => [...prev, ...files].slice(0, 5));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setVideos((prev) => [...prev, ...files].slice(0, 5));
    };

    const removeThumbnail = (index: number) => {
        setThumbnails((prev) => prev.filter((_, i) => i !== index));
    };

    const removeVideo = (index: number) => {
        setVideos((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingVideo = (index: number) => {
        setExistingVideos((prev) => prev.filter((_, i) => i !== index));
    };

    const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.click();
    };

    const onSubmit = (data: PropertyFormData) => {
        const payload: IProperty = {
            ...data,
            thumbnails,
            videos
        };

        editPropertyMutation.mutate(payload);
    };

    // Styles
    const inputStyle =
        "w-full border border-[#B6B6B6] h-[50px] rounded-[4px] placeholder:text-[#B6B6B6] text-sm";
    const textareaStyle =
        "w-full border border-[#B6B6B6] rounded-[4px] placeholder:text-[#B6B6B6] text-sm min-h-[341px] p-3";
    const selectStyle =
        "w-full border border-[#B6B6B6] h-[50px] rounded-[4px] text-sm placeholder:text-[#B6B6B6]";
    const uploadBoxStyle =
        "border-2 border-dashed border-[#B6B6B6] rounded-[4px] p-8 text-center cursor-pointer hover:bg-gray-50";

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h4 className="text-2xl font-semibold text-[#0F3D61]">Edit Property</h4>
                <h3 className="text-sm text-[#929292] mt-1">
                    Update your property listing details.
                </h3>
            </div>

            {/* Breadcrumb */}
            <div className="text-base text-[#929292]">
                Dashboard <span className="mx-2">{">"}</span> Edit Apartment Listing
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-0">
                    <div className="p-6">
                        <label className="block text-base font-semibold text-[#000000] mb-2">
                            Add Title
                        </label>
                        <Input {...register("title")} placeholder="Add your title..." className={inputStyle} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="p-6">
                        <label className="block text-base font-semibold text-[#000000] mb-2">Address</label>
                        <Input {...register("address")} placeholder="Address" className={inputStyle} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-base font-semibold mb-2">Price</label>
                            <Input type="number" {...register("price")} placeholder="Add price..." className={inputStyle} />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label className="block text-base font-semibold mb-2">Select Month</label>
                            <Input {...register("month")} type="date" className={inputStyle} />
                            {errors.month && <p className="text-red-500 text-sm">{errors.month.message}</p>}
                        </div>
                        <div>
                            <label className="block text-base font-semibold mb-2">Available Time</label>
                            <Input  {...register("time")} placeholder="Write here" className={inputStyle} />
                            {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                        </div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-base font-semibold mb-2">Beds</label>
                            <Input type="number" {...register("beds")} placeholder="Write here" className={inputStyle} />
                            {errors.beds && <p className="text-red-500 text-sm">{errors.beds.message}</p>}
                        </div>
                        <div>
                            <label className="block text-base font-semibold mb-2">Washrooms</label>
                            <Input type="number" {...register("washrooms")} placeholder="Write here" className={inputStyle} />
                            {errors.washrooms && <p className="text-red-500 text-sm">{errors.washrooms.message}</p>}
                        </div>
                        <div>
                            <label className="block text-base font-semibold mb-2">Squarefeets</label>
                            <Input type="number" {...register("squarefeets")} placeholder="Write here" className={inputStyle} />
                            {errors.squarefeets && <p className="text-red-500 text-sm">{errors.squarefeets.message}</p>}
                        </div>
                    </div>

                    <div className="p-6">
                        <label className="block text-base font-semibold mb-2">Description</label>
                        <Textarea {...register("description")} placeholder="Description..." className={textareaStyle} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="p-6">
                        <label className="block text-base font-semibold mb-2">About Listing</label>
                        <Textarea {...register("about")} placeholder="Description..." className={textareaStyle} />
                        {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-base font-semibold mb-2">Day</label>
                        <Select onValueChange={(value) => setValue("day", value)} defaultValue={propertyData?.data.day}>
                            <SelectTrigger className={selectStyle}>
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                            <SelectContent className="bg-white z-40">
                                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(
                                    (day) => (
                                        <SelectItem key={day} value={day}>
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                        {errors.day && <p className="text-red-500 text-sm">{errors.day.message}</p>}
                    </div>

                    <div className="pt-[46px]">
                        <label className="block text-base font-semibold mb-2">Thumbnail</label>
                        <div
                            className={uploadBoxStyle}
                            onClick={() => triggerFileInput(thumbnailInputRef)}
                        >
                            <ImagePlus className="w-12 h-12 mx-auto text-gray-400 mb-2 mt-[100px]" />
                            <p className="text-sm text-gray-500">Upload thumbnail</p>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={thumbnailInputRef}
                                onChange={handleThumbnailChange}
                                className="hidden"
                            />
                            <div className="grid grid-cols-5 gap-2 mt-[100px]">
                                {existingImages.map((url, index) => (
                                    <div key={`existing-${index}`} className="relative aspect-square">
                                        <Image
                                            src={url}
                                            alt={`Existing Thumbnail ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-[4px]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {thumbnails.map((file, index) => (
                                    <div key={`new-${index}`} className="relative aspect-square">
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt={`New Thumbnail ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-[4px]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeThumbnail(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-[46px]">
                        <label className="block text-base font-semibold mb-2">Videos</label>
                        <div className={uploadBoxStyle} onClick={() => triggerFileInput(videoInputRef)}>
                            <Video className="w-12 h-12 mx-auto text-amber-600 mb-2 mt-[100px]" />
                            <p className="text-sm text-gray-500">Upload videos</p>
                            <input
                                type="file"
                                accept="video/*"
                                multiple
                                ref={videoInputRef}
                                onChange={handleVideoChange}
                                className="hidden"
                            />
                            <div className="grid grid-cols-5 gap-2 mt-[100px]">
                                {existingVideos.map((url, index) => (
                                    <div key={`existing-video-${index}`} className="relative aspect-square">
                                        <video
                                            src={url}
                                            className="w-full h-full object-cover rounded-[4px]"
                                            controls
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingVideo(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {videos.map((file, index) => (
                                    <div key={`new-video-${index}`} className="relative aspect-square">
                                        <video
                                            src={URL.createObjectURL(file)}
                                            className="w-full h-full object-cover rounded-[4px]"
                                            controls
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeVideo(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#0F3D61] hover:bg-[#0D3555] text-white h-[50px] rounded-[4px] text-sm"
                        disabled={editPropertyMutation.isPending}
                    >
                        Update Property {editPropertyMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    </Button>
                </div>
            </form>
        </div>
    );
}