
import { ContactSection } from "@/components/web/Contact-section"
import { HeroSection } from "@/components/web/Hero-section"
import { ListingsSection } from "@/components/web/Listings-section"
import { ServicesSection } from "@/components/web/Service"
import Commnunity from "@/components/web/Commnunity"

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <HeroSection />
      <ServicesSection />
      <ListingsSection/>
      <Commnunity/>
      <ContactSection />
     
    </main>
  )
}
