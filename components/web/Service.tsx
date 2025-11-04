import type React from "react"
import { FileText, Home, Wrench, Upload } from "lucide-react"
import { ServiceCard } from "./ServiceCard"



export function ServicesSection() {
   const services = [
 {
  icon: <FileText className="h-12 w-12" />,
  title: "Tenant Application",
  features: [
    "Clarity at every step — from search to submission",
    "Real listings. Real guidance. Real progress",
    "Your application, organized — documents done right",
    "Track your status, reduce stress, and move forward",
    "We bridge the gap so you can get home"
  ],
  buttonText: "Apply Now",
  hrf: "/apartments"
},

{
  icon: <Home className="h-12 w-12" />,
  title: "Listings",
  features: [
    "New listings posted weekly — see what's open now",
    "Your next home might already be waiting",
    "Verified listings, easy scheduling, transparent updates",
    "Explore open houses in your area and apply instantly",
    "Bridge Point Solutions — connecting tenants to opportunity"
  ],
  buttonText: "See Listings",
  hrf: "#listings"
},

{
  icon: <Wrench className="h-12 w-12" />,
  title: "Contractor Service",
  features: [
    "From vision to structure — we turn your ideas into reality",
    "Rebuild. Repair. Redesign. Delivered with precision",
    "Trusted craftsmanship, transparent updates, timeless results",
    "Ground-up excellence — start strong, finish stronger",
    "Quality that stands the test of time, weather, and use"
  ],
  buttonText: "Explore Services",
  hrf: "/services/#contractor-form"
},

    {
  icon: <Upload className="h-12 w-12" />,
  title: "Extermination Service",
  features: [
    "Targeted treatment today — lasting protection tomorrow",
    "Expert diagnostics, effective solutions, clear reports",
    "Discreet, safe, and prevention-minded service",
    "Stop pests at the source — not just the surface",
    "Your plan, your schedule, your peace of mind"
  ],
  buttonText: "Get Quote",
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
