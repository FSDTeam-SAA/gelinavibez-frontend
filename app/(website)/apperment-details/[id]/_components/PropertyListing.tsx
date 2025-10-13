// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { MapPin, Play } from "lucide-react"
// import Image from "next/image"

// type MediaItem = {
//   id: number
//   type: "image" | "video"
//   src: string
//   thumbnail: string
//   alt: string
// }

// const mediaItems: MediaItem[] = [
//   { id: 1, type: "image", src: "/assets/galary.jpg", thumbnail: "/assets/galary.jpg", alt: "Property exterior night view" },
//   { id: 2, type: "image", src: "/assets/galary2.jpg", thumbnail: "/assets/galary2.jpg", alt: "Living room interior" },
//   { id: 3, type: "image", src: "/assets/galary3.jpg", thumbnail: "/assets/galary3.jpg", alt: "Bedroom with city view" },
//   { id: 4, type: "image", src: "/assets/galary.jpg", thumbnail: "/assets/galary.jpg", alt: "Modern kitchen" },
//   { id: 5, type: "image", src: "/assets/galary2.jpg", thumbnail: "/assets/galary2.jpg", alt: "Luxury bathroom" },
//   { id: 6, type: "image", src: "/assets/galary3.jpg", thumbnail: "/assets/galary3.jpg", alt: "Luxury bathroom" },
//   { id: 7, type: "image", src: "/assets/galary.jpg", thumbnail: "/assets/galary.jpg", alt: "Luxury bathroom" },
//   { id: 8, type: "image", src: "/assets/galary2.jpg", thumbnail: "/assets/galary3.jpg", alt: "Luxury bathroom" },
// ]

// const galleryItems: MediaItem[] = [
//   {
//     id: 7,
//     type: "video",
//     src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
//     thumbnail: "/assets/galary.jpg",
//     alt: "Living room tour",
//   },
//   {
//     id: 8,
//     type: "video",
//     src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
//     thumbnail: "/assets/galary2.jpg",
//     alt: "Apartment walkthrough",
//   },
//   {
//     id: 9,
//     type: "video",
//     src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
//     thumbnail: "/assets/galary3.jpg",
//     alt: "Interior design tour",
//   },
//   {
//     id: 10,
//     type: "image",
//     src: "/modern-apartment-living-room-natural-light.jpg",
//     thumbnail: "/assets/galary.jpg",
//     alt: "Living room with natural light",
//   },
//   {
//     id: 11,
//     type: "video",
//     src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
//     thumbnail: "/assets/galary3.jpg",
//     alt: "Cozy living space",
//   },
// ]

// export default function PropertyListing() {
//   const [selectedMedia, setSelectedMedia] = useState<MediaItem>(mediaItems[0])
//   const [selectedGalleryMedia, setSelectedGalleryMedia] = useState<MediaItem>(galleryItems[0])

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Top Section */}
//       <div className="container mx-auto px-4 py-10 lg:py-[72px]">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* Thumbnail Sidebar */}
//           <div className="lg:col-span-1 order-2 lg:order-1">
//             <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide md:space-y-2">
//               {mediaItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => setSelectedMedia(item)}
//                   className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:h-[55px] rounded-[8px] overflow-hidden border-2 transition-all hover:border-[#0F3D61] ${
//                     selectedMedia.id === item.id ? "border-[#0F3D61]" : "border-border"
//                   }`}
//                 >
//                   <Image
//                     src={item.thumbnail || "/placeholder.svg"}
//                     alt={item.alt}
//                     width={1000}
//                     height={1000}
//                     className="w-full h-full object-cover"
//                   />
//                   {item.type === "video" && (
//                     <div className="absolute inset-0 flex items-center justify-center ">
//                       <Play className="w-6 h-6 text-white fill-white" />
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Main Preview */}
//           <div className="lg:col-span-6 order-1 lg:order-2">
//             <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
//               <div className="relative w-full h-[260px] sm:h-[400px] md:h-[580px] bg-muted">
//                 {selectedMedia.type === "image" ? (
//                   <Image
//                     src={selectedMedia.src || "/placeholder.svg"}
//                     alt={selectedMedia.alt}
//                     width={1000}
//                     height={1000}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <video
//                     key={selectedMedia.id}
//                     controls
//                     className="w-full h-full object-cover"
//                     poster={selectedMedia.thumbnail}
//                   >
//                     <source src={selectedMedia.src} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             </Card>
//           </div>

//           {/* Right Details Panel */}
//           <div className="lg:col-span-5 order-3 space-y-4">
//             <h1 className="text-3xl md:text-[40px] font-normal text-[#0F3D61]">THE HARBOR CROWN</h1>

//             <div className="flex flex-wrap items-start gap-2 text-base text-[#68706A] mb-4">
//               <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A60000]" />
//               <span>
//                 888 Harbor Dr, Marina District |{" "}
//                 <span className="text-[#131313]">Tue, Sep 23, 2025, 11:00 PM</span> | 1 Bed With 1 Bath
//               </span>
//             </div>

//             <p className="text-base text-[#616161] font-normal leading-[150%] mb-4 text-justify">
//               The Harbor Crown offers modern and comfortable living with thoughtfully designed apartments, flexible layouts, and premium amenities. Residents enjoy a secure and welcoming environment with easy access to essential services, convenient maintenance support, and nearby community facilities. Whether you’re looking for a vibrant lifestyle or a peaceful retreat, The Harbor Crown ensures comfort, reliability, and a place you’ll be proud to call home.
//             </p>

//             <div>
//               <h2 className="text-lg md:text-xl font-bold text-[#0F3D61] mb-2">Description:</h2>
//               <p className="text-base text-[#616161] leading-[150%] font-normal text-justify">
//                 The Harbor Crown offers modern and comfortable living with thoughtfully designed apartments, flexible layouts, and premium amenities. Residents enjoy a secure and welcoming environment with easy access to essential services, convenient maintenance support, and nearby community facilities. Whether you’re looking for a vibrant lifestyle or a peaceful retreat, The Harbor Crown ensures comfort, reliability, and a place you’ll be proud to call home.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold text-foreground mb-2">Pricing</h3>
//               <div className="flex items-baseline gap-2 mb-4">
//                 <span className="text-3xl md:text-4xl font-bold text-[#0F3D61]">$ 2,200</span>
//                 <span className="text-sm text-muted-foreground">/Month</span>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <Button variant="outline" size="lg" className="w-full h-[48px] rounded-[8px] text-[#0F3D61]">
//                   Request a Call
//                 </Button>
//                 <Button size="lg" className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[48px] rounded-[8px] text-[#F5F5F5]">
//                   Apply Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Gallery Section */}
//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <Card className="overflow-hidden rounded-xl border-0 shadow-lg mb-6">
//           <div className="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[483px] bg-muted">
//             {selectedGalleryMedia.type === "image" ? (
//               <Image
//                 src={selectedGalleryMedia.src || "/placeholder.svg"}
//                 alt={selectedGalleryMedia.alt}
//                 width={1000}
//                 height={1000}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <video
//                 key={selectedGalleryMedia.id}
//                 controls
//                 className="w-full h-full object-cover"
//                 poster={selectedGalleryMedia.thumbnail}
//               >
//                 <source src={selectedGalleryMedia.src} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </div>
//         </Card>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
//           {galleryItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setSelectedGalleryMedia(item)}
//               className="relative rounded-lg overflow-hidden"
//             >
//               <Image
//                 src={item.thumbnail || "/placeholder.svg"}
//                 alt={item.alt}
//                 width={1000}
//                 height={1000}
//                 className="w-full h-[120px] sm:h-[140px] md:h-[157px] object-cover rounded-[8px]"
//               />
//               {item.type === "video" && (
//                 <div className="absolute inset-0 flex items-center justify-center ">
//                   <Play className="w-8 h-8 text-white fill-white" />
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Play } from "lucide-react"
import Image from "next/image"
import { CallRequestModal } from "./CallRequestModal"
import { TenantApplicationModal } from "./TenantApplicationModal"


type MediaItem = {
  id: number
  type: "image" | "video"
  src: string
  thumbnail: string
  alt: string
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "image",
    src: "/assets/galary.jpg",
    thumbnail: "/assets/galary.jpg",
    alt: "Property exterior night view",
  },
  { id: 2, type: "image", src: "/assets/galary2.jpg", thumbnail: "/assets/galary2.jpg", alt: "Living room interior" },
  { id: 3, type: "image", src: "/assets/galary3.jpg", thumbnail: "/assets/galary3.jpg", alt: "Bedroom with city view" },
  { id: 4, type: "image", src: "/assets/galary.jpg", thumbnail: "/assets/galary.jpg", alt: "Modern kitchen" },
  { id: 5, type: "image", src: "/assets/galary2.jpg", thumbnail: "/assets/galary2.jpg", alt: "Luxury bathroom" },
  { id: 6, type: "image", src: "/assets/galary3.jpg", thumbnail: "/assets/galary3.jpg", alt: "Luxury bathroom" },
  { id: 7, type: "image", src: "/assets/galary.jpg", thumbnail: "/assets/galary.jpg", alt: "Luxury bathroom" },
  { id: 8, type: "image", src: "/assets/galary2.jpg", thumbnail: "/assets/galary3.jpg", alt: "Luxury bathroom" },
]

const galleryItems: MediaItem[] = [
  {
    id: 7,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "/assets/galary.jpg",
    alt: "Living room tour",
  },
  {
    id: 8,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "/assets/galary2.jpg",
    alt: "Apartment walkthrough",
  },
  {
    id: 9,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "/assets/galary3.jpg",
    alt: "Interior design tour",
  },
  {
    id: 10,
    type: "image",
    src: "/modern-apartment-living-room-natural-light.jpg",
    thumbnail: "/assets/galary.jpg",
    alt: "Living room with natural light",
  },
  {
    id: 11,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "/assets/galary3.jpg",
    alt: "Cozy living space",
  },
]

export default function PropertyListing() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem>(mediaItems[0])
  const [selectedGalleryMedia, setSelectedGalleryMedia] = useState<MediaItem>(galleryItems[0])
  const [isCallRequestOpen, setIsCallRequestOpen] = useState(false)
  const [isTenantApplicationOpen, setIsTenantApplicationOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-10 lg:py-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Thumbnail Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide md:space-y-2">
              {mediaItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:h-[55px] rounded-[8px] overflow-hidden border-2 transition-all hover:border-[#0F3D61] ${
                    selectedMedia.id === item.id ? "border-[#0F3D61]" : "border-border"
                  }`}
                >
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center ">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Preview */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
              <div className="relative w-full h-[260px] sm:h-[400px] md:h-[580px] bg-muted">
                {selectedMedia.type === "image" ? (
                  <Image
                    src={selectedMedia.src || "/placeholder.svg"}
                    alt={selectedMedia.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    key={selectedMedia.id}
                    controls
                    className="w-full h-full object-cover"
                    poster={selectedMedia.thumbnail}
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </Card>
          </div>

          {/* Right Details Panel */}
          <div className="lg:col-span-5 order-3 space-y-4">
            <h1 className="text-3xl md:text-[40px] font-normal text-[#0F3D61]">THE HARBOR CROWN</h1>

            <div className="flex flex-wrap items-start gap-2 text-base text-[#68706A] mb-4">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A60000]" />
              <span>
                888 Harbor Dr, Marina District | <span className="text-[#131313]">Tue, Sep 23, 2025, 11:00 PM</span> | 1
                Bed With 1 Bath
              </span>
            </div>

            <p className="text-base text-[#616161] font-normal leading-[150%] mb-4 text-justify">
              The Harbor Crown offers modern and comfortable living with thoughtfully designed apartments, flexible
              layouts, and premium amenities. Residents enjoy a secure and welcoming environment with easy access to
              essential services, convenient maintenance support, and nearby community facilities. Whether you&apos;re
              looking for a vibrant lifestyle or a peaceful retreat, The Harbor Crown ensures comfort, reliability, and
              a place you&apos;ll be proud to call home.
            </p>

            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#0F3D61] mb-2">Description:</h2>
              <p className="text-base text-[#616161] leading-[150%] font-normal text-justify">
                The Harbor Crown offers modern and comfortable living with thoughtfully designed apartments, flexible
                layouts, and premium amenities. Residents enjoy a secure and welcoming environment with easy access to
                essential services, convenient maintenance support, and nearby community facilities. Whether you&apos;re
                looking for a vibrant lifestyle or a peaceful retreat, The Harbor Crown ensures comfort, reliability,
                and a place you&apos;ll be proud to call home.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Pricing</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl md:text-4xl font-bold text-[#0F3D61]">$ 2,200</span>
                <span className="text-sm text-muted-foreground">/Month</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-[48px] rounded-[8px] text-[#0F3D61] bg-transparent"
                  onClick={() => setIsCallRequestOpen(true)}
                >
                  Request a Call
                </Button>
                <Button
                  size="lg"
                  className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[48px] rounded-[8px] text-[#F5F5F5]"
                  onClick={() => setIsTenantApplicationOpen(true)}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gallery Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Card className="overflow-hidden rounded-xl border-0 shadow-lg mb-6">
          <div className="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[483px] bg-muted">
            {selectedGalleryMedia.type === "image" ? (
              <Image
                src={selectedGalleryMedia.src || "/placeholder.svg"}
                alt={selectedGalleryMedia.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                key={selectedGalleryMedia.id}
                controls
                className="w-full h-full object-cover"
                poster={selectedGalleryMedia.thumbnail}
              >
                <source src={selectedGalleryMedia.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {galleryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedGalleryMedia(item)}
              className="relative rounded-lg overflow-hidden"
            >
              <Image
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.alt}
                width={1000}
                height={1000}
                className="w-full h-[120px] sm:h-[140px] md:h-[157px] object-cover rounded-[8px]"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center ">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <CallRequestModal open={isCallRequestOpen} onOpenChange={setIsCallRequestOpen} />
      <TenantApplicationModal open={isTenantApplicationOpen} onOpenChange={setIsTenantApplicationOpen} />
    </div>
  )
}
