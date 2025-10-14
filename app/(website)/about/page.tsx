import Community from '@/components/Shared/Community'
import { ContactSection } from '@/components/Shared/ContactSection'
import Aboutpayment from '@/components/web/About-payment'
import AboutUs from '@/components/web/AboutUs'
import { Banner } from '@/components/web/Banner'
import Whats_Different from '@/components/web/Whats_Different'
import React from 'react'

const page = () => {
  return (
    <section className='bg-[#e8e8e8]'>
      <Banner title='Connecting People with Smarter Property Insights' description='We aim to bridge the gap between property seekers and accurate home valuation, making it simple to discover, compare, and connect with the right real estate opportunities.'/>
      <AboutUs/>
      <Aboutpayment/>
      <Whats_Different/>
      <ContactSection/>
      <Community/>
    </section>
  )
}

export default page
