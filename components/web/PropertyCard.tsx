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
  type: string
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
  type,
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
          <span className="text-[#766346] text-base font-semibold whitespace-nowrap ml-2">{price}</span>
        </div>

        {/* Address */}
        <p className="text-[#666666] text-base font-normal mb-4">{address}</p>

        {/* Date and Time */}
        <div className="flex justify-between  items-center gap-4 text-[18px] text-[#0F3D61] font-bold mb-4">
          <div>
          <span>{date}</span>
          <span>-</span>
          <span>{time}</span>
          </div>
          <span className="text-[#333333]">{type}</span>
        </div>

        {/* Description */}
        <h3 className="text-[#333333] text-base mb-6 leading-[150%] ">{description}</h3>

        {/* Property Stats */}
        <div className="flex items-center gap-6 mb-6 text-[#666666] ">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            <span className="text-base">{beds} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span className="text-base">{baths} Bathroom</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4" />
            <span className="text-base">{sqft}</span>
          </div>
        </div>

        {/* See Details Button */}
        <Button
          onClick={onButtonClick}
          className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[48px] rounded-[8px] text-white font-semibold py-6 flex items-center justify-center gap-2"
        >
          See Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
