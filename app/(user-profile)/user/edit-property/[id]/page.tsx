import React from 'react'
import { EditProperty } from './_components/EditProperty'

const page = ({params}:{params:{id:string}}) => {
  return (
    <div>
        <EditProperty id={params.id}/>
    </div>
  )
}

export default page