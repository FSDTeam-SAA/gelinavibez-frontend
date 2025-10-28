"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useGetPaymentProperty } from "@/hooks/ApiClling"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

const AppliedTable = () => {
  const { data: session } = useSession()
  const token = session?.accessToken || ""

  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const { data, isLoading } = useGetPaymentProperty(token, currentPage, limit)
  const applications = data?.data || []
  const meta = data?.meta || { total: 0, page: 1, limit: 10 }
  const totalPages = Math.ceil(meta.total / meta.limit)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600 h-8 flex justify-center items-center">Approved</Badge>
      case "denied":
        return <Badge className="bg-red-500 hover:bg-red-600 h-8 flex justify-center items-center">Denied</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 h-8 flex justify-center items-center">Pending</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 px-3 xs:px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-md border overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-5 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 10 }).map((__, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Large screen table */}
      <div className="hidden lg:block rounded-md border overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow className="text-[18px] h-[70px]">
              <TableHead className="px-5">Image</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Apartment</TableHead>
              <TableHead>Apartment Price</TableHead>
              <TableHead>Employer Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <TableRow key={app._id}>
                  <TableCell className="py-4 px-5">
                    <Image
                      src={app.apartmentId?.images?.[0] ?? '/default-image.jpg'}
                      alt={app.apartmentId?.title ?? "Apartment"}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{app.firstName} {app.lastName}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>
                    <div className="font-medium">{app.apartmentId?.title}</div>
                    <div className="text-xs text-muted-foreground">{app.apartmentId?.bedrooms}BR / {app.apartmentId?.bathrooms}BA</div>
                  </TableCell>
                  <TableCell>${app.apartmentId?.price}</TableCell>
                  <TableCell>{app.employmentInfo?.employerName}</TableCell>
                  <TableCell>{app.employmentInfo?.jobTitle}</TableCell>
                  <TableCell className="text-white">{getStatusBadge(app.status)}</TableCell>
                  <TableCell>{formatDate(app.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet card view */}
      <div className="lg:hidden space-y-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="border rounded-md p-4 shadow-sm bg-white space-y-2">
              <div className="flex items-center gap-4">
                <Image
                  src={app.apartmentId?.images?.[0] ?? '/default-image.jpg'}
                  alt={app.apartmentId?.title ?? "Apartment"}
                  width={60}
                  height={60}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <div className="font-medium text-lg">{app.firstName} {app.lastName}</div>
                  <div className="text-sm text-muted-foreground">{app.email}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Phone: {app.phone}</div>
              <div className="text-sm font-medium">Apartment: {app.apartmentId?.title}</div>
              <div className="text-xs text-muted-foreground">{app.apartmentId?.bedrooms}BR / {app.apartmentId?.bathrooms}BA</div>
              <div className="text-sm">Price: ${app.apartmentId?.price}</div>
              <div className="text-sm">Employer: {app.employmentInfo?.employerName}</div>
              <div className="text-sm">Job: {app.employmentInfo?.jobTitle}</div>
              <div className="flex justify-between text-white items-center mt-2">
                {getStatusBadge(app.status)}
                <div className="text-sm text-muted-foreground">{formatDate(app.createdAt)}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">No applications found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-3 base:px-6 py-4">
        <div className="text-base text-gray-500">
          Showing {(meta.page - 1) * meta.limit + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={meta.page === 1}
            className="px-3 py-1 border border-gray-300 rounded text-base disabled:opacity-50"
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-base border rounded ${meta.page === page
                  ? "bg-[#0F3D61] text-white border-[#0F3D61]"
                  : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={meta.page === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-base disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppliedTable
