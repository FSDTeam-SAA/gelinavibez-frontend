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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-2xl font-semibold text-[#0F3D61]">Property</h4>
          <h3 className="text-sm text-[#929292] mt-1">Manage your personal information and profile details.</h3>
        </div>
      </div>

      {/* Breadcrumb and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 !mb-10">
        <div className="text-base text-[#929292]">
          Dashboard <span className="mx-2">{">"}</span> Apartment Listings Management
        </div>
        <Link href="/add-property">
          <Button className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[50px] text-base rounded-[8px] text-[#F4F4F4]">
            <Plus className="w-4 h-4 mr-2" />
            Add Apartment Listing
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className=" rounded-lg border border-[#B6B6B6] overflow-hidden  ">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead className="border-b border-[#B6B6B6]   ">
              <tr className="">
                <th className="px-6 py-3 text-left text-base font-bold text-[#131313] uppercase tracking-wider">
                  Day Or Event
                </th>
                <th className="px-6 py-3 text-left text-base font-bold text-[#131313] uppercase tracking-wider">
                  Apartment Name
                </th>
                <th className="px-6 py-3 text-left text-base font-bold text-[#131313] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-base font-bold text-[#131313] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-[#B6B6B6]">
              {currentData.map((item) => (
                <tr key={item.id} className="">
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#424242]">{item.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#424242]">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#424242]">
                    {item.date}
                    <br />
                    <span className="text-gray-500">{item.time}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-600 hover:text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
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
        <div className="px-6 py-4  flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, mockData.length)} of {mockData.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm border rounded ${
                  currentPage === page ? "bg-[#0F3D61] text-white border-[#0F3D61]" : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>
        </div>
    </div>
  )
}
