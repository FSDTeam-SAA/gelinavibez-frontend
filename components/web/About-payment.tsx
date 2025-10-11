import Image from 'next/image'
import React from 'react'

const Aboutpayment = () => {
  return (
    <section className='bg-white py-[32px]'>
      <div className=' container'>
        <h1 className='text-center text-[32px] font-normal text-[#0F3D61]'>Payment Options</h1>
        <div className='flex justify-center mt-6'>
         <Image src="/assets/stripe.png" alt="Hero Background" width={1000} height={1000} className="w-[150px] h-[63px] " />
        </div>
      </div>
    </section>
  )
}

export default Aboutpayment
