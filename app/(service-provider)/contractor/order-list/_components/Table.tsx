
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetOrder, useProfileQuery, useSendAmmount } from "@/hooks/ApiClling"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ServiceProviderOrderList() {
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({})
  const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({})
  const { data: session } = useSession()
  const token = session?.accessToken || ""
  const { data, isLoading, error } = useGetOrder(token)
  const sendAmmount = useSendAmmount(token)
  const getUser = useProfileQuery(token)


  const handleChange = (id: string, value: string) => {
    setAmounts(prev => ({ ...prev, [id]: value }))
  }
  
  const handlePay = (id: string) => {
    // Ensure that getUser.data and getUser.data.data are defined
    const stripeAccountId = getUser.data?.data?.stripeAccountId;

    // Check if stripeAccountId is not present or is an empty string
    if (!stripeAccountId) {
      toast.error("Please connect your Stripe account first"); 
      return 
    } else {
     
      setLoadingIds((prev) => ({ ...prev, [id]: true }));

      sendAmmount.mutate(
        { id, amount: Number(amounts[id]) },
        {
          onSettled: () => {
            setLoadingIds((prev) => ({ ...prev, [id]: false }));
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
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
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="py-3 px-4">
                    <Skeleton className="h-4 w-48" />
                  </td>
                  <td className="py-3 px-4 flex flex-col gap-1">
                    <Skeleton className=" w-28" />
                    <Skeleton className=" w-16" />
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <Skeleton className=" w-[100px] rounded-md" />
                    <Skeleton className=" w-[100px] rounded-md" />
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
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load orders. Please try again later.
      </div>
    )
  }

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
            {data?.data.exterminations.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              data?.data.exterminations.map(order => {
                const paidCharge = order.charges?.find(c => c.isPayment)
                const defaultAmount =
                  paidCharge?.amount || order.charges?.[0]?.amount || ""

                return (
                  <tr
                    key={order._id}
                    className={`border-b ${order?.charges[0]?.isPayment ? "bg-gray-300/40" : ""
                      }`}
                  >
                    <td className="py-3 px-4">
                      {order.typeOfPestProblem.join(", ")}
                    </td>
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
                    <td className="py-3 px-4 flex items-center gap-2">
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
                        disabled={
                          loadingIds[order._id] || order?.charges[0]?.isPayment
                        }
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
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
