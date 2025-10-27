


"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useProperty } from "@/hooks/ApiClling"

export function PropertyList() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: session } = useSession()
  const token = session?.accessToken || ""

  const { data: propertyData, isLoading, error } = useProperty(token)

  // Use API data if available, otherwise fallback to empty array
  const properties = propertyData?.data || []
  const totalItems = propertyData?.meta?.total || 0
  const itemsPerPage = propertyData?.meta?.limit || 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = properties && properties?.slice(startIndex, endIndex)

  interface FormattedDateTime {
    date: string
    time: string
    day: string
  }

  const formatDateTime = (dateString: string): FormattedDateTime => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase(),
      day: date.toLocaleDateString('en-US', { weekday: 'long' })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading properties: {error.message}</div>
  }

  return (
    <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-lg xs:text-xl sm:text-2xl font-semibold text-[#0F3D61]">Property</h4>
          <h3 className="text-xs text-[#929292] mt-1">
            Manage your personal information and profile details.
          </h3>
        </div>
      </div>

      {/* Breadcrumb and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 !mb-6 sm:!mb-10">
        <div className="text-xs xs:text-sm sm:text-base text-[#929292] truncate">
          Dashboard <span className="mx-1 sm:mx-2">{">"}</span> Apartment Listings Management
        </div>
        <Link href="/user/add-property" className="w-full sm:w-auto">
          <Button className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-12 xs:h-[50px] text-xs xs:text-sm sm:text-base rounded-[8px] text-[#F4F4F4] w-full sm:w-auto">
            <Plus className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
            Add Apartment Listing
          </Button>
        </Link>
      </div>

      {/* Responsive Table Container */}
      <div className="rounded-lg border border-[#B6B6B6] overflow-hidden bg-white">
        {/* Mobile Card View */}
        <div className="sm:hidden">
          <div className="divide-y divide-[#B6B6B6]">
            {currentData.map((item) => {
              const { date, time, day } = formatDateTime(item.createdAt)
              return (
                <div key={item._id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-[#424242] text-sm">{item.title}</h3>
                      <p className="text-xs text-[#929292]">{day}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-[#424242]">
                    {date} at {time}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tablet+ Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead className="border-b border-[#B6B6B6] bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left font-bold text-[#131313] uppercase tracking-wider text-xs sm:text-sm">
                  Day Or Event
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-bold text-[#131313] uppercase tracking-wider text-xs sm:text-sm">
                  Apartment Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-bold text-[#131313] uppercase tracking-wider text-xs sm:text-sm">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-bold text-[#131313] uppercase tracking-wider text-xs sm:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B6B6B6] bg-white">
              {currentData.map((item) => {
                const { date, time, day } = formatDateTime(item.createdAt)
                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 text-[#424242] text-xs sm:text-sm">
                      {day}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-[#424242] text-xs sm:text-sm">
                      {item.title}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-[#424242] text-xs sm:text-sm">
                      {date}
                      <br />
                      <span className="text-gray-500 text-xs">{time}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                      <Link href={`/user/edit-property/${item._id}`}>
                        <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
                          <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </Link>
                        <button className="text-gray-600 hover:text-red-600 transition-colors p-1">
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-3 xs:px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-base xs:text-base text-gray-500 text-center sm:text-left">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
        </div>
        <div className="flex items-center gap-1 xs:gap-2 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2 xs:px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[32px]"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 xs:px-3 py-1.5 text-xs border rounded min-w-[32px] ${currentPage === page
                  ? "bg-[#0F3D61] text-white border-[#0F3D61]"
                  : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2 xs:px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[32px]"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  )
}