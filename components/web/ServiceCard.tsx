// // "use client"

// // import { ReactNode } from "react"
// // import { CheckCircle, ArrowRight } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import Link from "next/link"

// // export interface ServiceCardProps {
// //   icon: ReactNode
// //   title: string
// //   features: string[]
// //   hrf: string
// //   buttonText: string
// //   onButtonClick?: () => void
// // }

// // export function ServiceCard({
// //   icon,
// //   title,
// //   features,
// //   buttonText,
// //   hrf,
// //   onButtonClick,
// // }: ServiceCardProps) {
// //   return (
// //     <div className="bg-[#1a4d6d] rounded-[12px] overflow-hidden flex flex-col h-full">
// //       {/* Tan border at top */}
// //       <div className="h-2 bg-[#C5A574]" />

// //       <div className="p-6 lg:p-5 flex flex-col flex-1">
// //         {/* Icon */}
// //         <div className="text-white mb-6 flex justify-center">{icon}</div>

// //         {/* Title */}
// //         <h4 className="text-[#EFDACB] text-xl lg:text-[32px] font-semibold text-center mb-[56px] text-nowrap">
// //           {title}
// //         </h4>

// //         {/* Features */}
// //         <ul className="space-y-4 mb-8 flex-1">
// //           {features.map((feature, index) => (
// //             <li
// //               key={index}
// //               className="flex items-start gap-3 text-[#F9F6F1] font-normal text-sm lg:text-sm"
// //             >
// //               <CheckCircle className="h-5 w-5 text-[#F9F6F1] flex-shrink-0 mt-0.5" />
// //               <span>{feature}</span>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Button */}
// //        <Link href={hrf}>
// //         <Button
// //           onClick={onButtonClick}
// //           className="w-full bg-[#EFDACB] hover:bg-[#EFDACB]/90 text-[#0F3D61] font-semibold py-6 text-base flex items-center justify-center gap-2 rounded-[6px]"
// //         >
// //           {buttonText}
// //           <ArrowRight className="h-4 w-4 text-[#0F3D61]" />
// //         </Button>
// //        </Link>
// //       </div>
// //     </div>
// //   )
// // }


// "use client"

// import { ReactNode } from "react"
// import { CheckCircle, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// export interface ServiceCardProps {
//   icon: ReactNode
//   title: string
//   features: string[]
//   hrf: string
//   buttonText: string
//   onButtonClick?: () => void
// }

// export function ServiceCard({
//   icon,
//   title,
//   features,
//   buttonText,
//   hrf,
//   onButtonClick,
// }: ServiceCardProps) {
//   const buttonContent = (
//     <Button
//       onClick={(e) => {
//         if (onButtonClick) {
//           e.preventDefault() // stop Link navigation
//           onButtonClick()
//         }
//       }}
//       className="w-full bg-[#EFDACB] hover:bg-[#EFDACB]/90 text-[#0F3D61] font-semibold py-6 text-base flex items-center justify-center gap-2 rounded-[6px]"
//     >
//       {buttonText}
//       <ArrowRight className="h-4 w-4 text-[#0F3D61]" />
//     </Button>
//   )

//   return (
//     <div className="bg-[#1a4d6d] rounded-[12px] overflow-hidden flex flex-col h-full">
//       {/* Tan border at top */}
//       <div className="h-2 bg-[#C5A574]" />

//       <div className="p-6 lg:p-5 flex flex-col flex-1">
//         {/* Icon */}
//         <div className="text-white mb-6 flex justify-center">{icon}</div>

//         {/* Title */}
//         <h4 className="text-[#EFDACB] text-xl lg:text-[32px] font-semibold text-center mb-[56px] text-nowrap">
//           {title}
//         </h4>

//         {/* Features */}
//         <ul className="space-y-4 mb-8 flex-1">
//           {features.map((feature, index) => (
//             <li
//               key={index}
//               className="flex items-start gap-3 text-[#F9F6F1] font-normal text-sm lg:text-sm"
//             >
//               <CheckCircle className="h-5 w-5 text-[#F9F6F1] flex-shrink-0 mt-0.5" />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>

//         {/* Button — wrapped in Link only if no custom click handler */}
//         {onButtonClick ? (
//           buttonContent
//         ) : (
//           <Link href={hrf} className="w-full">
//             {buttonContent}
//           </Link>
//         )}
//       </div>
//     </div>
//   )
// }


"use client"

import { ReactNode } from "react"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface ServiceCardProps {
  icon: ReactNode
  title: string
  features: string[]
  hrf: string
  buttonText: string
  onButtonClick?: () => void
}

export function ServiceCard({
  icon,
  title,
  features,
  buttonText,
  hrf,
  onButtonClick,
}: ServiceCardProps) {
  const buttonContent = (
    <Button
      onClick={(e) => {
        if (onButtonClick) {
          e.preventDefault() // stop Link navigation
          onButtonClick()
        }
      }}
      className="w-full bg-[#EFDACB] hover:bg-[#EFDACB]/90 text-[#0F3D61] font-semibold py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 rounded-[6px] transition"
    >
      {buttonText}
      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 text-[#0F3D61]" />
    </Button>
  )

  return (
    <div className="bg-[#1a4d6d] rounded-[12px] overflow-hidden flex flex-col h-full shadow-lg">
      {/* Tan border at top */}
      <div className="h-1 sm:h-2 bg-[#C5A574]" />

      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
        {/* Icon */}
        <div className="text-white mb-4 sm:mb-5 md:mb-6 flex justify-center text-2xl sm:text-3xl md:text-4xl">
          {icon}
        </div>

        {/* Title */}
        <h4 className="text-[#EFDACB] text-lg sm:text-xl md:text-2xl lg:text-[28px] font-semibold text-center mb-4 sm:mb-6 md:mb-8">
          {title}
        </h4>

        {/* Features */}
        <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8 flex-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 sm:gap-3 md:gap-3 text-[#F9F6F1] font-normal text-xs sm:text-sm md:text-base"
            >
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 text-[#F9F6F1] flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button — wrapped in Link only if no custom click handler */}
        {onButtonClick ? (
          buttonContent
        ) : (
          <Link href={hrf} className="w-full">
            {buttonContent}
          </Link>
        )}
      </div>
    </div>
  )
}
