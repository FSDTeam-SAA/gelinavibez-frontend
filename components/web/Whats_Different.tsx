import Image from "next/image";
import React from "react";

const Whats_Different = () => {
  return (
    <section className=" container py-[60px]">
        <h1 className="text-[32px] text-[#0F3D61] font-normal">What Make Us Different?</h1>
        <p className="text-base text-[#8E938F] font-normal "> • One hub, many solutions <br/> • Clear, trackable steps <br/>  • Real community impact <br/>  •
 Private, vetted service connections (no public exposure) <br/>  • Owner-level security and oversight.</p>
      <div className=" grid grid-cols-1  md:grid-cols-3 gap-6  py-[60px]">
        <div className="bg-[#0F3D61] py-[30px] rounded-[12px] ">
          <div className="w-[74px] h-[74px] mx-auto">
            <Image
              src="/assets/A_icon1.png"
              alt="Hero Background"
              width={1000}
              height={1000}
              className="w-full h-full "
            />
          </div>
          <h4 className="text-lg text-[#EFDACB] font-semibold text-center mt-6">Tenants</h4>
         <h3 className="text-sm md:text-base text-[#F9F6F1] font-normal text-center mt-3 max-w-[250px] md:max-w-[456px] mx-auto">
            Years of experience helping families navigate housing with integrity and care
          </h3>
        </div>
          <div className="bg-[#0F3D61] py-[30px] rounded-[12px]">
          <div className="w-[74px] h-[74px] mx-auto">
            <Image
              src="/assets/A_icon2.png"
              alt="Hero Background"
              width={1000}
              height={1000}
              className="w-full h-full "
            />
          </div>
          <h4 className="text-lg text-[#EFDACB] font-semibold text-center mt-6">Contractors</h4>
          <h3 className="text-sm md:text-base text-[#F9F6F1] font-normal text-center mt-3 max-w-[250px] md:max-w-[456px] mx-auto">
            Trusted expertise in rebuilds, renovations, and new developments.
          </h3>
        </div>
          <div className="bg-[#0F3D61] py-[30px] rounded-[12px]">
          <div className="w-[74px] h-[74px] mx-auto">
            <Image
              src="/assets/A_icon3.png"
              alt="Hero Background"
              width={1000}
              height={1000}
              className="w-full h-full "
            />
          </div>
          <h4 className="text-lg text-[#EFDACB] font-semibold text-center mt-6">Exterminators</h4>
          <h3 className="text-sm md:text-base text-[#F9F6F1] font-normal text-center mt-3 max-w-[250px] md:max-w-[456px] mx-auto">
           Professional precision with documented results and prevention plans.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Whats_Different;
