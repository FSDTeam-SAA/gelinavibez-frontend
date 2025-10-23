// import React from "react";
// import { Button } from "../ui/button";

// const Community = () => {
//   return (
//     <section className="bg-[#e8e8e8] py-10 sm:py-14 md:py-20">
//       <div
//         className="container mx-auto relative rounded-none md:rounded-[20px] overflow-hidden min-h-[320px] sm:min-h-[360px] md:h-[380px] flex items-center justify-center px-4"
//         style={{
//           backgroundImage: "url(/assets/cBg.png)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* Overlay */}
//         <div
//           className="absolute inset-0"
//           style={{
//             background: `
//               linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
//               linear-gradient(274.66deg, rgba(0, 0, 0, 0) 15.7%, rgba(0, 0, 0, 0.2) 72.85%)
//             `,
//           }}
//         />

//         {/* Content */}
//         <div className="relative text-center max-w-[700px] px-3">
//           <h1 className="text-[#F8F9FA] text-2xl sm:text-3xl lg:text-[40px] font-normal mb-3 sm:mb-4">
//             Join Our Community
//           </h1>
//           <p className="text-sm sm:text-base text-[#E6E7E6] font-normal leading-relaxed">
//             We know choosing the right property can feel overwhelming. That’s why Bridge Point
//             Solution makes it simple to compare values, insights, and details—helping you
//             confidently make smarter decisions.
//           </p>
//           <Button className="bg-[#0F3D61] h-[44px] sm:h-[48px] text-white rounded-[8px] w-[200px] sm:w-[236px] border border-[#C5A574] hover:bg-[#0F3D61]/90 mt-8 sm:mt-[60px]">
//             Subscribe Now
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Community;


"use client"

import { useState } from "react"
import { SubscribeModal } from "./subscribe-modal"
import { Button } from "../ui/button"

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="bg-[#e8e8e8] py-10 sm:py-14 md:py-20">
        <div
          className="container mx-auto relative rounded-none md:rounded-[20px] overflow-hidden min-h-[320px] sm:min-h-[360px] md:h-[380px] flex items-center justify-center px-4"
          style={{
            backgroundImage: "url(/assets/cBg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                linear-gradient(274.66deg, rgba(0, 0, 0, 0) 15.7%, rgba(0, 0, 0, 0.2) 72.85%)
              `,
            }}
          />

          {/* Content */}
          <div className="relative text-center max-w-[700px] px-3">
            <h1 className="text-[#F8F9FA] text-2xl sm:text-3xl lg:text-[40px] font-normal mb-3 sm:mb-4">
              Join Our Community
            </h1>
            <p className="text-sm sm:text-base text-[#E6E7E6] font-normal leading-relaxed">
              We know choosing the right property can feel overwhelming. That&apos;s why Bridge Point Solution makes it
              simple to compare values, insights, and details—helping you confidently make smarter decisions.
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0F3D61] h-[44px] sm:h-[48px] text-white rounded-[8px] w-[200px] sm:w-[236px] border border-[#C5A574] hover:bg-[#0F3D61]/90 mt-8 sm:mt-[60px]"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>

      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Community
