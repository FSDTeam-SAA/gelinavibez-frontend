"use client"

import { useState, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Play } from "lucide-react"
import Image from "next/image"
import { CallRequestModal } from "./CallRequestModal"
import { TenantApplicationModal } from "./TenantApplicationModal"
import { useParams } from "next/navigation"

interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  thumbnail: string
  alt: string
}

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

interface AvailableFrom {
  month: string
  time: string
}

interface Apartment {
  address: Address
  availableFrom: AvailableFrom
  _id: string
  title: string
  description: string
  aboutListing: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  amenities: string[]
  images: string[]
  videos: string[]
  day: string
  action: string
  status: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  statusCode: number
  success: boolean
  message: string
  data: Apartment
}

const fetchApartment = async (id: string): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch apartment data")
  }
  return response.json()
}

export default function PropertyListing() {
  const params = useParams()
  const id = params.id as string

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["apartment", id],
    queryFn: () => fetchApartment(id),
  })

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [selectedGalleryMedia, setSelectedGalleryMedia] = useState<MediaItem | null>(null)
  const [isCallRequestOpen, setIsCallRequestOpen] = useState(false)
  const [isTenantApplicationOpen, setIsTenantApplicationOpen] = useState(false)

  //  useMemo for images
  const imageItems: MediaItem[] = useMemo(() => {
    return data?.data.images.map((src, index) => ({
      id: index + 1,
      type: "image" as const,
      src,
      thumbnail: src,
      alt: `Apartment image ${index + 1}`,
    })) || []
  }, [data?.data.images])

  // useMemo for videos
  const galleryItems: MediaItem[] = useMemo(() => {
    return data?.data.videos.map((src, index) => ({
      id: index + 1,
      type: "video" as const,
      src,
      thumbnail: data?.data.images[0] || "/placeholder.svg",
      alt: `Apartment video ${index + 1}`,
    })) || []
  }, [data?.data.videos, data?.data.images])

  // ✅ Initialize selected media safely
  useEffect(() => {
    if (!selectedMedia && imageItems.length > 0) {
      setSelectedMedia(imageItems[0])
    }
    if (!selectedGalleryMedia && galleryItems.length > 0) {
      setSelectedGalleryMedia(galleryItems[0])
    }
  }, [imageItems, galleryItems, selectedMedia, selectedGalleryMedia])

  const availableDate = data?.data
    ? new Date(data.data.availableFrom.time).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : ""

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Skeleton loader ... keep your existing skeleton code here */}
      </div>
    )
  }

  if (error || !data?.data) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Error loading apartment data</div>
  }

  const apartment = data.data

  return (
    <div className="min-h-screen bg-white">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-10 lg:py-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Thumbnail Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide md:space-y-2">
              {imageItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMedia(item)}
                  className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:h-[55px] rounded-[8px] overflow-hidden border-2 transition-all hover:border-[#0F3D61] ${
                    selectedMedia?.id === item.id ? "border-[#0F3D61]" : "border-border"
                  }`}
                >
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Preview */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
              <div className="relative w-full h-[260px] sm:h-[400px] md:h-[580px] bg-muted">
                {selectedMedia && (
                  <Image
                    src={selectedMedia.src || "/placeholder.svg"}
                    alt={selectedMedia.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Right Details Panel */}
          <div className="lg:col-span-5 order-3 space-y-4">
            <h1 className="text-3xl md:text-[40px] font-normal text-[#0F3D61]">{apartment.title.toUpperCase()}</h1>

            <div className="flex items-center gap-1 text-base text-[#68706A] mb-4">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A60000]" />
              <span className="">
                {`${apartment.address.street}, ${apartment.address.city} ${apartment.address.state} ${apartment.address.zipCode} | `}
                <span className="text-[#131313]">{availableDate}</span> | {apartment.bedrooms} Bed With{" "}
                {apartment.bathrooms} Bath
              </span>
            </div>

            <p className="text-base text-[#616161] font-normal leading-[150%] mb-4 text-justify">{apartment.description}</p>

            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#0F3D61] mb-2">Description:</h2>
              <p className="text-base text-[#616161] leading-[150%] font-normal text-justify">{apartment.aboutListing}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Pricing</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl md:text-4xl font-bold text-[#0F3D61]">$ {apartment.price.toLocaleString()}</span>
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
            {selectedGalleryMedia && (
              <video
                key={selectedGalleryMedia.id}
                controls
                autoPlay
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
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <CallRequestModal open={isCallRequestOpen} onOpenChange={setIsCallRequestOpen} apartment={apartment.title} id={apartment._id} />
      <TenantApplicationModal open={isTenantApplicationOpen} onOpenChange={setIsTenantApplicationOpen} />
    </div>
  )
}
