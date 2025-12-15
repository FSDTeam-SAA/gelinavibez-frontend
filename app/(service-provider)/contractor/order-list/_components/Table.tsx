// /*eslint-disable */
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { useGetOrder, useProfileQuery, useSendAmmount } from "@/hooks/ApiClling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"
// import { toast } from "sonner"
// import { useRouter } from "next/navigation"

// export default function ServiceProviderOrderList() {
//   const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
//   const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({})
//   const [msgLoading, setMsgLoading] = useState<{ [key: string]: boolean }>({})
  
//   const { data: session } = useSession()
//   const token = session?.accessToken || ""
//   const { data, isLoading, error } = useGetOrder(token)
//   const sendAmmount = useSendAmmount(token)
//   const router = useRouter()

//   const handleChange = (id: string, value: string) => {
//     setAmounts(prev => ({ ...prev, [id]: value }))
//   }

//   const handlePay = (id: string) => {
//     if (!amounts[id] || isNaN(Number(amounts[id])) || Number(amounts[id]) <= 0) {
//       toast.error("Please enter a valid amount")
//       return
//     }

//     setLoadingIds(prev => ({ ...prev, [id]: true }))

//     sendAmmount.mutate(
//       { id, amount: Number(amounts[id]) },
//       {
//         onSuccess: () => toast.success("Payment request sent successfully!"),
//         onError: (err: any) => toast.error(err.message || "Failed to send payment request"),
//         onSettled: () => setLoadingIds(prev => ({ ...prev, [id]: false }))
//       }
//     )
//   }

//   const handleMessageClick = async (receiverId: string) => {
//     if (!receiverId) {
//       toast.error("Customer not found")
//       return
//     }

//     setMsgLoading(prev => ({ ...prev, [receiverId]: true }))

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ receiverId }),
//       })

//       const data = await res.json()

//       if (!res.ok || !data.success) {
//         throw new Error(data.message || "Failed to create conversation")
//       }

//       toast.success("Chat opened successfully!")
//       router.push("/contractor/message")
//     } catch (err: any) {
//       toast.error(err.message || "Could not start chat")
//     } finally {
//       setMsgLoading(prev => ({ ...prev, [receiverId]: false }))
//     }
//   }

//   const getUserId = (user: any): string => {
//     if (!user) return ""
//     if (typeof user === "string") return user
//     return user._id || ""
//   }

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="text-sm text-gray-500 mb-6">Dashboard › Service Provider Order Lists</div>
//         <div className="space-y-4">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-white border rounded-[4px] p-6">
//               <Skeleton className="h-6 w-48 mb-4" />
//               <Skeleton className="h-4 w-full mb-2" />
//               <Skeleton className="h-4 w-3/4 mb-4" />
//               <div className="flex gap-3">
//                 <Skeleton className="h-10 w-28" />
//                 <Skeleton className="h-10 w-24" />
//                 <Skeleton className="h-10 w-28" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-500">Failed to load orders.</div>
//   }

//   const orders = data?.data?.exterminations || []

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="text-sm text-gray-500 mb-6">Dashboard › Service Provider Order Lists</div>

//       {/* Desktop Table - Hidden on Mobile & Tablet */}
//       <div className="hidden lg:block border border-gray-200 rounded-[4px] overflow-hidden bg-white">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left py-4 px-6 font-medium">Type of Pest Problem</th>
//               <th className="text-left py-4 px-6 font-medium">Property Address</th>
//               <th className="text-left py-4 px-6 font-medium">Preferred Date & Time</th>
//               <th className="text-left py-4 px-6 font-medium">Amount & Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {orders.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="text-center py-16 text-gray-500">No orders found.</td>
//               </tr>
//             ) : (
//               orders.map((order) => {
//                 const userId = getUserId(order.user)
//                 const hasBeenPaid = order.charges?.some((c: any) => c.isPayment)
//                 const defaultAmount = order.charges?.find((c: any) => c.isPayment)?.amount || ""

//                 return (
//                   <tr key={order._id} className={hasBeenPaid ? "bg-gray-50" : ""}>
//                     <td className="py-5 px-6 font-medium">
//                       {order.typeOfPestProblem?.join(", ") || "N/A"}
//                     </td>
//                     <td className="py-5 px-6">{order.propertyAddress || "N/A"}</td>
//                     <td className="py-5 px-6 text-gray-600">
//                       <div className="font-medium">
//                         {new Date(order.preferredServiceDate).toLocaleDateString("en-US", {
//                           month: "short", day: "numeric", year: "numeric"
//                         })}
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {Array.isArray(order.preferredTime) ? order.preferredTime.join(", ") : order.preferredTime || "Any time"}
//                       </div>
//                     </td>
//                     <td className="py-5 px-6">
//                       <div className="flex items-center gap-3">
//                         <Input
//                           disabled={hasBeenPaid}
//                           type="number"
//                           placeholder="$0"
//                           value={amounts[order._id] ?? (hasBeenPaid ? defaultAmount : "")}
//                           onChange={(e) => handleChange(order._id, e.target.value)}
//                           className="w-28 h-10 text-center"
//                         />
//                         <Button
//                           onClick={() => handlePay(order._id)}
//                           disabled={hasBeenPaid || loadingIds[order._id]}
//                           className="h-10 px-5 bg-green-600 hover:bg-green-700 disabled:opacity-60"
//                         >
//                           {loadingIds[order._id] ? <Loader2 className="w-4 h-4 animate-spin" /> : hasBeenPaid ? "Paid" : "Send"}
//                         </Button>
//                         <Button
//                           onClick={() => handleMessageClick(userId)}
//                           disabled={!userId || msgLoading[userId]}
//                           variant="outline"
//                           className="h-10 px-5 border-green-600 text-green-600 hover:bg-green-50"
//                         >
//                           {msgLoading[userId] ? <Loader2 className="w-4 h-4 animate-spin" /> : "Message"}
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile & Tablet Card View - Hidden on Desktop */}
//       <div className="lg:hidden space-y-5">
//         {orders.length === 0 ? (
//           <div className="text-center py-16 text-gray-500 bg-white rounded-[4px] border">
//             No orders found.
//           </div>
//         ) : (
//           orders.map((order) => {
//             const userId = getUserId(order.user)
//             const hasBeenPaid = order.charges?.some((c: any) => c.isPayment)
//             const defaultAmount = order.charges?.find((c: any) => c.isPayment)?.amount || ""

//             return (
//               <div key={order._id} className={`bg-white rounded-xl border ${hasBeenPaid ? "border-gray-300 bg-gray-50" : "border-gray-200 shadow-sm"} p-6`}>
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="font-bold text-lg text-gray-800">
//                       {order.typeOfPestProblem?.join(", ") || "N/A"}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">{order.propertyAddress || "No address"}</p>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm">
//                     <span className="text-gray-500">Date:</span>
//                     <span className="font-medium">
//                       {new Date(order.preferredServiceDate).toLocaleDateString("en-US", {
//                         month: "short", day: "numeric", year: "numeric"
//                       })}
//                     </span>
//                     <span className="text-gray-400">•</span>
//                     <span className="text-gray-600">
//                       {Array.isArray(order.preferredTime) ? order.preferredTime.join(", ") : order.preferredTime || "Any time"}
//                     </span>
//                   </div>

//                   <div className="pt-4 border-t border-gray-200">
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <Input
//                         disabled={hasBeenPaid}
//                         type="number"
//                         placeholder="$0"
//                         value={amounts[order._id] ?? (hasBeenPaid ? defaultAmount : "")}
//                         onChange={(e) => handleChange(order._id, e.target.value)}
//                         className="h-11 text-center font-medium"
//                       />
//                       <Button
//                         onClick={() => handlePay(order._id)}
//                         disabled={hasBeenPaid || loadingIds[order._id]}
//                         className="h-11 px-6 bg-green-600 hover:bg-green-700 disabled:opacity-60 font-medium"
//                       >
//                         {loadingIds[order._id] ? <Loader2 className="w-5 h-5 animate-spin" /> : hasBeenPaid ? "Paid" : "Send Request"}
//                       </Button>
//                       <Button
//                         onClick={() => handleMessageClick(userId)}
//                         disabled={!userId || msgLoading[userId]}
//                         variant="outline"
//                         className="h-11 px-6 border-green-600 text-green-600 hover:bg-green-50 font-medium"
//                       >
//                         {msgLoading[userId] ? <Loader2 className="w-5 h-5 animate-spin" /> : "Message"}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })
//         )}
//       </div>
//     </div>
//   )
// }


/* eslint-disable */
"use client"

import { useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useGetOrder, useSendAmmount } from "@/hooks/ApiClling"
import { useQuery } from "@tanstack/react-query"
import { getOrder } from "@/lib/order"

export default function ServiceProviderOrderList() {
  // -------------------- STATE --------------------
  const [amounts, setAmounts] = useState<Record<string, string>>({})
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
  const [msgLoading, setMsgLoading] = useState<Record<string, boolean>>({})

  // -------------------- HOOKS (ALWAYS CALLED) --------------------
  const { data: session, status } = useSession()
  const router = useRouter()

  const token = session?.accessToken ?? ""

  const {
  data,
  isLoading,
  error,
} = useQuery({
  queryKey: ["service"],
  queryFn: () => getOrder(token),
  enabled: status === "authenticated" && !!token,
});

  const sendAmmount = useSendAmmount(token)

  // -------------------- HELPERS --------------------
  const orders = useMemo(
    () => data?.data?.exterminations || [],
    [data]
  )

  const handleChange = (id: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [id]: value }))
  }

  const handlePay = (id: string) => {
    const value = amounts[id]

    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    setLoadingIds((prev) => ({ ...prev, [id]: true }))

    sendAmmount.mutate(
      { id, amount: Number(value) },
      {
        onSuccess: () => toast.success("Payment request sent successfully"),
        onError: (err: any) =>
          toast.error(err?.message || "Failed to send payment request"),
        onSettled: () =>
          setLoadingIds((prev) => ({ ...prev, [id]: false })),
      }
    )
  }

  const handleMessageClick = async (receiverId: string) => {
    if (!receiverId) {
      toast.error("Customer not found")
      return
    }

    setMsgLoading((prev) => ({ ...prev, [receiverId]: true }))

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ receiverId }),
        }
      )

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to create conversation")
      }

      toast.success("Chat opened successfully")
      router.push("/contractor/message?conversationId=" + result.data._id)
    } catch (err: any) {
      toast.error(err?.message || "Could not start chat")
    } finally {
      setMsgLoading((prev) => ({ ...prev, [receiverId]: false }))
    }
  }

  const getUserId = (user: any): string => {
    if (!user) return ""
    if (typeof user === "string") return user
    return user._id || ""
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  // -------------------- RENDER CONTROL (SAFE) --------------------
  if (status === "loading") {
    return (
      <div className="p-6">
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    )
  }

  if (status !== "authenticated") {
    return (
      <div className="p-6 text-center text-gray-500">
        Please login to view orders
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-md" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load orders
      </div>
    )
  }

  // -------------------- UI --------------------
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-sm text-gray-500 mb-6">
        Dashboard › Service Provider Order Lists
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Problem</th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-left">Action </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="py-14 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((order: any) => {
              const userId = getUserId(order.user)
              const paid = order.charges?.some((c: any) => c.isPayment)
              const paidAmount =
                order.charges?.find((c: any) => c.isPayment)?.amount || ""

              return (
                <tr key={order._id} className={paid ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 font-medium">
                    {order.typeOfPestProblem?.join(", ") || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {order.propertyAddress || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div>{formatDate(order.preferredServiceDate)}</div>
                    <div className="text-xs text-gray-500">
                      {Array.isArray(order.preferredTime)
                        ? order.preferredTime.join(", ")
                        : order.preferredTime || "Any time"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Input
                        disabled={paid}
                        type="number"
                        className="w-28 text-center"
                        value={amounts[order._id] ?? (paid ? paidAmount : "")}
                        onChange={(e) =>
                          handleChange(order._id, e.target.value)
                        }
                      />
                      <Button
                        disabled={paid || loadingIds[order._id]}
                        onClick={() => handlePay(order._id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {loadingIds[order._id] ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : paid ? (
                          "Paid"
                        ) : (
                          "Send"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        disabled={!userId || msgLoading[userId]}
                        onClick={() => handleMessageClick(userId)}
                      >
                        {msgLoading[userId] ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Message"
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-4">
        {orders.map((order: any) => {
          const userId = getUserId(order.user)
          const paid = order.charges?.some((c: any) => c.isPayment)
          const paidAmount =
            order.charges?.find((c: any) => c.isPayment)?.amount || ""

          return (
            <div
              key={order._id}
              className="bg-white border rounded-xl p-5 space-y-4"
            >
              <div>
                <h3 className="font-bold">
                  {order.typeOfPestProblem?.join(", ")}
                </h3>
                <p className="text-sm text-gray-600">
                  {order.propertyAddress}
                </p>
              </div>

              <div className="text-sm text-gray-600">
                {formatDate(order.preferredServiceDate)} •{" "}
                {Array.isArray(order.preferredTime)
                  ? order.preferredTime.join(", ")
                  : order.preferredTime}
              </div>

              <Input
                disabled={paid}
                type="number"
                value={amounts[order._id] ?? (paid ? paidAmount : "")}
                onChange={(e) =>
                  handleChange(order._id, e.target.value)
                }
              />

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={paid || loadingIds[order._id]}
                  onClick={() => handlePay(order._id)}
                >
                  {paid ? "Paid" : "Send"}
                </Button>
                <Button
                  className="flex-1 h-11 px-6 border-green-600 text-green-600 hover:bg-green-50 font-medium"
                  variant="outline"
                  disabled={!userId || msgLoading[userId]}
                  onClick={() => handleMessageClick(userId)}
                >
                  Message 
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
