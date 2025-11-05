"use client"

export default function ContractorServices() {
  const servicesLeft = [
    "General Contracting",
    "Interior Renovations",
    "Exterior Renovations",
    "Painting",
    "Flooring & Tile",
    "Drywall & Plaster",
    "Kitchens & Bathrooms",
    "Carpentry & Millwork",
    "Windows & Doors",
    "Roofing & Waterproofing",
    "Masonry, Cement & Concrete",
  ]

  const servicesRight = [
    "Roofing & Waterproofing",
    "Masonry, Cement & Concrete",
    "Sidewalks, Brick & Stucco",
    "Electrical (Licensed)",
    "Plumbing (Licensed)",
    "Firestopping",
    "Demolition & Framing",
    "Insulation & Fireproofing",
    "Punch Lists & Repairs",
    "Violations & Permits",
    "Site Safety",
  ]

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className=" container">
        <h1 className="text-2xl text-center sm:text-3xl lg:text-4xl font-normal text-[#0F3D61] mb-8 tracking-wide">
          CONTRACTOR SERVICES
        </h1>
        <div className="flex justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5  lg:gap-x-[300px]">
          {/* Left Column */}
          <div className="space-y-3">
            {servicesLeft.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base text-gray-900 font-medium">{service}</span>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {servicesRight.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-gray-900 font-bold mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base text-gray-900 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
