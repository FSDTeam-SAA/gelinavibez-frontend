import type React from "react"
import { FileText, Home, Wrench, Upload, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "./ServiceCard"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  features: string[]
  buttonText: string
}

// function ServiceCard({ icon, title, features, buttonText }: ServiceCardProps) {
//   return (
//     <div className="bg-[#1a4d6d] rounded-lg overflow-hidden flex flex-col h-full">
//       {/* Tan border at top */}
//       <div className="h-2 bg-[#d4b896]" />

//       <div className="p-6 lg:p-8 flex flex-col flex-1">
//         {/* Icon */}
//         <div className="text-white mb-6 flex justify-center">{icon}</div>

//         {/* Title */}
//         <h3 className="text-white text-xl lg:text-2xl font-semibold text-center mb-8">{title}</h3>

//         {/* Features */}
//         <ul className="space-y-4 mb-8 flex-1">
//           {features.map((feature, index) => (
//             <li key={index} className="flex items-start gap-3 text-white text-sm lg:text-base">
//               <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>

//         {/* Button */}
//         <Button className="w-full bg-[#d4b896] hover:bg-[#c4a886] text-[#1a4d6d] font-semibold py-6 text-base flex items-center justify-center gap-2">
//           {buttonText}
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   )
// }

export function ServicesSection() {
  const services = [
    {
      icon: <FileText className="h-12 w-12" />,
      title: "Tenant Application",
      features: [
        "Search for available apartments",
        "Filter by price, location, and features",
        "Attend open house events",
        "Apply online with our simple form",
      ],
      buttonText: "Apply",
    },
    {
      icon: <Home className="h-12 w-12" />,
      title: "Listings",
      features: [
        "Post your available apartments with ease",
        "Manage inquiries and applications in one place",
        "Highlight property details with photos and descriptions",
        "Schedule and track open house events",
      ],
      buttonText: "See Property",
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "Contractor Service",
      features: [
        "Offer professional repair and maintenance services",
        "Manage service requests from landlords and tenants",
        "Showcase expertise with detailed profiles",
        "Build trust through reviews and reliable support",
      ],
      buttonText: "See Service",
    },
    {
      icon: <Upload className="h-12 w-12" />,
      title: "Upload Documents",
      features: [
        "Provide professional repair and maintenance solutions",
        "Manage and track service requests with ease",
        "Showcase expertise through detailed contractor profiles",
        "Build trust using reviews and reliable support",
      ],
      buttonText: "Upload Now",
    },
  ]

  return (
    <section className="bg-[#e8e8e8] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className=" mb-12 lg:mb-16">
          <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">Our Services</h1>
          <p className="text-[#616161] text-base lg:text-lg font-normal ">
            Elevating the Way You Connect, Bridge Point Solutions delivers an exclusive platform to discover, manage,
            and curate your ideal living experience.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
