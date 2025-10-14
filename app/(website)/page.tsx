
import Community from "@/components/Shared/Community"
import { ContactSection } from "@/components/Shared/ContactSection"
import { HeroSection } from "@/components/web/Hero-section"
import { ListingsSection } from "@/components/web/Listings-section"
import { ServicesSection } from "@/components/web/Service"


export default function Home() {
  return (
    <main className="min-h-screen">
      
      <HeroSection />
      <ServicesSection />
      <ListingsSection/>
      <Community/>
      <ContactSection />
     
    </main>
  )
}
