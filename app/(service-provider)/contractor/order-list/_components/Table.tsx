


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useState, useMemo } from "react"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Loader2, MessageSquare, Send, Eye,   } from "lucide-react"
// import { toast } from "sonner"
// import { useSendAmmount } from "@/hooks/ApiClling"
// import { useQuery } from "@tanstack/react-query"
// import { getOrder } from "@/lib/order"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// export default function ServiceProviderOrderList() {
//   // -------------------- STATE --------------------
//   const [amounts, setAmounts] = useState<Record<string, string>>({})
//   const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
//   const [msgLoading, setMsgLoading] = useState<Record<string, boolean>>({})

//   // -------------------- HOOKS --------------------
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const token = session?.accessToken ?? ""

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["service"],
//     queryFn: () => getOrder(token),
//     enabled: status === "authenticated" && !!token,
//   })

//   const sendAmmount = useSendAmmount(token)

//   // -------------------- HELPERS --------------------
//   // Based on your JSON, the array is directly in data.data
//   const orders = useMemo(() => data?.data || [], [data])

//   const handlePriceChange = (id: string, value: string) => {
//     setAmounts((prev) => ({ ...prev, [id]: value }))
//   }

//   const handleSendPayment = (id: string) => {
//     const value = amounts[id]
//     if (!value || isNaN(Number(value)) || Number(value) <= 0) {
//       toast.error("Please enter a valid amount")
//       return
//     }

//     setLoadingIds((prev) => ({ ...prev, [id]: true }))

//     sendAmmount.mutate(
//       { id, amount: Number(value) },
//       {
//         onSuccess: () => toast.success("Payment request sent successfully"),
//         onError: (err: any) => toast.error(err?.message || "Failed to send request"),
//         onSettled: () => setLoadingIds((prev) => ({ ...prev, [id]: false })),
//       }
//     )
//   }

//   const handleMessageClick = async (receiverId: string) => {
//     if (!receiverId) return toast.error("User not found")
//     setMsgLoading((prev) => ({ ...prev, [receiverId]: true }))

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ receiverId }),
//       })

//       const result = await res.json()
//       if (!res.ok || !result.success) throw new Error(result.message)

//       toast.success("Opening chat...")
//       router.push("/contractor/message?conversationId=" + result.data._id)
//     } catch (err: any) {
//       toast.error(err?.message || "Could not start chat")
//     } finally {
//       setMsgLoading((prev) => ({ ...prev, [receiverId]: false }))
//     }
//   }

//   // -------------------- RENDER LOGIC --------------------
//   if (status === "loading" || isLoading) {
//     return (
//       <div className="p-8 space-y-4">
//         {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
//       </div>
//     )
//   }

//   if (error) return <div className="p-10 text-center text-red-500 font-medium">Failed to load orders. Please try again.</div>

//   return (
//     <div className="p-4 sm:p-8 w-full mx-auto">
//       <div className="flex flex-col mb-8">
//         <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Assign orders</h1>
//         <p className="text-sm text-gray-500">Dashboard › Service Provider Order Lists</p>
//       </div>

//       <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//         {/* DESKTOP TABLE */}
//         <table className="w-full text-sm text-left hidden lg:table">
//           <thead className="bg-gray-50 border-b text-gray-600 font-medium uppercase tracking-wider">
//             <tr>
//               <th className="px-6 py-4">Project / Company</th>
//               <th className="px-6 py-4">Location</th>
//               <th className="px-6 py-4 text-center">Work Media</th>
//               <th className="px-6 py-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {orders.length === 0 ? (
//               <tr><td colSpan={4} className="py-20 text-center text-gray-400">No projects found</td></tr>
//             ) : (
//               orders.map((order: any) => (
//                 <tr key={order._id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="font-semibold text-gray-900">{order.companyName}</div>
//                     <div className="text-xs text-emerald-600 font-medium">{order.serviceCategory?.join(", ")}</div>
//                   </td>
//                   <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
//                     {order.CompanyAddress || order.serviceAreas}
//                   </td>
                  
//                   {/* MEDIA BUTTON */}
//                   <td className="px-6 py-4 text-center">
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm" className="h-8 gap-2">
//                           <Eye className="w-3.5 h-3.5" /> View Media
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white">
//                         <DialogHeader>
//                           <DialogTitle>Project Files - {order.companyName}</DialogTitle>
//                         </DialogHeader>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                           {order.images?.map((url: string, i: number) => (
//                             <img key={i} src={url} alt="work" className="rounded-lg w-full h-56 object-cover border" />
//                           ))}
//                           {order.videos?.map((url: string, i: number) => (
//                             <video key={i} controls className="rounded-lg w-full h-56 bg-black border">
//                               <source src={url} type="video/mp4" />
//                             </video>
//                           ))}
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </td>

//                   <td className="px-6 py-4">
//                     <div className="flex justify-end items-center gap-3">
//                       <div className="flex items-center bg-gray-50 border rounded-md px-2 focus-within:ring-1 focus-within:ring-emerald-500">
//                         <span className="text-gray-400 font-medium">$</span>
//                         <input
//                           type="number"
//                           placeholder="Price"
//                           className="bg-transparent border-none focus:ring-0 w-20 py-1.5 text-sm"
//                           value={amounts[order._id] ?? order.charges ?? ""}
//                           onChange={(e) => handlePriceChange(order._id, e.target.value)}
//                         />
//                       </div>
                      
//                       <Button 
//                         size="sm" 
//                         onClick={() => handleSendPayment(order._id)}
//                         disabled={loadingIds[order._id]}
//                         className="bg-emerald-600 hover:bg-emerald-700 h-9 px-4"
//                       >
//                         {loadingIds[order._id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-1.5" />}
//                         Set Price
//                       </Button>

//                       <Button 
//                         size="icon" 
//                         variant="outline" 
//                         className="h-9 w-9 text-gray-600"
//                         onClick={() => handleMessageClick(order.user)}
//                         disabled={msgLoading[order.user]}
//                       >
//                         {msgLoading[order.user] ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {/* MOBILE VIEW (CARD STYLE) */}
//         <div className="lg:hidden divide-y divide-gray-100">
//           {orders.map((order: any) => (
//             <div key={order._id} className="p-4 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-bold text-gray-900">{order.companyName}</h3>
//                   <p className="text-xs text-gray-500">{order.CompanyAddress}</p>
//                 </div>
//                 <Button 
//                   size="icon" 
//                   variant="ghost" 
//                   className="text-emerald-600"
//                   onClick={() => handleMessageClick(order.user)}
//                 >
//                   <MessageSquare className="w-5 h-5" />
//                 </Button>
//               </div>

//               <div className="flex gap-2">
//                  <Input 
//                    type="number" 
//                    placeholder="Amount" 
//                    value={amounts[order._id] ?? order.charges ?? ""}
//                    onChange={(e) => handlePriceChange(order._id, e.target.value)}
//                  />
//                  <Button onClick={() => handleSendPayment(order._id)} className="bg-emerald-600">
//                    {loadingIds[order._id] ? <Loader2 className="animate-spin" /> : "Set Price"}
//                  </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }










/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, MessageSquare, Send, Eye } from "lucide-react"
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

// ── API Function to update charge/price ───────────────────────────────
async function updateContractorCharge(
  token: string,
  orderId: string,
  amount: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/charges/${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Failed to update price")
  }

  return data
}

export default function ServiceProviderOrderList() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const token = session?.accessToken ?? ""

  const [amounts, setAmounts] = useState<Record<string, string>>({})
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
  const [msgLoading, setMsgLoading] = useState<Record<string, boolean>>({})

  // Fetch my assigned orders
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-assigned-orders"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/my-assign-contractor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!res.ok) throw new Error("Failed to load assigned orders")
      return res.json()
    },
    enabled: status === "authenticated" && !!token,
  })

  const orders = data?.data || []

  // Mutation for setting/updating price
  const setPriceMutation = useMutation({
    mutationFn: ({ orderId, amount }: { orderId: string; amount: number }) =>
      updateContractorCharge(token, orderId, amount),

    onMutate: ({ orderId }) => {
      setLoadingIds((prev) => ({ ...prev, [orderId]: true }))
    },

    onSuccess: (_, { orderId }) => {
      toast.success("Price updated successfully!")
      setAmounts((prev) => {
        const newAmounts = { ...prev }
        delete newAmounts[orderId]
        return newAmounts
      })
      queryClient.invalidateQueries({ queryKey: ["my-assigned-orders"] })
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to update price")
    },

    onSettled: (_, __, { orderId }) => {
      setLoadingIds((prev) => ({ ...prev, [orderId]: false }))
    },
  })

  const handleMessageClick = async (receiverId?: string) => {
    if (!receiverId) return toast.error("User not found")

    setMsgLoading((prev) => ({ ...prev, [receiverId]: true }))

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId }),
      })

      const result = await res.json()
      if (!res.ok || !result.success) throw new Error(result.message || "Failed")

      toast.success("Opening chat...")
      router.push(`/contractor/message?conversationId=${result.data._id}`)
    } catch (err: any) {
      toast.error(err?.message || "Could not start chat")
    } finally {
      setMsgLoading((prev) => ({ ...prev, [receiverId]: false }))
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        Failed to load orders. Please try again later.
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Assigned Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Dashboard › Service Provider Order Lists
        </p>
      </div>

      {/* DESKTOP VIEW - Table */}
      <div className="hidden lg:block bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b text-gray-600 font-medium uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Project / Company</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-center">Work Media</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-20 text-center text-gray-400">
                  No assigned orders yet
                </td>
              </tr>
            ) : (
              orders.map((order: any) => {
                const userId = order.user?._id || order.user
                const hasPriceSet = order.charges !== undefined && order.charges !== null

                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {order.companyName || "Unnamed Project"}
                      </div>
                      <div className="text-xs text-emerald-600 font-medium mt-0.5">
                        {order.serviceCategory?.join(", ") || "—"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">
                      {order.CompanyAddress || order.serviceAreas || "—"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      {(order.images?.length > 0 || order.videos?.length > 0) ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                              <Eye className="w-3.5 h-3.5" /> View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Project Files - {order.companyName}</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                              {order.images?.map((url: string, i: number) => (
                                <Image
                                  key={i}
                                  src={url}
                                  width={1000}
                                  height={800}
                                  alt={`Project image ${i + 1}`}
                                  className="rounded-lg w-full h-56 object-cover border"
                                />
                              ))}
                              {order.videos?.map((url: string, i: number) => (
                                <video
                                  key={i}
                                  controls
                                  className="rounded-lg w-full h-56 bg-black border"
                                >
                                  <source src={url} type="video/mp4" />
                                </video>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="text-gray-400 text-xs">No media</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-3">
                        <div className="flex items-center bg-gray-50 border rounded-md px-2 focus-within:ring-1 focus-within:ring-emerald-500">
                          <span className="text-gray-400 font-medium">$</span>
                          <Input
                            type="number"
                            placeholder={hasPriceSet ? order.charges.toString() : "Price"}
                            className="bg-transparent border-none focus:ring-0 w-20 py-1 text-sm"
                            value={amounts[order._id] ?? (hasPriceSet ? order.charges : "")}
                            onChange={(e) =>
                              setAmounts((prev) => ({
                                ...prev,
                                [order._id]: e.target.value,
                              }))
                            }
                            disabled={loadingIds[order._id]}
                          />
                        </div>

                        <Button
                          size="sm"
                          onClick={() => {
                            const value = Number(amounts[order._id])
                            if (!amounts[order._id] || isNaN(value) || value <= 0) {
                              toast.error("Please enter a valid amount")
                              return
                            }
                            setPriceMutation.mutate({
                              orderId: order._id,
                              amount: value,
                            })
                          }}
                          disabled={loadingIds[order._id] || !amounts[order._id]}
                          className="bg-emerald-600 hover:bg-emerald-700 h-9 px-4"
                        >
                          {loadingIds[order._id] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-1.5" />
                              Set Price
                            </>
                          )}
                        </Button>

                        <Button
                          size="icon"
                          variant="outline"
                          className="h-9 w-9"
                          onClick={() => handleMessageClick(userId)}
                          disabled={msgLoading[userId] || !userId}
                        >
                          {msgLoading[userId] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <MessageSquare className="w-4 h-4" />
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

      {/* MOBILE VIEW - Cards */}
      <div className="lg:hidden space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No assigned orders yet
          </div>
        ) : (
          orders.map((order: any) => {
            const userId = order.user?._id || order.user
            const hasPriceSet = order.charges !== undefined && order.charges !== null

            return (
              <div
                key={order._id}
                className="bg-white border rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {order.companyName || "Unnamed Project"}
                    </h3>
                    <p className="text-sm text-emerald-600">
                      {order.serviceCategory?.join(", ") || "—"}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9"
                    onClick={() => handleMessageClick(userId)}
                    disabled={msgLoading[userId] || !userId}
                  >
                    {msgLoading[userId] ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  {order.CompanyAddress || order.serviceAreas || "—"}
                </div>

                {(order.images?.length > 0 || order.videos?.length > 0) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Eye className="w-4 h-4" /> View Project Media
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Project Files - {order.companyName}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {order.images?.map((url: string, i: number) => (
                          <Image
                            key={i}
                            src={url}
                            alt={`Project image ${i + 1}`}
                            width={1000}
                            height={1000}
                            className="rounded-lg w-full h-56 object-cover border"
                          />
                        ))}
                        {order.videos?.map((url: string, i: number) => (
                          <video
                            key={i}
                            controls
                            className="rounded-lg w-full h-56 bg-black border"
                          >
                            <source src={url} type="video/mp4" />
                          </video>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center bg-gray-50 border rounded-md px-3 focus-within:ring-1 focus-within:ring-emerald-500">
                    <span className="text-gray-400 font-medium">$</span>
                    <Input
                      type="number"
                      placeholder={hasPriceSet ? order.charges.toString() : "Price"}
                      className="bg-transparent border-none focus:ring-0 flex-1 py-2 text-sm"
                      value={amounts[order._id] ?? (hasPriceSet ? order.charges : "")}
                      onChange={(e) =>
                        setAmounts((prev) => ({
                          ...prev,
                          [order._id]: e.target.value,
                        }))
                      }
                      disabled={loadingIds[order._id]}
                    />
                  </div>

                  <Button
                    onClick={() => {
                      const value = Number(amounts[order._id])
                      if (!amounts[order._id] || isNaN(value) || value <= 0) {
                        toast.error("Please enter a valid amount")
                        return
                      }
                      setPriceMutation.mutate({
                        orderId: order._id,
                        amount: value,
                      })
                    }}
                    disabled={loadingIds[order._id] || !amounts[order._id]}
                    className="bg-emerald-600 hover:bg-emerald-700 flex-1 h-11"
                  >
                    {loadingIds[order._id] ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Set Price
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}