

"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockData = [
  { id: 1, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 2, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 3, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 4, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 5, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 6, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 7, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 8, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 9, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 10, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 11, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
  { id: 12, day: "Friday", name: "The Harbor Crown", date: "04/21/2025", time: "03:18pm" },
]

export function PropertyList() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = mockData.slice(startIndex, endIndex)

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
        <Link href="/add-property" className="w-full sm:w-auto">
          <Button className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-12 xs:h-[50px] text-xs xs:text-sm sm:text-base rounded-[8px] text-[#F4F4F4] w-full sm:w-auto">
            <Plus className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
            Add Apartment Listing
          </Button>
        </Link>
      </div>

      {/* ✅ Responsive Table Container */}
      <div className="rounded-lg border border-[#B6B6B6] overflow-hidden bg-white">
        {/* Mobile Card View */}
        <div className="sm:hidden">
          <div className="divide-y divide-[#B6B6B6]">
            {currentData.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-[#424242] text-sm">{item.name}</h3>
                    <p className="text-xs text-[#929292]">{item.day}</p>
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
                  {item.date} at {item.time}
                </div>
              </div>
            ))}
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
              {currentData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 text-[#424242] text-xs sm:text-sm">
                    {item.day}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-[#424242] text-xs sm:text-sm">
                    {item.name}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-[#424242] text-xs sm:text-sm">
                    {item.date}
                    <br />
                    <span className="text-gray-500 text-xs">{item.time}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button className="text-gray-600 hover:text-blue-600 transition-colors p-1">
                        <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600 transition-colors p-1">
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-3 xs:px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4  ">
        <div className="text-base xs:text-base text-gray-500 text-center sm:text-left">
          Showing {startIndex + 1} to {Math.min(endIndex, mockData.length)} of {mockData.length} results
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
              className={`px-2 xs:px-3 py-1.5 text-xs border rounded min-w-[32px] ${
                currentPage === page
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