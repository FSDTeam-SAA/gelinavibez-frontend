import React from 'react'
// import { ServideBanner } from './_components/ServideBanner'
// import SignatureServices from './_components/SignatureServices'
// import DistinguishedExperts from './_components/DistinguishedExperts'
import ContractorForm from './_components/ContractorForm'
import Masterpieces from './_components/Masterpieces'
import Community from '@/components/Shared/Community'


const page = () => {
  return (
    <section className='bg-[#e8e8e8]'>
      {/* <ServideBanner/>
      <SignatureServices/>
      <DistinguishedExperts/> */}
      <Masterpieces/>
      <ContractorForm/>
      <Community/>
    </section>
  )
}

export default page
