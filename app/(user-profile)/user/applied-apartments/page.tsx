import React from 'react'
import AppliedTable from './_components/AppliedTable'

const page = () => {
    return (
        <div className='space-y-10'>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#0F3D61]">Applied Apartments</h4>
                    <h3 className="text-xs text-[#929292] mt-1">
                        Manage your personal information and profile details.
                    </h3>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="text-base text-[#929292]">
                Dashboard <span className="mx-2">{">"}</span> Applied Apartments
            </div>

            <AppliedTable />
        </div>
    )
}

export default page