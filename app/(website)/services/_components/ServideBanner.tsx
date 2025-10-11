import Image from "next/image"

export function ServideBanner() {
  return (
    <section className="relative h-[600px] lg:h-[600px] flex items-center justify-center overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/assets/service.jpg" alt="Hero Background" width={1000} height={1000} className="w-full h-full " />
      </div>
         <div className="absolute inset-0 bg-[#00000099]/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 container mx-auto">
      
        <h1 className="text-[#F8F9FA] text-3xl lg:text-[56px] xl:text-6xl font-normal  leading-tight ">
          WELCOME TO BRIDGE POINT SOLUTION
        </h1>

        <p className="text-[#E6E7E6] text-base lg:text-lg mb-12 w-full mx-auto">Building Bridge & Connecting Futures</p>

      
      </div>
    </section>
  )
}
