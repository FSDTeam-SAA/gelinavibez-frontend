


"use client";

import { useState } from "react";
import { usePyament } from "@/hooks/ApiClling";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export function PaymentTable() {
    const { data: session } = useSession();
    const token = session?.accessToken || "";
    const router = useRouter();
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [messagingId, setMessagingId] = useState<string | null>(null);

    // Fetch payments
    const { data: paymentData, isLoading, isError } = usePyament(token, currentPage, 10);
    const payments = paymentData?.data || [];
    const meta = paymentData?.meta || { total: 0, page: 1, limit: 10 };
    const totalPages = Math.ceil(meta.total / meta.limit);

    // Pay Mutation
    const payMutation = useMutation({
        mutationFn: async (paymentId: string) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/charge/pay/${paymentId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: "Payment failed" }));
                throw new Error(error.message || "Payment failed");
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (data?.data?.url) {
                window.location.href = data.data.url;
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to process payment");
        },
    });

    // Message Mutation - Create/Open Conversation
    const messageMutation = useMutation({
        mutationFn: async ({ receiverId }: { receiverId: string }) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ receiverId }),
                }
            );

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: "Failed to start chat" }));
                throw new Error(error.message || "Failed to start conversation");
            }

            return response.json();
        },
        onSuccess: (data) => {
            const conversationId = data?.data?._id || data?.data?.[0]?._id;
            if (conversationId) {
                // Redirect to messages page with conversation ID
                router.push(`/user/message?conversationId=${conversationId}`);
            } else {
                toast.error("Conversation created but no ID returned");
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to open chat");
        },
        onSettled: () => {
            setMessagingId(null);
        },
    });

    const handlePay = (paymentId: string) => {
        setLoadingId(paymentId);
        payMutation.mutate(paymentId, {
            onSettled: () => setLoadingId(null),
        });
    };

    const handleMessage = (receiverId: string) => {
        if (!receiverId) {
            toast.error("Invalid user");
            return;
        }

        setMessagingId(receiverId);
        messageMutation.mutate({ receiverId });
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
                                <th className="px-4 py-3 text-left font-bold uppercase">Name</th>
                                <th className="px-4 py-3 text-left font-bold uppercase">Email</th>
                                <th className="px-4 py-3 text-left font-bold uppercase">Amount</th>
                                <th className="px-4 py-3 text-left font-bold uppercase">Status</th>
                                <th className="px-4 py-3 text-left font-bold uppercase">Apartment</th>
                                <th className="px-4 py-3 text-left font-bold uppercase">Problem Type</th>
                                <th className="px-4 py-3 text-left font-bold uppercase">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#B6B6B6] bg-white">
                            {payments.map((item) => {
                                const receiverId = item?.contractor?.user?._id  || "";
                              

                                return (
                                    <tr key={item._id} className="hover:bg-gray-50 h-[60px]">
                                        <td className="px-4 py-3 text-[#424242]">
                                            {item?.contractor?.name || "N/A"}
                                        </td>

                                        <td className="px-4 py-3 text-[#424242]">
                                            {item?.contractor?.email || "N/A"}
                                        </td>

                                        <td className="px-4 py-3 text-[#424242]">${item.amount || 0}</td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`py-2 px-6 rounded-[8px] text-white text-sm font-medium 
                                                    ${item.status === "paid"
                                                        ? "bg-green-600"
                                                        : item.status === "cancelled"
                                                            ? "bg-red-500"
                                                            : "bg-yellow-500"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-[#424242]">{item.apartmentName || "—"}</td>

                                        <td className="px-4 py-3 text-[#424242]">
                                            {item?.extermination?.typeOfPestProblem?.[0] || "—"}
                                        </td>

                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                onClick={() => handlePay(item._id)}
                                                disabled={loadingId === item._id || item.status === "paid"}
                                                className="bg-[#0F3D61] text-white px-4 py-2 rounded-[8px]
                                                           hover:bg-[#0c314f] disabled:opacity-50 transition-colors text-sm"
                                            >
                                                {loadingId === item._id ? "Processing..." : "Pay"}
                                            </button>

                                            <button
                                                onClick={() => handleMessage(receiverId)}
                                                disabled={!receiverId || messagingId === receiverId}
                                                className="bg-green-600 text-white px-4 py-2 rounded-[8px]
                                                           hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
                                            >
                                                {messagingId === receiverId ? "Opening..." : "Message"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-4 px-3 base:px-6 py-4">
                <div className="text-base text-gray-500">
                    Showing {(meta.page - 1) * meta.limit + 1} to{" "}
                    {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} results
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={meta.page === 1}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 border rounded ${
                                meta.page === page
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
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
}