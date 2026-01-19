'use client'
import Community from "@/components/Shared/Community"
import { ContactSection } from "@/components/Shared/ContactSection"
import { HeroSection } from "@/components/web/Hero-section"
import { ListingsSection } from "@/components/web/Listings-section"
import { ServicesSection } from "@/components/web/Service"
import SubscribePlan from "@/components/web/SubscribePlan"
import { useSession } from "next-auth/react"


export default function Home() {
  const  session=useSession()
  const role=session?.data?.user?.role
  return (
    <main className="min-h-screen">
      
      <HeroSection />
      <ServicesSection />
      {role==="landlord"&&
      <SubscribePlan/>
      }
      <ListingsSection/>
      <Community/>
      <ContactSection />
     
    </main>
  )
}
