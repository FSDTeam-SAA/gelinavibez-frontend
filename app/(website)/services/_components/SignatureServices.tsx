import { Home, Building2, Wrench, Droplet, PaintBucket, Factory } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "Residential Construction",
    description:
      "We create homes that embody elegance, comfort, and lasting value. Every project combines modern functionality with timeless craftsmanship, designed to enhance everyday living with luxury and sophistication.",
    icon: Home,
    featured: false,
  },
  {
    title: "Commercial Construction",
    description:
      "Our commercial spaces are built to inspire productivity and prestige. From offices to retail centers, we design with precision, ensuring functionality, innovation, and long-term growth potential.",
    icon: Building2,
    featured: false,
  },
  {
    title: "Renovation & Remodeling",
    description:
      "We breathe new life into existing spaces with creativity and care. Through thoughtful upgrades and luxury finishes, we transform properties into modern, functional, and inspiring environments.",
    icon: Wrench,
    featured: false,
  },
  {
    title: "Plumbing & Electrical",
    description:
      "Reliable infrastructure is at the heart of every project. Our expert plumbing and electrical solutions ensure safety, efficiency, and long-term performance with uncompromising quality standards.",
    icon: Droplet,
    featured: false,
  },
  {
    title: "Painting & Interior Finishing",
    description:
      "The finest details define true luxury. Our premium painting and finishing services combine sophistication, style, and elegance, creating interiors that are polished and complete.",
    icon: PaintBucket,
    featured: false,
  },
  {
    title: "Industrial Projects",
    description:
      "We specialize in large-scale developments that demand strength and precision. From warehouses to factories, our industrial projects are built with innovation, durability, and efficiency at their core.",
    icon: Factory,
    featured: false,
  },
]

export default function SignatureServices() {
  return (
    <section className="bg-[#e8e8e8] py-16 px-1 md:px-8 lg:px-16 mt-[120px]">
      <div className="container ">
        <h1 className="font-serif text-3xl md:text-[40px] lg:text-[40px] text-[#0F3D61] font-normal mb-4">
          OUR SIGNATURE SERVICES
        </h1>
        <p className="text-[18px] text-[#929292] font-normal mb-[60px]">
          A curated selection of expert solutions tailored to elevate every project with precision and sophistication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`${
                  service.featured ? "bg-[#0F3D61] text-white" : "bg-[#F9F6F1] text-[#1a3a52]"
                } border-none shadow-md hover:bg-[#0F3D61] hover:text-white transition-shadow transition-colors group`}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-14 h-14 rounded-full ${
                      service.featured ? "bg-white" : "bg-[#0F3D61]"
                    } flex items-center justify-center mb-4 group-hover:bg-white`}
                  >
                    <Icon className={`w-7 h-7 ${service.featured ? "text-[#0F3D61]" : "text-[#F9F6F1]"} group-hover:text-[#0F3D61]`} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className={`text-sm font-normal ${service.featured ? "text-white" : "text-[#616161]"} group-hover:text-white`}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}