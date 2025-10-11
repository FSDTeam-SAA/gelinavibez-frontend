import Image from "next/image";
import React from "react";

const Whats_Different = () => {
  return (
    <section className=" container py-[60px]">
        <h1 className="text-[32px] text-[#0F3D61] font-normal">What Make Us Different?</h1>
        <p className="text-base text-[#8E938F] font-normal ">A simple, step-by-step process to help families find, connect with, and book trusted assisted living facilities with ease.</p>
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
          <h4 className="text-lg text-[#EFDACB] font-semibold text-center mt-6">Experienced</h4>
         <h3 className="text-sm md:text-base text-[#F9F6F1] font-normal text-center mt-3 max-w-[250px] md:max-w-[456px] mx-auto">
            Our experience of 25 years of building and making achievements in
            the world of development.
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
          <h4 className="text-lg text-[#EFDACB] font-semibold text-center mt-6">Experienced</h4>
          <h3 className="text-sm md:text-base text-[#F9F6F1] font-normal text-center mt-3 max-w-[250px] md:max-w-[456px] mx-auto">
            Our experience of 25 years of building and making achievements in
            the world of development.
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
          <h4 className="text-lg text-[#EFDACB] font-semibold text-center mt-6">Experienced</h4>
          <h3 className="text-sm md:text-base text-[#F9F6F1] font-normal text-center mt-3 max-w-[250px] md:max-w-[456px] mx-auto">
            Our experience of 25 years of building and making achievements in
            the world of development.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Whats_Different;
