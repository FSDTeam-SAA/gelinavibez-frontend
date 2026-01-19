
// /* eslint-disable */
// "use client";

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// interface ExterminationService {
//   _id: string;
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   propertyAddress?: string;
//   typeOfPestProblem: string[];
//   status: string;
//   charges?: number;
//   assigningExtermination?: string;
// }

// const fetchMyExterminationServices = async (token: string, page = 1, limit = 10) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/my-extermination-service?page=${page}&limit=${limit}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ message: "Failed to load" }));
//     throw new Error(err.message || "Failed to load extermination services");
//   }

//   return res.json();
// };

// const payExterminationCharge = async (token: string, serviceId: string) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/${serviceId}/pay-extermination-charge`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ message: "Payment failed" }));
//     throw new Error(err.message || "Payment failed");
//   }

//   return res.json();
// };

// const createOrGetConversation = async (token: string, receiverId: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ receiverId }),
//   });

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ message: "Failed to start chat" }));
//     throw new Error(err.message || "Failed to start conversation");
//   }

//   return res.json();
// };

// export function ExterminationTable() {
//   const { data: session } = useSession();
//   const token = session?.accessToken || "";
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [payLoadingId, setPayLoadingId] = useState<string | null>(null);
//   const [messageLoadingId, setMessageLoadingId] = useState<string | null>(null);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["my-extermination-services", token, currentPage],
//     queryFn: () => fetchMyExterminationServices(token, currentPage),
//     enabled: !!token,
//   });

//   const allServices: ExterminationService[] = data?.data || [];
//   const meta = data?.meta || { total: 0, page: 1, limit: 10 };
//   const totalPages = Math.ceil(meta.total / meta.limit);

//   // ── ONLY SHOW "assigned" services ───────────────────────────────
//   const services = allServices.filter((item) => 
//     item.status?.toLowerCase() === "assigned"
//   );

//   const payMutation = useMutation({
//     mutationFn: ({ serviceId }: { serviceId: string }) =>
//       payExterminationCharge(token, serviceId),
//     onSuccess: (res) => {
//       if (res?.data?.url) {
//         window.location.href = res.data.url;
//       } else {
//         toast.success("Payment processed successfully!");
//         queryClient.invalidateQueries({ queryKey: ["my-extermination-services"] });
//       }
//     },
//     onError: (err: any) => toast.error(err.message || "Payment failed"),
//     onSettled: () => setPayLoadingId(null),
//   });

//   const messageMutation = useMutation({
//     mutationFn: ({ receiverId }: { receiverId: string }) =>
//       createOrGetConversation(token, receiverId),
//     onSuccess: (data) => {
//       const conversationId = data?.data?._id || data?.data?.[0]?._id;
//       if (conversationId) {
//         router.push(`/user/message?conversationId=${conversationId}`);
//       } else {
//         toast.error("Conversation created but no ID returned");
//       }
//     },
//     onError: (err: any) => toast.error(err.message || "Failed to open chat"),
//     onSettled: () => setMessageLoadingId(null),
//   });

//   const handlePay = (serviceId: string) => {
//     if (!serviceId) return toast.error("Missing service ID");
//     setPayLoadingId(serviceId);
//     payMutation.mutate({ serviceId });
//   };

//   const handleMessage = (receiverId: string) => {
//     if (!receiverId) return toast.error("Invalid exterminator");
//     setMessageLoadingId(receiverId);
//     messageMutation.mutate({ receiverId });
//   };

//   const getStatusColor = (status: string = "unknown") => {
//     const s = status.toLowerCase();
//     if (s === "completed") return "bg-green-600";
//     if (s === "rejected") return "bg-red-500";
//     if (s === "pending") return "bg-yellow-500";
//     if (s === "assigned") return "bg-blue-600";
//     return "bg-gray-500";
//   };

//   // Pay button enabled when status is "assigned"
//   const canPay = (status: string = "") => {
//     return status.toLowerCase() === "assigned";
//   };

//   if (!token) return <div className="p-8 text-center text-gray-500">Please login to continue</div>;

//   if (isLoading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

//   if (isError) return <div className="p-8 text-center text-red-500">Failed to load data</div>;

//   if (services.length === 0) {
//     return (
//       <div className="p-8 text-center text-gray-600">
//         No assigned extermination services found.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
//       {/* Desktop Table */}
//       <div className="hidden md:block rounded-[4px] border border-[#B6B6B6] overflow-hidden bg-white">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm lg:text-base">
//             <thead className="bg-gray-50 border-b border-[#B6B6B6]">
//               <tr>
//                 <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Client Name</th>
//                 <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Pest Problem</th>
//                 <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Charge</th>
//                 <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-[#B6B6B6]">
//               {services.map((item) => {
//                 const receiverId = item.assigningExtermination || "";
//                 const serviceId = item._id || "";

//                 return (
//                   <tr key={item._id} className="hover:bg-gray-50 h-16">
//                     <td className="px-6 py-4 text-[#424242]">{item.fullName || "N/A"}</td>
//                     <td className="px-6 py-4 text-[#424242]">{item.email || "N/A"}</td>
//                     <td className="px-6 py-4 text-[#424242]">
//                       {item.typeOfPestProblem?.join(", ") || "—"}
//                     </td>
//                     <td className="px-6 py-4 font-medium text-[#424242]">
//                       ${item.charges ?? 0}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`inline-block py-2 px-5 rounded-[4px] text-white text-xs font-medium ${getStatusColor(
//                           item.status
//                         )}`}
//                       >
//                         {item.status || "unknown"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handlePay(serviceId)}
//                           disabled={payLoadingId === serviceId || !serviceId || !canPay(item.status)}
//                           className={`px-5 py-2 rounded-[4px] text-white text-sm font-medium transition ${
//                             canPay(item.status)
//                               ? "bg-[#0F3D61] hover:bg-[#0c314f]"
//                               : "bg-gray-400 cursor-not-allowed"
//                           } disabled:opacity-60`}
//                         >
//                           {payLoadingId === serviceId ? "Processing..." : "Pay"}
//                         </button>

//                         <button
//                           onClick={() => handleMessage(receiverId)}
//                           disabled={!receiverId || messageLoadingId === receiverId}
//                           className="bg-green-600 text-white px-5 py-2 rounded-[4px] hover:bg-green-700 disabled:opacity-50 transition text-sm font-medium"
//                         >
//                           {messageLoadingId === receiverId ? "Opening..." : "Message"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {services.map((item) => {
//           const receiverId = item.assigningExtermination || "";
//           const serviceId = item._id || "";

//           return (
//             <div
//               key={item._id}
//               className="bg-white border border-[#B6B6B6] rounded-xl p-5 shadow-sm"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-bold text-[#424242]">{item.fullName || "N/A"}</h3>
//                   <p className="text-sm text-gray-600">{item.email || "N/A"}</p>
//                 </div>
//                 <span
//                   className={`px-3 py-1 rounded-[4px] text-white text-xs font-semibold ${getStatusColor(
//                     item.status
//                   )}`}
//                 >
//                   Assigned
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//                 <div>
//                   <p className="text-gray-500">Pest Problem</p>
//                   <p className="font-medium">{item.typeOfPestProblem?.join(", ") || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Charge</p>
//                   <p className="font-semibold">${item.charges ?? 0}</p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => handlePay(serviceId)}
//                   disabled={payLoadingId === serviceId || !serviceId || !canPay(item.status)}
//                   className={`flex-1 text-white py-3 rounded-[4px] font-medium text-sm transition ${
//                     canPay(item.status)
//                       ? "bg-[#0F3D61] hover:bg-[#0c314f]"
//                       : "bg-gray-400 cursor-not-allowed"
//                   } disabled:opacity-60`}
//                 >
//                   {payLoadingId === serviceId ? "Processing..." : "Pay"}
//                 </button>

//                 <button
//                   onClick={() => handleMessage(receiverId)}
//                   disabled={!receiverId || messageLoadingId === receiverId}
//                   className="flex-1 bg-green-600 text-white py-3 rounded-[4px] font-medium text-sm hover:bg-green-700 disabled:opacity-50 transition"
//                 >
//                   {messageLoadingId === receiverId ? "Opening..." : "Message"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination - only show if needed */}
//       {totalPages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
//           <p className="text-sm text-gray-600 order-2 sm:order-1 text-center sm:text-left">
//             Showing{" "}
//             <span className="font-medium">
//               {(meta.page - 1) * meta.limit + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-medium">
//               {Math.min(meta.page * meta.limit, meta.total)}
//             </span>{" "}
//             of <span className="font-medium">{meta.total}</span> results
//           </p>

//           <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={meta.page === 1}
//               className="px-4 py-2 border border-gray-300 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm font-medium"
//             >
//               Previous
//             </button>

//             {/* Simple pagination - you can keep your original detailed version */}
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`px-4 py-2 rounded-[4px] text-sm font-medium transition ${
//                   meta.page === page
//                     ? "bg-[#0F3D61] text-white"
//                     : "border border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={meta.page === totalPages}
//               className="px-4 py-2 border border-gray-300 rounded-[4px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm font-medium"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







/* eslint-disable */
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ExterminationService {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  propertyAddress?: string;
  typeOfPestProblem: string[];
  status: string;
  charges?: number;
  assigningExtermination?: string;
}

const fetchMyExterminationServices = async (token: string, page = 1, limit = 10) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/my-extermination-service?page=${page}&limit=${limit}`,
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
    throw new Error(err.message || "Failed to load extermination services");
  }

  return res.json();
};

const payExterminationCharge = async (token: string, serviceId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/${serviceId}/pay-extermination-charge`,
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/messaging-request`, {
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

export function ExterminationTable() {
  const { data: session } = useSession();
  const token = session?.accessToken || "";
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [payLoadingId, setPayLoadingId] = useState<string | null>(null);
  const [messageLoadingId, setMessageLoadingId] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-extermination-services", token, currentPage],
    queryFn: () => fetchMyExterminationServices(token, currentPage),
    enabled: !!token,
  });

  const allServices: ExterminationService[] = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  const services = allServices.filter((item) =>
    item.status?.toLowerCase() === "assigned"
  );

  const payMutation = useMutation({
    mutationFn: ({ serviceId }: { serviceId: string }) =>
      payExterminationCharge(token, serviceId),
    onSuccess: (res) => {
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.success("Payment processed successfully!");
        queryClient.invalidateQueries({ queryKey: ["my-extermination-services"] });
      }
    },
    onError: (err: any) => toast.error(err.message || "Payment failed"),
    onSettled: () => setPayLoadingId(null),
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
      const errorMessage = err.message?.toLowerCase() || "";
      if (
        errorMessage.includes("permission not granted") ||
        errorMessage.includes("messaging permission") ||
        errorMessage.includes("admin")
      ) {
        setSelectedReceiverId(messageMutation.variables?.receiverId || null);
        setShowRequestModal(true);
      } else {
        toast.error(err.message || "Failed to open chat");
      }
    },
    onSettled: () => setMessageLoadingId(null),
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
    setPayLoadingId(serviceId);
    payMutation.mutate({ serviceId });
  };

  const handleMessage = (receiverId: string) => {
    if (!receiverId) return toast.error("Invalid exterminator");
    setMessageLoadingId(receiverId);
    messageMutation.mutate({ receiverId });
  };

  const handleRequestPermission = () => {
    if (!selectedReceiverId) return;
    requestPermissionMutation.mutate({ targetId: selectedReceiverId });
  };

  const getStatusColor = (status: string = "unknown") => {
    const s = status.toLowerCase();
    if (s === "completed") return "bg-green-600";
    if (s === "rejected") return "bg-red-500";
    if (s === "pending") return "bg-yellow-500";
    if (s === "assigned") return "bg-blue-600";
    return "bg-gray-500";
  };

  const canPay = (status: string = "") => {
    return status.toLowerCase() === "assigned";
  };

  if (!token) return <div className="p-8 text-center text-gray-500">Please login to continue</div>;

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  if (isError) return <div className="p-8 text-center text-red-500">Failed to load data</div>;

  if (services.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        No assigned extermination services found.
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 relative">
      {/* Desktop Table */}
      <div className="hidden md:block rounded-[4px] border border-[#B6B6B6] overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm lg:text-base">
            <thead className="bg-gray-50 border-b border-[#B6B6B6]">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Pest Problem</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Charge</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B6B6B6]">
              {services.map((item) => {
                const receiverId = item.assigningExtermination || "";
                const serviceId = item._id || "";

                return (
                  <tr key={item._id} className="hover:bg-gray-50 h-16">
                    <td className="px-6 py-4 text-[#424242]">{item.fullName || "N/A"}</td>
                    <td className="px-6 py-4 text-[#424242]">{item.email || "N/A"}</td>
                    <td className="px-6 py-4 text-[#424242]">
                      {item.typeOfPestProblem?.join(", ") || "—"}
                    </td>
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
                          disabled={payLoadingId === serviceId || !serviceId || !canPay(item.status)}
                          className={`px-5 py-2 rounded-[4px] text-white text-sm font-medium transition ${
                            canPay(item.status)
                              ? "bg-[#0F3D61] hover:bg-[#0c314f]"
                              : "bg-gray-400 cursor-not-allowed"
                          } disabled:opacity-60`}
                        >
                          {payLoadingId === serviceId ? "Processing..." : "Pay"}
                        </button>

                        <button
                          onClick={() => handleMessage(receiverId)}
                          disabled={!receiverId || messageLoadingId === receiverId}
                          className="bg-green-600 text-white px-5 py-2 rounded-[4px] hover:bg-green-700 disabled:opacity-50 transition text-sm font-medium"
                        >
                          {messageLoadingId === receiverId ? "Opening..." : "Message"}
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
          const receiverId = item.assigningExtermination || "";
          const serviceId = item._id || "";

          return (
            <div
              key={item._id}
              className="bg-white border border-[#B6B6B6] rounded-xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-[#424242]">{item.fullName || "N/A"}</h3>
                  <p className="text-sm text-gray-600">{item.email || "N/A"}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-[4px] text-white text-xs font-semibold ${getStatusColor(
                    item.status
                  )}`}
                >
                  Assigned
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Pest Problem</p>
                  <p className="font-medium">{item.typeOfPestProblem?.join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Charge</p>
                  <p className="font-semibold">${item.charges ?? 0}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handlePay(serviceId)}
                  disabled={payLoadingId === serviceId || !serviceId || !canPay(item.status)}
                  className={`flex-1 text-white py-3 rounded-[4px] font-medium text-sm transition ${
                    canPay(item.status)
                      ? "bg-[#0F3D61] hover:bg-[#0c314f]"
                      : "bg-gray-400 cursor-not-allowed"
                  } disabled:opacity-60`}
                >
                  {payLoadingId === serviceId ? "Processing..." : "Pay"}
                </button>

                <button
                  onClick={() => handleMessage(receiverId)}
                  disabled={!receiverId || messageLoadingId === receiverId}
                  className="flex-1 bg-green-600 text-white py-3 rounded-[4px] font-medium text-sm hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {messageLoadingId === receiverId ? "Opening..." : "Message"}
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}

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

      {/* Request Messaging Permission Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Request Messaging Permission</h2>
            <p className="text-gray-600 mb-6">
              The exterminator has not granted messaging permission yet. 
              Would you like to send a request to allow messaging?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedReceiverId(null);
                }}
                className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestPermission}
           
                className="px-5 py-2 bg-[#0F3D61] text-white rounded-md hover:bg-[#0c314f] disabled:opacity-50 transition"
              >
                {requestPermissionMutation ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}