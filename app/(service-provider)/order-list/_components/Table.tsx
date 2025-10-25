// "use client"

// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useGetOrder, useSendAmmount } from "@/hooks/ApiClling"
// import { useSession } from "next-auth/react"
// import { Loader2 } from "lucide-react"



// export default function ServiceProviderOrderList() {
//     const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
//     const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({})
//     const { data: session } = useSession();
//     const token = session?.accessToken || "";
//     const { data, isLoading, error } = useGetOrder(token)
//     const sendAmmount = useSendAmmount(token)
     
//     const handleChange = (id: string, value: string) => {
//         setAmounts(prev => ({ ...prev, [id]: value }))
//     }

//     const handlePay = (id: string) => {
//         // mark this button as loading
//         setLoadingIds(prev => ({ ...prev, [id]: true }))

//         sendAmmount.mutate(
//             { id, amount: Number(amounts[id]) },
//             {
//                 onSettled: () => {
//                     // remove loading state when done
//                     setLoadingIds(prev => ({ ...prev, [id]: false }))
//                 }
//             }
//         )
//     }

//     if (isLoading) return <div>Loading orders...</div>
//     if (error) return <div>Error loading orders</div>

//     return (
//         <div className="p-6">
//             <div className="text-sm text-gray-500 mb-4">
//                 Dashboard &gt; Service Provider Order Lists
//             </div>

//             <div className="border border-gray-200 rounded-md overflow-hidden">
//                 <table className="w-full border-collapse text-sm">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="text-left py-3 px-4 border-b">Type of Pest Problem</th>
//                             <th className="text-left py-3 px-4 border-b">Property Address</th>
//                             <th className="text-left py-3 px-4 border-b">Date</th>
//                             <th className="text-left py-3 px-4 border-b w-[200px]">Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data?.data.exterminations.map((order) => (
//                             <tr key={order._id} className="border-b hover:bg-gray-50">
//                                 <td className="py-3 px-4">{order.typeOfPestProblem.join(", ")}</td>
//                                 <td className="py-3 px-4">{order.propertyAddress}</td>
//                                 <td className="py-3 px-4">
//                                     {new Date(order.preferredServiceDate).toLocaleDateString()}{" "}
//                                     <span className="text-gray-500">
//                                         {new Date(order.preferredServiceDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                     </span>
//                                 </td>
//                                 <td className="py-3 px-4 flex items-center gap-2">
//                                     <Input
//                                         disabled={order?.charges[0].isPayment}
//                                         type="number"
//                                         placeholder="$ Amount"
//                                         value={amounts[order._id] || ""}
//                                         onChange={(e) => handleChange(order._id, e.target.value)}
//                                         className="w-[100px] h-[34px] text-center border-gray-300 rounded-md bg-gray-100 text-gray-700"
//                                     />
//                                     <Button
//                                         onClick={() => handlePay(order._id)}
//                                         className="bg-green-100 w-[100px] h-[34px] text-green-600 hover:bg-green-200 rounded-md flex items-center justify-center gap-2"
//                                         disabled={loadingIds[order._id]}
//                                     >
//                                         {loadingIds[order._id] ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }



"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetOrder, useSendAmmount } from "@/hooks/ApiClling"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

export default function ServiceProviderOrderList() {
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
  const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({})
  const { data: session } = useSession()
  const token = session?.accessToken || ""
  const { data, isLoading, error } = useGetOrder(token)
  const sendAmmount = useSendAmmount(token)

  const handleChange = (id: string, value: string) => {
    setAmounts(prev => ({ ...prev, [id]: value }))
  }

  const handlePay = (id: string) => {
    setLoadingIds(prev => ({ ...prev, [id]: true }))

    sendAmmount.mutate(
      { id, amount: Number(amounts[id]) },
      {
        onSettled: () => {
          setLoadingIds(prev => ({ ...prev, [id]: false }))
        },
      }
    )
  }

  if (isLoading) return <div>Loading orders...</div>
  if (error) return <div>Error loading orders</div>

  return (
    <div className="p-6">
      <div className="text-sm text-gray-500 mb-4">
        Dashboard &gt; Service Provider Order Lists
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 border-b">Type of Pest Problem</th>
              <th className="text-left py-3 px-4 border-b">Property Address</th>
              <th className="text-left py-3 px-4 border-b">Date</th>
              <th className="text-left py-3 px-4 border-b w-[200px]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.exterminations.map(order => {
              // Find the latest or first charge that’s marked for payment
              const paidCharge = order.charges?.find(c => c.isPayment)
              const defaultAmount = paidCharge?.amount || order.charges?.[0]?.amount || ""

              return (
                <tr key={order._id} className={`border-b  ${order?.charges[0]?.isPayment ? "bg-gray-300/40" : ""}`}>
                  <td className="py-3 px-4">{order.typeOfPestProblem.join(", ")}</td>
                  <td className="py-3 px-4">{order.propertyAddress}</td>
                  <td className="py-3 px-4">
                    {new Date(order.preferredServiceDate).toLocaleDateString()}{" "}
                    <span className="text-gray-500">
                      {new Date(order.preferredServiceDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className={`py-3 px-4 flex items-center gap-2 `}>
                    <Input
                      disabled={order?.charges[0]?.isPayment}
                      type="number"
                      placeholder="$ amount"
                      value={amounts[order._id] ?? defaultAmount.toString()}
                      onChange={e => handleChange(order._id, e.target.value)}
                      className="w-[100px] h-[34px] text-center border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                    <Button
                      onClick={() => handlePay(order._id)}
                      className="bg-green-100 w-[100px] h-[34px] text-green-600 hover:bg-green-200 rounded-md flex items-center justify-center gap-2"
                      disabled={loadingIds[order._id] || order?.charges[0]?.isPayment}
                    >
                      {loadingIds[order._id] ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
