import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/assets/hero.jpg" alt="Hero Background" className="w-full h-full " />
      </div>
         <div className="absolute inset-0 bg-[#0F3D61]/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 container mx-auto">
        {/* Logo */}
        <div className="flex flex-col justify-center items-center mb-8 w-[324px] h-[243px] mx-auto">
          <Image src="/assets/logo2.png" alt="Logo" width={1000} height={1000} className=" w-full h-full" />
        </div>

    

        <h1 className="text-[#EFDACB] text-3xl lg:text-[56px] xl:text-6xl font-normal mb-6 leading-tight ">
          WELCOME TO BRIDGE POINT SOLUTION
        </h1>

        <p className="text-[#DAE0E4] text-base lg:text-lg mb-12 max-w-2xl mx-auto">Building Bridge & Connecting Futures</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 items-center   bg-[#EFDACB] py-4 rounded-[8px]">
          <Button className="w-full sm:w-auto bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[74px] !rounded-[4px]  border-2 border-[#d4b896] px-8 py-6 text-base lg:text-2xl flex items-center gap-3 font-bold text-[#EFDACB]">
            <Image src="/assets/icon3.png" alt="Search Icon" width={1000} height={1000} className="w-[48px] h-[48px]" />
            Find an Apartment
          </Button>
          <Button className="w-full sm:w-auto bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[74px] !rounded-[4px]  border-2 border-[#d4b896] px-8 py-6 text-base lg:text-2xl flex items-center gap-3 font-bold text-[#EFDACB]">
            <Image src="/assets/icon2.png" alt="Search Icon" width={1000} height={1000} className="w-[48px] h-[48px]" />
            Apply as a Tenant
          </Button>
          <Button className="w-full sm:w-auto bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[74px] !rounded-[4px]  border-2 border-[#d4b896] px-8 py-6 text-base lg:text-2xl flex items-center gap-3 font-bold text-[#EFDACB]">
             <Image src="/assets/icon1.png" alt="Search Icon" width={1000} height={1000} className="w-[45px] h-[45px]" />
            Request to Repair
          </Button>
        </div>
      </div>
    </section>
  )
}
