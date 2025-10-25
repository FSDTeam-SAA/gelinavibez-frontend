import React from 'react'
import { Apartments_Banner } from './_components/Apartments_Banner'
import { Sunday } from './_components/Sunday'
import { Monday } from './_components/Monday'
import { Tuesday } from './_components/Tuesday'
import { Wednesday } from './_components/Wednesday'
import { Friday } from './_components/Friday'
import { Saturday } from './_components/Saturday'
import { Thursday } from './_components/Thursday'

const page = () => {
  return (
    <div>
      <Apartments_Banner/>
      <Sunday/>
      <Monday/>
       <Tuesday/>
      <Wednesday/>
      <Thursday/>
      <Friday/>
      <Saturday/>
    </div>
  )
}

export default page
