import MiniBanner from '@/components/web/MIniBanner'
import Privacy from '@/components/web/Privacy'
import React from 'react'

const page = () => {
  return (
    <section className='bg-[#e8e8e8]'>
      <div>
        <MiniBanner title='Confidentiality & Trust' description='Ensuring Your Privacy in Every Interaction'/>
      </div>
      <Privacy/>

    </section>
  )
}

export default page
