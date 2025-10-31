



"use client";

import { useState } from "react";
import { usePyament } from "@/hooks/ApiClling";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function PaymentTable() {
    const { data: session } = useSession();
    const token = session?.accessToken || "";
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch from API with pagination
    const { data: paymentData, isLoading, isError } = usePyament(token, currentPage, 10);   
    const payments = paymentData?.data || [];
    const meta = paymentData?.meta || { total: 0, page: 1, limit: 10 };

    const totalPages = Math.ceil(meta.total / meta.limit);

    // Pay Mutation using fetch + TanStack Query
    const payMutation = useMutation({
        mutationFn: async (paymentId: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/charge/pay/${paymentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: "Payment failed" }));
                //  toast.error(error.message || "Payment failed");
                throw new Error(error.message || "Payment failed");
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (data?.data?.url) {
                window.location.href = data.data.url; // Redirect to Stripe
            }
        },
        onError: (error) => {
            toast.error(error.message || "Failed to process payment");
        },
    });

    const handlePay = (paymentId: string) => {
        payMutation.mutate(paymentId);
    };

    if (isLoading) {
        return <div className="p-6 text-center text-gray-500">Loading...</div>;
    }

    if (isError) {
        return <div className="p-6 text-center text-red-500">Failed to load payments.</div>;
    }

    return (
        <div className="space-y-6 px-3 base:px-6 lg:px-8 py-4">
            {/* Table */}
            <div className="rounded-lg border border-[#B6B6B6] overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-base base:text-base">
                        <thead className="border-b border-[#B6B6B6] bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Name</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Email</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Amount</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Status</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Apartment</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Problem Type</th>
                                <th className="px-4 py-3 text-left font-bold uppercase text-base base:text-base">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#B6B6B6] bg-white">
                            {payments.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 py-5 h-[60px]">
                                  <td className="px-4 py-3 text-[#424242] text-base base:text-base">
                                        {item?.contractor?.name || "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-base base:text-base">
                                        {item?.contractor?.email|| "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-base base:text-base">
                                        ${item.amount || 0}
                                    </td>
                                    <td className="px-4 py-3 text-base base:text-base">
                                        <span
                                            className={`py-2 px-6 rounded-[8px] text-white text-sm font-medium ${item.status === "paid"
                                                    ? "bg-green-600"
                                                    : item.status === "cancelled"
                                                        ? "bg-red-500"
                                                        : "bg-yellow-500"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-base base:text-base">
                                        {item.apartmentName || "—"}
                                    </td>
                                    <td className="px-4 py-3 text-[#424242] text-base base:text-base">
                                        {item?.extermination?.typeOfPestProblem[0] || "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handlePay(item._id)}
                                            disabled={payMutation.isPending || item.status === "paid"}
                                            className="bg-[#0F3D61] text-white px-4 py-2 rounded-[8px] text-base base:text-base hover:bg-[#0c314f] disabled:opacity-50 transition-colors whitespace-nowrap"
                                        >
                                            {payMutation.isPending ? "Processing..." : "Pay"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex base:flex-row items-center justify-between gap-4 px-3 base:px-6 py-4">
                <div className="text-base text-gray-500">
                    Showing {(meta.page - 1) * meta.limit + 1} to{" "}
                    {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
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
    );
}