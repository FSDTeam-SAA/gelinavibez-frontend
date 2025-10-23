import { PropertyCard } from "@/components/card/PropertyCard"
import { ArrowRight } from "lucide-react"
import Link from "next/link"





export function Sunday() {
  const properties = [
    {
      image: "/assets/property1.jpg",
      title: "The Harbor Crown", 
      address: "888 Harbor Dr, Marina District",
      price: "Price: $5,500/m",
      date: "Sep 23, 2025, 11:45 AM",
      time: "12:45 PM",
      type:"Multiple Time",
      beds: 6,
      baths: 4,
      sqft: "4,000ft",
      description: "Luxurious apartment combining modern elegance, expansive space, and a secluded rooftop haven.",
    },
    {
      image: "/assets/property2.jpg",
      title: "The Harbor Crown",
      address: "888 Harbor Dr, Marina District",
      price: "Price: $5,500/m",
      date: "Sep 23, 2025, 11:45 AM",
      time: "12:45 PM",
      type:"Multiple Time",
      beds: 6,
      baths: 4,
      sqft: "4,000ft",
      description: "Luxurious apartment combining modern elegance, expansive space, and a secluded rooftop haven.",
    },
    {
      image: "/assets/property3.jpg",
      title: "The Harbor Crown",
      address: "888 Harbor Dr, Marina District",
      price: "Price: $5,500/m",
      date: "Sep 23, 2025, 11:45 AM",
      time: "12:45 PM",
        type:"Multiple Time",
      beds: 6,
      baths: 4,
      sqft: "4,000ft",
      description: "Luxurious apartment combining modern elegance, expansive space, and a secluded rooftop haven.",
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-12">
          <div>
            <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4  ">Sunday</h1>
         
          </div>
        
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard id={""} key={index} {...property} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="lg:hidden mt-8 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-[#1a4d6d] hover:text-[#0f3a52] font-semibold"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
