
/* eslint-disable */
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ContractorService {
  _id: string;
  name: string;
  email: string;
  companyName?: string;
  charges?: number;
  status: string;
  assigningContractor: string;
  user?: string; // contractor user id (for messaging)
}

const fetchMyContractorServices = async (token: string, page = 1, limit = 10) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/my-contractor-service?page=${page}&limit=${limit}&status=assigned`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to load" }));
    throw new Error(err.message || "Failed to load services");
  }

  return res.json();
};

const payContractorCharge = async (token: string, serviceId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/${serviceId}/pay-contractor-charge`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Payment failed" }));
    throw new Error(err.message || "Payment failed");
  }

  return res.json();
};

const createOrGetConversation = async (token: string, receiverId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receiverId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to start chat" }));
    throw new Error(err.message || "Failed to start conversation");
  }

  return res.json();
};

const requestMessagingPermission = async (token: string, targetId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/messaging-request/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ targetId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to send request" }));
    throw new Error(err.message || "Failed to request messaging permission");
  }

  return res.json();
};

export function ContractorChargesTable() {
  const { data: session } = useSession();
  const token = session?.accessToken || "";
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [payLoadingIds, setPayLoadingIds] = useState<Set<string>>(new Set());
  const [messageLoadingIds, setMessageLoadingIds] = useState<Set<string>>(new Set());
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-contractor-services", token, currentPage],
    queryFn: () => fetchMyContractorServices(token, currentPage),
    enabled: !!token,
  });

  const services: ContractorService[] = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  const payMutation = useMutation({
    mutationFn: ({ serviceId }: { serviceId: string }) =>
      payContractorCharge(token, serviceId),
    onSuccess: (res) => {
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.success("Payment processed successfully!");
        queryClient.invalidateQueries({ queryKey: ["my-contractor-services"] });
      }
    },
    onError: (err: any) => toast.error(err.message || "Payment failed"),
    onSettled: (_, __, variables) => {
      setPayLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(variables.serviceId);
        return next;
      });
    },
  });

  const messageMutation = useMutation({
    mutationFn: ({ receiverId }: { receiverId: string }) =>
      createOrGetConversation(token, receiverId),
    onSuccess: (data) => {
      const conversationId = data?.data?._id || data?.data?.[0]?._id;
      if (conversationId) {
        router.push(`/user/message?conversationId=${conversationId}`);
      } else {
        toast.error("Conversation created but no ID returned");
      }
    },
    onError: (err: any) => {
      const errorMessage = (err.message || "").toLowerCase();
      if (
        errorMessage.includes("permission not granted") ||
        errorMessage.includes("admin approval") ||
        errorMessage.includes("messaging permission") ||
        errorMessage.includes("not allowed") ||
        errorMessage.includes("requires approval")
      ) {
        setSelectedReceiverId(messageMutation.variables?.receiverId || null);
        setShowRequestModal(true);
      } else {
        toast.error(err.message || "Failed to open chat");
      }
    },
    onSettled: (_, __, variables) => {
      setMessageLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(variables.receiverId);
        return next;
      });
    },
  });

  const requestPermissionMutation = useMutation({
    mutationFn: ({ targetId }: { targetId: string }) =>
      requestMessagingPermission(token, targetId),
    onSuccess: () => {
      toast.success("Messaging permission request sent successfully!");
      setShowRequestModal(false);
      setSelectedReceiverId(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to send permission request");
    },
  });

  const handlePay = (serviceId: string) => {
    if (!serviceId) return toast.error("Missing service ID");
    setPayLoadingIds((prev) => {
      const next = new Set(prev);
      next.add(serviceId);
      return next;
    });
    payMutation.mutate({ serviceId });
  };

  const handleMessage = (receiverId: string) => {
    if (!receiverId) return toast.error("Invalid contractor");
    setMessageLoadingIds((prev) => {
      const next = new Set(prev);
      next.add(receiverId);
      return next;
    });
    messageMutation.mutate({ receiverId });
  };

  const handleConfirmRequest = () => {
    if (!selectedReceiverId) return;
    requestPermissionMutation.mutate({ targetId: selectedReceiverId });
  };

  const getStatusColor = (status: string = "unknown") => {
    const s = status.toLowerCase();
    if (s === "assigned") return "bg-green-600";
    if (s === "rejected") return "bg-red-500";
    if (s === "pending") return "bg-yellow-500";
    return "bg-gray-500";
  };

  const canPay = (status: string = "") => {
    const s = status.toLowerCase();
    return ["pending", "rejected", "assigned"].includes(s);
  };

  const isPayLoading = (id: string) => payLoadingIds.has(id);
  const isMessageLoading = (id: string) => messageLoadingIds.has(id);

  if (!token) return <div className="p-8 text-center text-gray-500">Please login to continue</div>;

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading contractor charges...</div>;

  if (isError) return <div className="p-8 text-center text-red-500">Failed to load data</div>;

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 relative">
      {/* Desktop Table */}
      <div className="hidden md:block rounded-[4px] border border-[#B6B6B6] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm lg:text-base">
            <thead className="bg-gray-50 border-b border-[#B6B6B6]">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Charge</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B6B6B6]">
              {services.map((item) => {
                const receiverId = item.assigningContractor || "";
                const serviceId = item._id || "";

                return (
                  <tr key={item._id} className="hover:bg-gray-50 h-16">
                    <td className="px-6 py-4 text-[#424242]">{item.name || "N/A"}</td>
                    <td className="px-6 py-4 text-[#424242]">{item.email || "N/A"}</td>
                    <td className="px-6 py-4 text-[#424242]">{item.companyName || "—"}</td>
                    <td className="px-6 py-4 font-medium text-[#424242]">
                      ${item.charges ?? 0}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block py-2 px-5 rounded-[4px] text-white text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status || "unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handlePay(serviceId)}
                          disabled={isPayLoading(serviceId) || !serviceId || !canPay(item.status)}
                          className="bg-[#0F3D61] text-white px-5 py-2 rounded-[4px] hover:bg-[#0c314f] disabled:opacity-50 transition text-sm font-medium"
                        >
                          {isPayLoading(serviceId) ? "Processing..." : "Pay"}
                        </button>

                        <button
                          onClick={() => handleMessage(receiverId)}
                          disabled={!receiverId || isMessageLoading(receiverId)}
                          className="bg-green-600 text-white px-5 py-2 rounded-[4px] hover:bg-green-700 disabled:opacity-50 transition text-sm font-medium"
                        >
                          {isMessageLoading(receiverId) ? "Opening..." : "Message"}
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {services.map((item) => {
          const receiverId = item.assigningContractor || "";
          const serviceId = item._id || "";

          return (
            <div
              key={item._id}
              className="bg-white border border-[#B6B6B6] rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-[#424242]">{item.name || "N/A"}</h3>
                  <p className="text-sm text-gray-600">{item.email || "N/A"}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-[4px] text-white text-xs font-semibold ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status || "unknown"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Company</p>
                  <p className="font-medium">{item.companyName || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Charge</p>
                  <p className="font-semibold">${item.charges ?? 0}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handlePay(serviceId)}
                  disabled={isPayLoading(serviceId) || !serviceId || !canPay(item.status)}
                  className="flex-1 bg-[#0F3D61] text-white py-3 rounded-[4px] font-medium text-sm hover:bg-[#0c314f] disabled:opacity-50 transition"
                >
                  {isPayLoading(serviceId) ? "Processing..." : "Pay"}
                </button>

                <button
                  onClick={() => handleMessage(receiverId)}
                  disabled={!receiverId || isMessageLoading(receiverId)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-[4px] font-medium text-sm hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {isMessageLoading(receiverId) ? "Opening..." : "Message"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-sm text-gray-600 order-2 sm:order-1 text-center sm:text-left">
            Showing{" "}
            <span className="font-medium">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of <span className="font-medium">{meta.total}</span> results
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={meta.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm font-medium"
            >
              Previous
            </button>

            {totalPages <= 5 ? (
              Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-4 py-2 rounded-[4px] text-sm font-medium ${
                    meta.page === 1 ? "bg-[#0F3D61] text-white" : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  1
                </button>

                {meta.page > 3 && <span className="px-2">...</span>}

                {Array.from({ length: 3 }, (_, i) => meta.page - 1 + i)
                  .filter((p) => p > 1 && p < totalPages)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-[4px] text-sm font-medium ${
                        meta.page === page
                          ? "bg-[#0F3D61] text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {meta.page < totalPages - 2 && <span className="px-2">...</span>}

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-4 py-2 rounded-[4px] text-sm font-medium ${
                    meta.page === totalPages
                      ? "bg-[#0F3D61] text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={meta.page === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm font-medium"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal - Request Messaging Permission */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Request Messaging Permission</h2>
            <p className="text-gray-600 mb-6">
              You need admin approval to message this contractor.  
              Would you like to send a request for messaging permission?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedReceiverId(null);
                }}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequest}
                disabled={requestPermissionMutation.isPending}
                className="px-5 py-2 bg-[#0F3D61] text-white rounded-md hover:bg-[#0c314f] disabled:opacity-60 transition flex items-center gap-2"
              >
                {requestPermissionMutation.isPending ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}