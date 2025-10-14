import { ContactSection } from '@/components/Shared/ContactSection'
import MiniBanner from '@/components/Shared/MiniBanner'
import Contact_Information from '@/components/web/Contact_Information'

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
