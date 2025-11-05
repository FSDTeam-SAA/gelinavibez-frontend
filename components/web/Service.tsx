// 'use client'
// import type React from "react"
// import { FileText, Home, Wrench, Upload } from "lucide-react"
// import { ServiceCard } from "./ServiceCard"
// import { useSession } from "next-auth/react"



// export function ServicesSection() {
//    const services = [
//  {
//   icon: <FileText className="h-12 w-12" />,
//   title: "Tenant Application",
//   features: [
//     "Clarity at every step — from search to submission",
//     "Real listings. Real guidance. Real progress",
//     "Your application, organized — documents done right",
//     "Track your status, reduce stress, and move forward",
//     "We bridge the gap so you can get home"
//   ],
//   buttonText: "Apply Now",
//   hrf: "/apartments"
// },

// {
//   icon: <Home className="h-12 w-12" />,
//   title: "Listings",
//   features: [
//     "New listings posted weekly — see what's open now",
//     "Your next home might already be waiting",
//     "Verified listings, easy scheduling, transparent updates",
//     "Explore open houses in your area and apply instantly",
//     "Bridge Point Solutions — connecting tenants to opportunity"
//   ],
//   buttonText: "See Listings",
//   hrf: "#listings"
// },

// {
//   icon: <Wrench className="h-12 w-12" />,
//   title: "Contractor Service",
//   features: [
//     "From vision to structure — we turn your ideas into reality",
//     "Rebuild. Repair. Redesign. Delivered with precision",
//     "Trusted craftsmanship, transparent updates, timeless results",
//     "Ground-up excellence — start strong, finish stronger",
//     "Quality that stands the test of time, weather, and use"
//   ],
//   buttonText: "Explore Services",
//   hrf: "/services/#contractor-form"
// },

//     {
//   icon: <Upload className="h-12 w-12" />,
//   title: "Extermination Service",
//   features: [
//     "Targeted treatment today — lasting protection tomorrow",
//     "Expert diagnostics, effective solutions, clear reports",
//     "Discreet, safe, and prevention-minded service",
//     "Stop pests at the source — not just the surface",
//     "Your plan, your schedule, your peace of mind"
//   ],
//   buttonText: "Get Quote",
//   hrf: "/service-request"
// },

//   ]

//   const sesseion=useSession();
//   const login=sesseion.status
//   console.log(login)
 

//   return (
//     <section className="bg-[#e8e8e8] py-16 lg:py-24">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className=" mb-12 lg:mb-16">
//           <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">Our Services</h1>
//           <p className="text-[#616161] text-base lg:text-lg font-normal ">
//             Elevating the Way You Connect, Bridge Point Solutions delivers an exclusive platform to discover, manage,
//             and curate your ideal living experience.
//           </p>
//         </div>

//         {/* Service Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
//           {services.map((service, index) => (
//             <ServiceCard key={index} {...service} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'

import React, { useState } from "react"
import { FileText, Home, Wrench, Upload } from "lucide-react"
import { ServiceCard } from "./ServiceCard"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TenantApplicationModal } from "./ApplicationFrom"
import { Button } from "../ui/button"

export function ServicesSection() {
 const sesseion=useSession();
  const status =sesseion.status
  console.log(status)
  
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState(false)

  const services = [
    {
      icon: <FileText className="h-12 w-12" />,
      title: "Tenant Application",
      features: [
        "Clarity at every step — from search to submission",
        "Real listings. Real guidance. Real progress",
        "Your application, organized — documents done right",
        "Track your status, reduce stress, and move forward",
        "We bridge the gap so you can get home",
      ],
      buttonText: "Apply Now",
      hrf: "/apartments",
      action: "tenant-application",
    },
    {
      icon: <Home className="h-12 w-12" />,
      title: "Listings",
      features: [
        "New listings posted weekly — see what's open now",
        "Your next home might already be waiting",
        "Verified listings, easy scheduling, transparent updates",
        "Explore open houses in your area and apply instantly",
        "Bridge Point Solutions — connecting tenants to opportunity",
      ],
      buttonText: "See Listings",
      hrf: "#listings",
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "Contractor Service",
      features: [
        "From vision to structure — we turn your ideas into reality",
        "Rebuild. Repair. Redesign. Delivered with precision",
        "Trusted craftsmanship, transparent updates, timeless results",
        "Ground-up excellence — start strong, finish stronger",
        "Quality that stands the test of time, weather, and use",
      ],
      buttonText: "Explore Services",
      hrf: "/services/#contractor-form",
    },
    {
      icon: <Upload className="h-12 w-12" />,
      title: "Extermination Service",
      features: [
        "Targeted treatment today — lasting protection tomorrow",
        "Expert diagnostics, effective solutions, clear reports",
        "Discreet, safe, and prevention-minded service",
        "Stop pests at the source — not just the surface",
        "Your plan, your schedule, your peace of mind",
      ],
      buttonText: "Get Quote",
      hrf: "/service-request",
    },
  ]

  //eslint-disable-next-line
  const handleServiceClick = (service: any) => {
    // Only apply this logic to the "Tenant Application"
    if (service.action === "tenant-application") {
      if (status === "unauthenticated") {
        // router.push("/login")
        setLogin(true)
      } else if (status === "authenticated") {
        setOpen(true)
      }
    } else {
      router.push(service.hrf)
    }
  }

  return (
    <>
      <section className="bg-[#e8e8e8] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 lg:mb-16">
            <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">Our Services</h1>
            <p className="text-[#616161] text-base lg:text-lg font-normal">
              Elevating the Way You Connect, Bridge Point Solutions delivers an exclusive platform to discover, manage,
              and curate your ideal living experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onButtonClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tenant Application Form</DialogTitle>
          </DialogHeader>
          <TenantApplicationModal open={open} onOpenChange={setOpen}/>
        </DialogContent>
      </Dialog>
        <Dialog open={login} onOpenChange={setLogin}>
        <DialogContent className="max-w-xl bg-white !rounded-[8px]">
          <div className="flex justify-center">
            <div>

            <h1 className="text-2xl font-bold text-slate-900">Please login to continue </h1>
            <div className="flex justify-center gap-4 py-10">
              <Button onClick={() => setLogin(false)} className="px-10 py-2 text-[#0F3D61] border border-[#0F3D61]  rounded-[4px]">Cancel</Button>
              <Button onClick={() => router.push("/login")} className="px-10 py-2 bg-[#0F3D61] text-white rounded-[4px] hover:bg-[#0F3D61]/90">Login</Button>
            </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

