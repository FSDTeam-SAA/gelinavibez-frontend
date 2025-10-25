
"use client";

import { useState } from "react";
// import { useSession } from "next-auth/react";
import { usePyament } from "@/hooks/ApiClling";

export function PaymentTable() {
    // const { data: session } = useSession();
    // const token = session?.accessToken || "";

    const [currentPage, setCurrentPage] = useState(1);

    // Fetch from API with pagination
    const { data: paymentData, isLoading, isError } = usePyament("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWNhZjMzYjg2NTc2NDUzZjg4ZjMyYSIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzYwOTMwNjI5LCJleHAiOjE3NjE1MzU0Mjl9.PyxqHnF8u3hYTqLQTs4jVQFDe-3wNCFz6MmjfGVLU1k", currentPage, 10);

    const payments = paymentData?.data || [];
    const meta = paymentData?.meta || { total: 0, page: 1, limit: 10 };

    const totalPages = Math.ceil(meta.total / meta.limit);

    if (isLoading) {
        return <div className="p-6 text-center text-gray-500">Loading...</div>;
    }

    if (isError) {
        return <div className="p-6 text-center text-red-500">Failed to load payments.</div>;
    }

    return (
        <div className="space-y-6 px-3 sm:px-6 lg:px-8 py-4">
            {/* Table */}
            <div className="rounded-lg border border-[#B6B6B6] overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm sm:text-base">
                        <thead className="border-b border-[#B6B6B6] bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Tenant</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Email</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Amount</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Status</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Apartment</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Problem Type</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Created At</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-xs sm:text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#B6B6B6] bg-white">
                            {payments.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-[#424242] text-xs sm:text-sm">
                                        {item.tenantName || "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-xs sm:text-sm">
                                        {item.tenantEmail || item.user?.email || "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-xs sm:text-sm">
                                        ${item.amount || 0}
                                    </td>
                                    <td className="px-4 py-3 text-xs sm:text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-md text-white ${item.status === "approved"
                                                    ? "bg-green-600"
                                                    : item.status === "rejected"
                                                        ? "bg-red-500"
                                                        : "bg-yellow-500"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-xs sm:text-sm">
                                        {item.apartmentName || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-xs sm:text-sm">
                                        {item.typeOfProblem || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-xs sm:text-sm">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="bg-[#0F3D61] text-white px-3 py-1 rounded-md text-xs sm:text-sm hover:bg-[#0c314f]">
                                            Pay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-3 sm:px-6 py-4">
                <div className="text-sm text-gray-500">
                    Showing {(meta.page - 1) * meta.limit + 1} to{" "}
                    {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={meta.page === 1}
                        className="px-3 py-1 border border-gray-300 rounded text-xs disabled:opacity-50"
                    >
                        {"<"}
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 text-xs border rounded ${meta.page === page
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
                        className="px-3 py-1 border border-gray-300 rounded text-xs disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
}
