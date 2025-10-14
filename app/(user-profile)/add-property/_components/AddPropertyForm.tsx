
// "use client"

// import { useState, useRef } from "react"
// import { ImagePlus, Video, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export function AddPropertyForm() {
//   const [thumbnails, setThumbnails] = useState<File[]>([])
//   const [videos, setVideos] = useState<File[]>([])
//   const thumbnailInputRef = useRef<HTMLInputElement>(null)
//   const videoInputRef = useRef<HTMLInputElement>(null)

//   const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     setThumbnails((prev) => [...prev, ...files].slice(0, 5))
//   }

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     setVideos((prev) => [...prev, ...files].slice(0, 5))
//   }

//   const removeThumbnail = (index: number) => {
//     setThumbnails((prev) => prev.filter((_, i) => i !== index))
//   }

//   const removeVideo = (index: number) => {
//     setVideos((prev) => prev.filter((_, i) => i !== index))
//   }

//   const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
//     ref.current?.click()
//   }

//   const inputStyle =
//     "w-full border border-[#B6B6B6] h-[50px] rounded-[4px] placeholder:text-[#B6B6B6] text-sm"

//   const textareaStyle =
//     "w-full border border-[#B6B6B6] rounded-[4px] placeholder:text-[#B6B6B6] text-sm min-h-[150px] p-3"

//   const selectStyle =
//     "w-full border border-[#B6B6B6] h-[50px] rounded-[4px] text-sm placeholder:text-[#B6B6B6]"

//   const uploadBoxStyle =
//     "border-2 border-dashed border-[#B6B6B6] rounded-[4px] p-8 text-center cursor-pointer hover:bg-gray-50"

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h4 className="text-2xl font-semibold text-[#0F3D61]">Property</h4>
//         <h3 className="text-sm text-[#929292] mt-1">
//           Manage your personal information and profile details.
//         </h3>
//       </div>

//       {/* Breadcrumb */}
//       <div className="text-base text-[#929292]">
//         Dashboard <span className="mx-2">{">"}</span> Add Apartment Listing
//       </div>

//       {/* Form */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Add Title */}
//           <div className="p-6">
//             <label className="block text-base font-semibold text-[#000000] mb-2">
//               Add Title
//             </label>
//             <Input placeholder="Add your title..." className={inputStyle} />
//           </div>

//           {/* Price, Month, Time */}
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-base font-semibold text-[#000000] mb-2">
//                   Price
//                 </label>
//                 <Input placeholder="Add price..." className={inputStyle} />
//               </div>
//               <div>
//                 <label className="block text-base font-semibold text-[#000000] mb-2">
//                   Select Month
//                 </label>
//                 <Input type="date" className={inputStyle} />
//               </div>
//               <div>
//                 <label className="block text-base font-semibold text-[#000000] mb-2">
//                   Available Time
//                 </label>
//                 <Input placeholder="Write here" className={inputStyle} />
//               </div>
//             </div>
//           </div>

//           {/* Beds, Washrooms, Squarefeets */}
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-base font-semibold text-[#000000] mb-2">
//                   Beds
//                 </label>
//                 <Input placeholder="Write here" className={inputStyle} />
//               </div>
//               <div>
//                 <label className="block text-base font-semibold text-[#000000] mb-2">
//                   Washrooms
//                 </label>
//                 <Input placeholder="Write here" className={inputStyle} />
//               </div>
//               <div>
//                 <label className="block text-base font-semibold text-[#000000] mb-2">
//                   Squarefeets
//                 </label>
//                 <Input placeholder="Write here" className={inputStyle} />
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="p-6">
//             <label className="block text-base font-semibold text-[#000000] mb-2">
//               Description
//             </label>
//             <Textarea placeholder="Description..." className={textareaStyle} />
//           </div>

//           {/* About Listing */}
//           <div className="p-6">
//             <label className="block text-base font-semibold text-[#000000] mb-2">
//               About Listing
//             </label>
//             <Textarea placeholder="Description..." className={textareaStyle} />
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Day */}
//           <div className="p-6">
//             <label className="block text-base font-semibold text-[#000000] mb-2">Day</label>
//             <Select>
//               <SelectTrigger className={selectStyle}>
//                 <SelectValue placeholder="Select a day" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="monday">Monday</SelectItem>
//                 <SelectItem value="tuesday">Tuesday</SelectItem>
//                 <SelectItem value="wednesday">Wednesday</SelectItem>
//                 <SelectItem value="thursday">Thursday</SelectItem>
//                 <SelectItem value="friday">Friday</SelectItem>
//                 <SelectItem value="saturday">Saturday</SelectItem>
//                 <SelectItem value="sunday">Sunday</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Thumbnail */}
//           <div className="p-6">
//             <label className="block text-base font-semibold text-[#000000] mb-2">
//               Thumbnail
//             </label>
//             <div className={uploadBoxStyle} onClick={() => triggerFileInput(thumbnailInputRef)}>
//               <ImagePlus className="w-12 h-12 mx-auto text-gray-400 mb-2" />
//               <p className="text-sm text-gray-500">Upload thumbnail</p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 ref={thumbnailInputRef}
//                 onChange={handleThumbnailChange}
//                 className="hidden"
//               />
//             </div>
//             <div className="grid grid-cols-5 gap-2 mt-4">
//               {thumbnails.map((file, index) => (
//                 <div key={index} className="relative aspect-square">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover rounded-[4px]"
//                   />
//                   <button
//                     onClick={() => removeThumbnail(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//               {Array.from({ length: 5 - thumbnails.length }).map((_, i) => (
//                 <div key={i} className="aspect-square bg-gray-200 rounded-[4px]" />
//               ))}
//             </div>
//           </div>

//           {/* Videos */}
//           <div className="p-6">
//             <label className="block text-base font-semibold text-[#000000] mb-2">Videos</label>
//             <div className={uploadBoxStyle} onClick={() => triggerFileInput(videoInputRef)}>
//               <Video className="w-12 h-12 mx-auto text-amber-600 mb-2" />
//               <p className="text-sm text-gray-500">Upload videos</p>
//               <input
//                 type="file"
//                 accept="video/*"
//                 multiple
//                 ref={videoInputRef}
//                 onChange={handleVideoChange}
//                 className="hidden"
//               />
//             </div>
//             <div className="grid grid-cols-5 gap-2 mt-4">
//               {videos.map((file, index) => (
//                 <div key={index} className="relative aspect-square">
//                   <video
//                     src={URL.createObjectURL(file)}
//                     className="w-full h-full object-cover rounded-[4px]"
//                     controls
//                   />
//                   <button
//                     onClick={() => removeVideo(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//               {Array.from({ length: 5 - videos.length }).map((_, i) => (
//                 <div key={i} className="aspect-square bg-gray-200 rounded-[4px]" />
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <Button className="w-full bg-[#0F3D61] hover:bg-[#0D3555] text-white h-[50px] rounded-[4px] text-sm">
//             Send Request
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ImagePlus, Video, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddPropertyForm() {
  const [thumbnails, setThumbnails] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    month: "",
    time: "",
    beds: "",
    washrooms: "",
    squarefeets: "",
    description: "",
    about: "",
    day: ""
  })
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setThumbnails((prev) => [...prev, ...files].slice(0, 5))
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setVideos((prev) => [...prev, ...files].slice(0, 5))
  }

  const removeThumbnail = (index: number) => {
    setThumbnails((prev) => prev.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index))
  }

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click()
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, day: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", {
      ...formData,
      thumbnails: thumbnails.map((file) => file.name),
      videos: videos.map((file) => file.name)
    })
  }

  const inputStyle =
    "w-full border border-[#B6B6B6] h-[50px] rounded-[4px] placeholder:text-[#B6B6B6] text-sm"

  const textareaStyle =
    "w-full border border-[#B6B6B6] rounded-[4px] placeholder:text-[#B6B6B6] text-sm min-h-[341px] p-3"

  const selectStyle =
    "w-full border border-[#B6B6B6] h-[50px] rounded-[4px] text-sm placeholder:text-[#B6B6B6]"

  const uploadBoxStyle =
    "border-2 border-dashed border-[#B6B6B6] rounded-[4px] p-8 text-center cursor-pointer hover:bg-gray-50"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h4 className="text-2xl font-semibold text-[#0F3D61]">Property</h4>
        <h3 className="text-sm text-[#929292] mt-1">
          Manage your personal information and profile details.
        </h3>
      </div>

      {/* Breadcrumb */}
      <div className="text-base text-[#929292]">
        Dashboard <span className="mx-2">{">"}</span> Add Apartment Listing
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-0">
          {/* Add Title */}
          <div className="p-6">
            <label className="block text-base font-semibold text-[#000000] mb-2">
              Add Title
            </label>
            <Input
              name="title"
              placeholder="Add your title..."
              className={inputStyle}
              onChange={handleInputChange}
            />
          </div>

          {/* Price, Month, Time */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-base font-semibold text-[#000000] mb-2">
                  Price
                </label>
                <Input
                  name="price"
                  placeholder="Add price..."
                  className={inputStyle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-[#000000] mb-2">
                  Select Month
                </label>
                <Input
                  name="month"
                  type="date"
                  className={inputStyle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-[#000000] mb-2">
                  Available Time
                </label>
                <Input
                  name="time"
                  placeholder="Write here"
                  className={inputStyle}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Beds, Washrooms, Squarefeets */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-base font-semibold text-[#000000] mb-2">
                  Beds
                </label>
                <Input
                  name="beds"
                  placeholder="Write here"
                  className={inputStyle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-[#000000] mb-2">
                  Washrooms
                </label>
                <Input
                  name="washrooms"
                  placeholder="Write here"
                  className={inputStyle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-[#000000] mb-2">
                  Squarefeets
                </label>
                <Input
                  name="squarefeets"
                  placeholder="Write here"
                  className={inputStyle}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6">
            <label className="block text-base font-semibold text-[#000000] mb-2">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Description..."
              className={textareaStyle}
              onChange={handleInputChange}
            />
          </div>

          {/* About Listing */}
          <div className="p-6">
            <label className="block text-base font-semibold text-[#000000] mb-2">
              About Listing
            </label>
            <Textarea
              name="about"
              placeholder="Description..."
              className={textareaStyle}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Day */}
          <div className="">
            <label className="block text-base font-semibold text-[#000000] mb-2">Day</label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className={selectStyle}>
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent className="bg-white z-40">
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Thumbnail */}
          <div className="pt-[46px]">
            <label className="block text-base font-semibold text-[#000000] mb-2">
              Thumbnail
            </label>
            <div className={uploadBoxStyle} onClick={() => triggerFileInput(thumbnailInputRef)}>
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
              {thumbnails.map((file, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded-[4px]"
                    priority={index === 0}
                  />
                  <button
                    onClick={() => removeThumbnail(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {Array.from({ length: 5 - thumbnails.length }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-[4px]" />
              ))}
            </div>
            </div>
          </div>

          {/* Videos */}
          <div className="pt-[46px]">
            <label className="block text-base font-semibold text-[#000000] mb-2">Videos</label>
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
              {videos.map((file, index) => (
                <div key={index} className="relative aspect-square">
                  <video
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-cover rounded-[4px]"
                    controls
                  />
                  <button
                    onClick={() => removeVideo(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {Array.from({ length: 5 - videos.length }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-[4px]" />
              ))}
            </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#0F3D61] hover:bg-[#0D3555] text-white h-[50px] rounded-[4px] text-sm"
          >
            Send Request
          </Button>
        </div>
      </form>
    </div>
  )
}