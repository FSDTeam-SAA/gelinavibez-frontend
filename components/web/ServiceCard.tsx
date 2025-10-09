"use client"

import { ReactNode } from "react"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ServiceCardProps {
  icon: ReactNode
  title: string
  features: string[]
  buttonText: string
  onButtonClick?: () => void
}

export function ServiceCard({
  icon,
  title,
  features,
  buttonText,
  onButtonClick,
}: ServiceCardProps) {
  return (
    <div className="bg-[#1a4d6d] rounded-[12px] overflow-hidden flex flex-col h-full">
      {/* Tan border at top */}
      <div className="h-2 bg-[#C5A574]" />

      <div className="p-6 lg:p-8 flex flex-col flex-1">
        {/* Icon */}
        <div className="text-white mb-6 flex justify-center">{icon}</div>

        {/* Title */}
        <h4 className="text-[#EFDACB] text-xl lg:text-[32px] font-semibold text-center mb-[56px]">
          {title}
        </h4>

        {/* Features */}
        <ul className="space-y-4 mb-8 flex-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-[#F9F6F1] font-normal text-sm lg:text-sm"
            >
              <CheckCircle className="h-5 w-5 text-[#F9F6F1] flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <Button
          onClick={onButtonClick}
          className="w-full bg-[#EFDACB] hover:bg-[#EFDACB]/90 text-[#0F3D61] font-semibold py-6 text-base flex items-center justify-center gap-2 rounded-[6px]"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4 text-[#0F3D61]" />
        </Button>
      </div>
    </div>
  )
}
