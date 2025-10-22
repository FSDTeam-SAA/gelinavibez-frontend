import type React from "react"
import { FileText, Home, Wrench, Upload } from "lucide-react"
import { ServiceCard } from "./ServiceCard"



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
      hrf: "/service-request"
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
      hrf: "/service-request"
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
      hrf: "/service-request"
    },
    {
      icon: <Upload className="h-12 w-12" />,
      title: "Extermination Service",
      features: [
        "Deliver Comprehensive Pest Control Solutions",
        "Ensure Safe and Eco-Friendly Treatments",
        "Offer Timely Response and Ongoing Support",
        "Build Confidence Through Expertise and Transparency",
      ],
      buttonText: "Get quote",
      hrf: "/service-request"
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
