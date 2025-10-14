import React from 'react'
import PropertyListing from './_components/PropertyListing'

import { YouMayLike } from './_components/YouMayLike'
import Community from '@/components/Shared/Community'

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
