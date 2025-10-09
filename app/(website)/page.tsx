
import { Navbar } from "@/components/web/Navbar"
import { Footer } from "@/components/web/Footer"
import { ContactSection } from "@/components/web/Contact-section"
import { HeroSection } from "@/components/web/Hero-section"
import { ListingsSection } from "@/components/web/Listings-section"
import { ServicesSection } from "@/components/web/Service"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ListingsSection/>
      <ContactSection />
      <Footer />
    </main>
  )
}
