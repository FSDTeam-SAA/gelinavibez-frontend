import { ContactSection } from '@/components/web/Contact-section'
import Contact_Information from '@/components/web/Contact_Information'
import MiniBanner from '@/components/web/MIniBanner'
import React from 'react'

const page = () => {
  return (
    <section className='bg-[#e8e8e8]'>
        <MiniBanner title='Confidentiality & Trust' description='Ensuring Your Privacy in Every Interaction'/>
      <ContactSection/>
      <Contact_Information/>
    </section>
  )
}

export default page
