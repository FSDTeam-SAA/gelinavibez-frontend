import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[650px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt="Hero Background"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#00000066]/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-4 container mx-auto">
        {/* Logo */}
        <div className="flex flex-col justify-center items-center mb-6 md:mb-8 w-[150px]  h-[100px] md:w-[280px] md:h-[210px] lg:w-[324px] lg:h-[243px] mx-auto">
          <Image src="/assets/logo2.png" alt="Logo" width={1000} height={1000} className="w-full h-full" />
        </div>

        <h1 className="text-[#EFDACB] text-2xl md:text-4xl lg:text-[56px] xl:text-6xl font-normal mb-4 md:mb-6 leading-tight px-2">
          WELCOME TO BRIDGE POINT SOLUTION
        </h1>

        <p className="text-[#DAE0E4] text-sm md:text-base lg:text-lg mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto">
          Building Bridge & Connecting Futures
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 px-2 md:px-4 items-center bg-[#EFDACB] py-3 md:py-4 rounded-[8px] mt-8 md:mt-12 lg:mt-[100px] mb-5 md:mb-0">
          <Button className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[60px] md:h-[68px] lg:h-[74px] !rounded-[4px] border-2 border-[#d4b896] px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-sm md:text-lg lg:text-2xl flex items-center justify-center gap-2 md:gap-3 font-bold text-[#EFDACB] ">
            <Image
              src="/assets/icon3.png"
              alt="Search Icon"
              width={1000}
              height={1000}
              className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] flex-shrink-0"
            />
            <span className="text-balance">Find an Apartment</span>
          </Button>
          <Button className="w-full bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[60px] md:h-[68px] lg:h-[74px] !rounded-[4px] border-2 border-[#d4b896] px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-sm md:text-lg lg:text-2xl flex items-center justify-center gap-2 md:gap-3 font-bold text-[#EFDACB]">
            <Image
              src="/assets/icon2.png"
              alt="Search Icon"
              width={1000}
              height={1000}
              className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] flex-shrink-0"
            />
            <span className="text-balance">Apply as a Tenant</span>
          </Button>
          <Button className="w-full md:col-span-2 lg:col-span-1 bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[60px] md:h-[68px] lg:h-[74px] !rounded-[4px] border-2 border-[#d4b896] px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-sm md:text-lg lg:text-2xl flex items-center justify-center gap-2 md:gap-3 font-bold text-[#EFDACB]">
            <Image
              src="/assets/icon1.png"
              alt="Search Icon"
              width={1000}
              height={1000}
              className="w-[30px] h-[30px] md:w-[38px] md:h-[38px] lg:w-[45px] lg:h-[45px] flex-shrink-0"
            />
            <span className="text-balance">Request to Repair</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
