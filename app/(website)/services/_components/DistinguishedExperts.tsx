import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const experts = [
  {
    name: "Constructor",
    image: "/assets/expart4.png",
    rating: 5,
  },
  {
    name: "Renovator",
    image: "/assets/expart3.png",
    rating: 5,
  },
  {
    name: "Plumber",
    image: "/assets/expart2.png",
    rating: 5,
  },
  {
    name: "Painter",
    image: "/assets/expart1.png",
    rating: 5,
  },
]

export default function DistinguishedExperts() {
  return (
    <section className="bg-[#e8e8e8] py-16 px-1 md:px-8 lg:px-16">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#0F3D61] font-normal text-center mb-4">
          OUR DISTINGUISHED EXPERTS
        </h1>
        <p className="text-[18px] text-[#929292] text-center mb-12 ">
          Meet a curated selection of trusted professionals whose expertise, reliability, and excellence set the
          benchmark in every project.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, index) => (
            <Card
              key={index}
              className="bg-white border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden !rounded-[8px]  "
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={expert.image || "/placeholder.svg"}
                  alt={expert.name}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h5 className="text-xl font-semibold text-[#0F3D61] mb-3">{expert.name}</h5>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: expert.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFBF0F] text-[#FFBF0F]" />
                  ))}
                </div>
                <Button className="w-[148px] bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white rounded-[4px]">Hire Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
