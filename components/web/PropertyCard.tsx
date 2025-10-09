"use client"

import { Bed, Bath, Square, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export interface PropertyCardProps {
  image: string
  title: string
  address: string
  price: string
  date: string
  time: string
  beds: number
  baths: number
  sqft: string
  description: string
  onButtonClick?: () => void
}

export function PropertyCard({
  image,
  title,
  address,
  price,
  date,
  time,
  beds,
  baths,
  sqft,
  description,
  onButtonClick,
}: PropertyCardProps) {
  return (
    <div className=" rounded-[12px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Property Image */}
      <div className="relative h-[297px] overflow-hidden rounded-tl-[12px] rounded-tr-[12px]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={1000}
          height={1000}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[#0F3D61] text-[28px] font-bold">{title}</h4>
          <span className="text-[#1a4d6d] font-semibold whitespace-nowrap ml-2">{price}</span>
        </div>

        {/* Address */}
        <p className="text-gray-600 text-sm mb-4">{address}</p>

        {/* Date and Time */}
        <div className="flex items-center gap-4 text-sm text-gray-700 mb-4">
          <span>{date}</span>
          <span>•</span>
          <span>{time}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-6 line-clamp-2">{description}</p>

        {/* Property Stats */}
        <div className="flex items-center gap-6 mb-6 text-gray-700">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{beds} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{baths} Bathroom</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4" />
            <span className="text-sm">{sqft}</span>
          </div>
        </div>

        {/* See Details Button */}
        <Button
          onClick={onButtonClick}
          className="w-full bg-[#1a4d6d] hover:bg-[#0f3a52] text-white font-semibold py-6 flex items-center justify-center gap-2"
        >
          See Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
