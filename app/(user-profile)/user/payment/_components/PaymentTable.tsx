/*eslint-disable */
"use client";

import { useState } from "react";
import { usePyament } from "@/hooks/ApiClling";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PaymentTable() {
    const { data: session } = useSession();
    const token = session?.accessToken || "";
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [messagingId, setMessagingId] = useState<string | null>(null);

    // Fetch payments with pagination
    const { data: paymentData, isLoading, isError } = usePyament(token, currentPage, 10);
    const payments = paymentData?.data || [];
    const meta = paymentData?.meta || { total: 0, page: 1, limit: 10 };
    const totalPages = Math.ceil(meta.total / meta.limit);

    // Pay Mutation - Redirect to payment gateway
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

    // Message Mutation - Create or open conversation
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

    const getStatusColor = (status: string) => {
        if (status === "paid") return "bg-green-600";
        if (status === "cancelled") return "bg-red-500";
        return "bg-yellow-500";
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading payments...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Failed to load payments.</div>;

    return (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden md:block rounded-[4px] border border-[#B6B6B6] overflow-hidden bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm lg:text-base">
                        <thead className="bg-gray-50 border-b border-[#B6B6B6]">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Apartment</th>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Problem Type</th>
                                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#B6B6B6]">
                            {payments.map((item: any) => {
                                const receiverId = item.contractor?.user?._id || "";
                                return (
                                    <tr key={item._id} className="hover:bg-gray-50 h-16">
                                        <td className="px-6 py-4 text-[#424242]">{item?.contractor?.name || "N/A"}</td>
                                        <td className="px-6 py-4 text-[#424242]">{item?.contractor?.email || "N/A"}</td>
                                        <td className="px-6 py-4 text-[#424242] font-medium">${item.amount || 0}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block py-2 px-5 rounded-[4px] text-white text-xs font-medium ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#424242]">{item.apartmentName || "—"}</td>
                                        <td className="px-6 py-4 text-[#424242]">{item?.extermination?.typeOfPestProblem?.[0] || "—"}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handlePay(item._id)}
                                                    disabled={loadingId === item._id || item.status === "paid"}
                                                    className="bg-[#0F3D61] text-white px-5 py-2 rounded-[4px] hover:bg-[#0c314f] disabled:opacity-50 transition text-sm font-medium"
                                                >
                                                    {loadingId === item._id ? "Processing..." : "Pay"}
                                                </button>
                                                <button
                                                    onClick={() => handleMessage(receiverId)}
                                                    disabled={!receiverId || messagingId === receiverId}
                                                    className="bg-green-600 text-white px-5 py-2 rounded-[4px] hover:bg-green-700 disabled:opacity-50 transition text-sm font-medium"
                                                >
                                                    {messagingId === receiverId ? "Opening..." : "Message"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards - Visible only on mobile */}
            <div className="md:hidden space-y-4">
                {payments.map((item: any) => {
                    const receiverId = item.contractor?.user?._id || "";
                    return (
                        <div key={item._id} className="bg-white border border-[#B6B6B6] rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-[#424242]">{item?.contractor?.name || "N/A"}</h3>
                                    <p className="text-sm text-gray-600">{item?.contractor?.email || "N/A"}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-[4px] text-white text-xs font-semibold ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                    <p className="text-gray-500">Amount</p>
                                    <p className="font-semibold">${item.amount || 0}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Apartment</p>
                                    <p className="font-medium">{item.apartmentName || "—"}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-gray-500">Problem Type</p>
                                    <p className="font-medium">{item?.extermination?.typeOfPestProblem?.[0] || "—"}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handlePay(item._id)}
                                    disabled={loadingId === item._id || item.status === "paid"}
                                    className="flex-1 bg-[#0F3D61] text-white py-3 rounded-[4px] font-medium text-sm hover:bg-[#0c314f] disabled:opacity-50 transition"
                                >
                                    {loadingId === item._id ? "Processing..." : "Pay Now"}
                                </button>
                                <button
                                    onClick={() => handleMessage(receiverId)}
                                    disabled={!receiverId || messagingId === receiverId}
                                    className="flex-1 bg-green-600 text-white py-3 rounded-[4px] font-medium text-sm hover:bg-green-700 disabled:opacity-50 transition"
                                >
                                    {messagingId === receiverId ? "Opening..." : "Message"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Responsive Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <p className="text-sm text-gray-600 order-2 sm:order-1 text-center sm:text-left">
                    Showing <span className="font-medium">{(meta.page - 1) * meta.limit + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(meta.page * meta.limit, meta.total)}</span> of{" "}
                    <span className="font-medium">{meta.total}</span> results
                </p>

                <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={meta.page === 1}
                        className="px-4 py-2 border border-gray-300 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm font-medium"
                    >
                        Previous
                    </button>

                    {/* Show limited page numbers on mobile */}
                    {totalPages <= 5 ? (
                        Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-[4px] text-sm font-medium transition ${
                                    meta.page === page
                                        ? "bg-[#0F3D61] text-white"
                                        : "border border-gray-300 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        ))
                    ) : (
                        <>
                            {/* First Page */}
                            <button
                                onClick={() => setCurrentPage(1)}
                                className={`px-4 py-2 rounded-[4px] text-sm font-medium ${meta.page === 1 ? "bg-[#0F3D61] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                            >
                                1
                            </button>

                            {/* Ellipsis if needed */}
                            {meta.page > 3 && <span className="px-2">...</span>}

                            {/* Current & nearby pages */}
                            {Array.from({ length: 3 }, (_, i) => meta.page - 1 + i)
                                .filter(p => p > 1 && p < totalPages)
                                .map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-[4px] text-sm font-medium ${meta.page === page ? "bg-[#0F3D61] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                            {meta.page < totalPages - 2 && <span className="px-2">...</span>}

                            {/* Last Page */}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className={`px-4 py-2 rounded-[4px] text-sm font-medium ${meta.page === totalPages ? "bg-[#0F3D61] text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={meta.page === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm font-medium"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}