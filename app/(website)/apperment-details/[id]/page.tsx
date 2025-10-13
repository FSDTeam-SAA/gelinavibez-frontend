import React from 'react'
import PropertyListing from './_components/PropertyListing'
import Community from '@/components/web/Commnunity'
import { YouMayLike } from './_components/YouMayLike'

const page = () => {
  return (
    <div>
      <PropertyListing/>
      <YouMayLike/>
      <Community/>
    </div>
  )
}

export default page
