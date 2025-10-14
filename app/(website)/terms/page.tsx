
import MiniBanner from '@/components/Shared/MiniBanner'
import Terms from '@/components/web/Terms'
import React from 'react'

const page = () => {
  return (
    <section className='bg-[#e8e8e8]'>
      <div>
        <MiniBanner title='Legal Framework & User Agreement' description='Protecting Your Interests with Precision and Elegance'/>
      </div>
      <Terms/>

    </section>
  )
}

export default page
