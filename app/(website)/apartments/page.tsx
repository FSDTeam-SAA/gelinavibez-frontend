import React from 'react'
import { Apartments_Banner } from './_components/Apartments_Banner'
import { Sunday } from './_components/Sunday'
import { Monday } from './_components/Monday'

const page = () => {
  return (
    <div>
      <Apartments_Banner/>
      <Sunday/>
      <Monday/>
    </div>
  )
}

export default page
