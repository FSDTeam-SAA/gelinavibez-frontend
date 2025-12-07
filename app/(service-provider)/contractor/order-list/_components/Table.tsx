
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { useGetOrder, useProfileQuery, useSendAmmount } from "@/hooks/ApiClling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"
// import { toast } from "sonner"

// export default function ServiceProviderOrderList() {
//   const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
//   const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({})
//   const { data: session } = useSession()
//   const token = session?.accessToken || ""
//   const { data, isLoading, error } = useGetOrder(token)
//   const sendAmmount = useSendAmmount(token)
//   const getUser = useProfileQuery(token)


//   const handleChange = (id: string, value: string) => {
//     setAmounts(prev => ({ ...prev, [id]: value }))
//   }
  
//   const handlePay = (id: string) => {
//     // Ensure that getUser.data and getUser.data.data are defined
//     const stripeAccountId = getUser.data?.data?.stripeAccountId;

//     // Check if stripeAccountId is not present or is an empty string
//     if (!stripeAccountId) {
//       toast.error("Please connect your Stripe account first"); 
//       return 
//     } else {
     
//       setLoadingIds((prev) => ({ ...prev, [id]: true }));

//       sendAmmount.mutate(
//         { id, amount: Number(amounts[id]) },
//         {
//           onSettled: () => {
//             setLoadingIds((prev) => ({ ...prev, [id]: false }));
//           },
//         }
        
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-6">
//         <div className="text-sm text-gray-500 mb-4">
//           Dashboard &gt; Service Provider Order Lists
//         </div>

//         <div className="border border-gray-200 rounded-md overflow-hidden">
//           <table className="w-full border-collapse text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left py-3 px-4 border-b">Type of Pest Problem</th>
//                 <th className="text-left py-3 px-4 border-b">Property Address</th>
//                 <th className="text-left py-3 px-4 border-b">Date</th>
//                 <th className="text-left py-3 px-4 border-b w-[200px]">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[...Array(5)].map((_, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 px-4">
//                     <Skeleton className="h-4 w-40" />
//                   </td>
//                   <td className="py-3 px-4">
//                     <Skeleton className="h-4 w-48" />
//                   </td>
//                   <td className="py-3 px-4 flex flex-col gap-1">
//                     <Skeleton className=" w-28" />
//                     <Skeleton className=" w-16" />
//                   </td>
//                   <td className="py-3 px-4 flex items-center gap-2">
//                     <Skeleton className=" w-[100px] rounded-md" />
//                     <Skeleton className=" w-[100px] rounded-md" />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load orders. Please try again later.
//       </div>
//     )
//   }

//   return (
//     <div className="p-6">
//       <div className="text-sm text-gray-500 mb-4">
//         Dashboard &gt; Service Provider Order Lists
//       </div>

//       <div className="border border-gray-200 rounded-md overflow-hidden">
//         <table className="w-full border-collapse text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left py-3 px-4 border-b">Type of Pest Problem</th>
//               <th className="text-left py-3 px-4 border-b">Property Address</th>
//               <th className="text-left py-3 px-4 border-b">Date</th>
//               <th className="text-left py-3 px-4 border-b w-[200px]">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.data.exterminations.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="text-center py-6 text-gray-500">
//                   No orders found.
//                 </td>
//               </tr>
//             ) : (
//               data?.data.exterminations.map(order => {
//                 const paidCharge = order.charges?.find(c => c.isPayment)
//                 const defaultAmount =
//                   paidCharge?.amount || order.charges?.[0]?.amount || ""

//                 return (
//                   <tr
//                     key={order._id}
//                     className={`border-b ${order?.charges[0]?.isPayment ? "bg-gray-300/40" : ""
//                       }`}
//                   >
//                     <td className="py-3 px-4">
//                       {order.typeOfPestProblem.join(", ")}
//                     </td>
//                     <td className="py-3 px-4">{order.propertyAddress}</td>
//                     <td className="py-3 px-4">
//                       {new Date(order.preferredServiceDate).toLocaleDateString()}{" "}
//                       <span className="text-gray-500">
//                         {new Date(order.preferredServiceDate).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 flex items-center gap-2">
//                       <Input
//                         disabled={order?.charges[0]?.isPayment}
//                         type="number"
//                         placeholder="$ amount"
//                         value={amounts[order._id] ?? defaultAmount.toString()}
//                         onChange={e => handleChange(order._id, e.target.value)}
//                         className="w-[100px] h-[34px] text-center border-gray-300 rounded-md bg-gray-100 text-gray-600"
//                       />
//                       <Button
//                         onClick={() => handlePay(order._id)}
//                         className="bg-green-100 w-[100px] h-[34px] text-green-600 hover:bg-green-200 rounded-md flex items-center justify-center gap-2"
//                         disabled={
//                           loadingIds[order._id] || order?.charges[0]?.isPayment
//                         }
//                       >
//                         {loadingIds[order._id] ? (
//                           <Loader2 className="w-4 h-4 animate-spin" />
//                         ) : (
//                           "Send"
//                         )}
//                       </Button>
//                     </td>
//                   </tr>
//                 )
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageCircle, Loader2 } from "lucide-react"
import { useGetOrder, useProfileQuery, useSendAmmount } from "@/hooks/ApiClling"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ServiceProviderOrderList() {
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
  const [payLoading, setPayLoading] = useState<{ [key: string]: boolean }>({})
  const [msgLoading, setMsgLoading] = useState<{ [key: string]: boolean }>({})

  const { data: session } = useSession()
  const token = session?.accessToken || ""
  const router = useRouter()

  const { data, isLoading, error } = useGetOrder(token)
  const sendAmmount = useSendAmmount(token)
  const getUser = useProfileQuery(token)

  const handleChange = (id: string, value: string) => {
    setAmounts(prev => ({ ...prev, [id]: value }))
  }

  const handlePay = (id: string) => {
    const stripeAccountId = getUser.data?.data?.stripeAccountId
    if (!stripeAccountId) {
      toast.error("Please connect your Stripe account first")
      return
    }

    setPayLoading(prev => ({ ...prev, [id]: true }))

    sendAmmount.mutate(
      { id, amount: Number(amounts[id] || 0) },
      {
        onSettled: () => setPayLoading(prev => ({ ...prev, [id]: false })),
        onSuccess: () => toast.success("Payment request sent!"),
        onError: () => toast.error("Failed to send payment"),
      }
    )
  }

  // Only fetch() – no axios
  const handleMessageClick = async (receiverId: string) => {
    if (!receiverId) {
      toast.error("Customer not found")
      return
    }

    setMsgLoading(prev => ({ ...prev, [receiverId]: true }))

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create conversation")
      }

      toast.success("Chat opened!")
      router.push("/contractor/message") // Redirect after success

    } catch (err: any) {
      toast.error(err.message || "Could not start chat")
    } finally {
      setMsgLoading(prev => ({ ...prev, [receiverId]: false }))
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-sm text-gray-500 mb-4">Dashboard &gt; Service Provider Order Lists</div>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Pest Problem</th>
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="py-3 px-4"><Skeleton className="h-4 w-40" /></td>
                  <td className="py-3 px-4"><Skeleton className="h-4 w-28" /></td>
                  <td className="py-3 px-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="py-3 px-4 flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-28" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Failed to load orders.</div>
  }

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">
        Dashboard &gt; Service Provider Order Lists
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 border-b">Type of Pest Problem</th>
              <th className="text-left py-3 px-4 border-b">Property Address</th>
              <th className="text-left py-3 px-4 border-b">Customer</th>
              <th className="text-left py-3 px-4 border-b">Date & Time</th>
              <th className="text-left py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.exterminations.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              data?.data.exterminations.map((order) => {
                const isPaid = order.charges?.some(c => c.isPayment && c.status === "approved")
                const paidAmount = order.charges?.find(c => c.isPayment)?.amount || ""

                return (
                  <tr key={order._id} className={`border-b ${isPaid ? "bg-gray-50" : ""}`}>
                    <td className="py-3 px-4">{order.typeOfPestProblem.join(", ")}</td>
                    <td className="py-3 px-4">{order.propertyAddress}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="font-medium">{order.fullName}</div>
                        <div className="text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(order.preferredServiceDate).toLocaleDateString()}
                      <br />
                      <span className="text-gray-500">
                        {new Date(order.preferredServiceDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {/* Payment */}
                        <div className="flex items-center gap-2">
                          <Input
                            disabled={isPaid}
                            type="number"
                            placeholder="$0"
                            value={amounts[order._id] ?? paidAmount}
                            onChange={(e) => handleChange(order._id, e.target.value)}
                            className="w-24 h-9 text-center"
                          />
                          <Button
                            size="sm"
                            disabled={payLoading[order._id] || isPaid}
                            onClick={() => handlePay(order._id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {payLoading[order._id] ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
                          </Button>
                        </div>

                        {/* Message Button – using only fetch */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessageClick(order.user)}
                          disabled={msgLoading[order.user]}
                          className="flex items-center gap-2 border-blue-400 text-blue-600 hover:bg-blue-50"
                        >
                          {msgLoading[order.user] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <MessageCircle className="w-4 h-4" />
                              Message
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

