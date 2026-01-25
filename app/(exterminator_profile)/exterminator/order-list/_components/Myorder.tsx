/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// ── API Functions ───────────────────────────────────────────────

async function updateExterminationCharge(
  token: string,
  serviceId: string,
  amount: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/charges/${serviceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ charges: amount }),
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to update charges")
  }

  return response.json()
}

async function createOrGetConversation(token: string, receiverId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receiverId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to start chat" }))
    throw new Error(err.message || "Failed to start conversation")
  }

  return res.json()
}

async function requestMessagingPermission(token: string, targetId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/messaging-request/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ targetId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to send request" }))
    throw new Error(err.message || "Failed to request messaging permission")
  }

  return res.json()
}

// ── Main Component ──────────────────────────────────────────────

export default function MyAssignedExterminationServices() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const token = session?.accessToken ?? ""

  const [amounts, setAmounts] = useState<Record<string, string>>({})
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
  const [msgLoadingIds, setMsgLoadingIds] = useState<Set<string>>(new Set())

  // Modal states
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null)

  // Fetch assigned extermination services
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-assigned-extermination", token],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/my-assign-extermination`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      )
      if (!res.ok) throw new Error("Failed to load assigned services")
      return res.json()
    },
    enabled: status === "authenticated" && !!token,
  })

  const services = data?.data || []

  // ── Mutations ───────────────────────────────────────────────────

  const setChargeMutation = useMutation({
    mutationFn: ({ serviceId, amount }: { serviceId: string; amount: number }) =>
      updateExterminationCharge(token, serviceId, amount),

    onMutate: ({ serviceId }) => {
      setLoadingIds((prev) => ({ ...prev, [serviceId]: true }))
    },

    onSuccess: () => {
      toast.success("Price updated successfully!")
      setAmounts({})
      queryClient.invalidateQueries({ queryKey: ["my-assigned-extermination"] })
    },

    onError: (err: any) => {
      toast.error(err?.message || "Failed to update price")
    },

    onSettled: (_, __, { serviceId }) => {
      setLoadingIds((prev) => ({ ...prev, [serviceId]: false }))
    },
  })

  const conversationMutation = useMutation({
    mutationFn: ({ receiverId }: { receiverId: string }) =>
      createOrGetConversation(token, receiverId),

    onSuccess: (data) => {
      const conversationId = data?.data?._id || data?.data?.[0]?._id
      if (conversationId) {
        toast.success("Opening chat...")
        router.push(`/exterminator/message?conversationId=${conversationId}`)
      } else {
        toast.error("Conversation created but no ID returned")
      }
    },

    onError: (err: any) => {
      const errorMessage = (err.message || "").toLowerCase()
      if (
        errorMessage.includes("permission not granted") ||
        errorMessage.includes("admin approval") ||
        errorMessage.includes("messaging permission") ||
        errorMessage.includes("not allowed") ||
        errorMessage.includes("requires approval")
      ) {
        setSelectedReceiverId(conversationMutation.variables?.receiverId || null)
        setShowRequestModal(true)
      } else {
        toast.error(err.message || "Failed to open chat")
      }
    },

    onSettled: (_, __, variables) => {
      setMsgLoadingIds((prev) => {
        const next = new Set(prev)
        next.delete(variables.receiverId)
        return next
      })
    },
  })

  const requestPermissionMutation = useMutation({
    mutationFn: ({ targetId }: { targetId: string }) =>
      requestMessagingPermission(token, targetId),

    onSuccess: () => {
      toast.success("Messaging permission request sent successfully!")
      setShowRequestModal(false)
      setSelectedReceiverId(null)
    },

    onError: (err: any) => {
      toast.error(err.message || "Failed to send permission request")
    },
  })

  // ── Handlers ────────────────────────────────────────────────────

  const handleMessageClick = (receiverId?: string) => {
    if (!receiverId) return toast.error("Customer not found")

    setMsgLoadingIds((prev) => {
      const next = new Set(prev)
      next.add(receiverId)
      return next
    })

    conversationMutation.mutate({ receiverId })
  }

  const handleConfirmRequest = () => {
    if (!selectedReceiverId) return
    requestPermissionMutation.mutate({ targetId: selectedReceiverId })
  }

  // ── Render ──────────────────────────────────────────────────────

  if (status === "loading" || isLoading) {
    return (
      <div className="p-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error || !token) {
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        {token ? "Failed to load assigned services. Please try again." : "Please login to continue"}
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 w-full mx-auto">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          My Assigned Extermination Services
        </h1>
        <p className="text-sm text-gray-500">Dashboard › Extermination Services</p>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* ── DESKTOP TABLE ────────────────────────────────────────── */}
        <table className="w-full text-sm text-left hidden lg:table">
          <thead className="bg-gray-50 border-b text-gray-600 font-medium uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Customer / Property</th>
              <th className="px-6 py-4">Pest Problem</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-20 text-center text-gray-400">
                  No assigned services found
                </td>
              </tr>
            ) : (
              services.map((service: any) => {
                const userId = service.user?._id || service.user
                const hasPriceSet = service.charges !== undefined && service.charges !== null

                return (
                  <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{service.fullName}</div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {service.propertyAddress}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {service.typeOfPestProblem?.join(", ") || "—"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {service.locationOfProblem?.join(", ") || "—"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          service.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : service.status === "assigned"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {service.status || "pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-3">
                        <div className="flex items-center bg-gray-50 border rounded-md px-2 focus-within:ring-1 focus-within:ring-emerald-500">
                          <span className="text-gray-400 font-medium">$</span>
                          <Input
                            type="number"
                            placeholder="Price"
                            className="bg-transparent border-none focus:ring-0 w-20 py-1.5 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={amounts[service._id] ?? (hasPriceSet ? service.charges : "")}
                            onChange={(e) =>
                              setAmounts((prev) => ({ ...prev, [service._id]: e.target.value }))
                            }
                            disabled={loadingIds[service._id]}
                          />
                        </div>

                        <Button
                          size="sm"
                          onClick={() => {
                            const value = Number(amounts[service._id])
                            if (!amounts[service._id] || isNaN(value) || value <= 0) {
                              toast.error("Please enter a valid amount")
                              return
                            }
                            setChargeMutation.mutate({
                              serviceId: service._id,
                              amount: value,
                            })
                          }}
                          disabled={loadingIds[service._id] || !amounts[service._id]}
                          className="bg-emerald-600 hover:bg-emerald-700 h-9 px-4"
                        >
                          {loadingIds[service._id] ? (
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
                          disabled={msgLoadingIds.has(userId) || !userId}
                        >
                          {msgLoadingIds.has(userId) ? (
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

        {/* ── MOBILE CARDS ─────────────────────────────────────────── */}
        <div className="lg:hidden divide-y divide-gray-100">
          {services.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No assigned services found
            </div>
          ) : (
            services.map((service: any) => {
              const userId = service.user?._id || service.user
              const hasPriceSet = service.charges !== undefined && service.charges !== null

              return (
                <div key={service._id} className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{service.fullName}</h3>
                      <p className="text-sm text-gray-600">{service.propertyAddress}</p>
                    </div>

                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9"
                      onClick={() => handleMessageClick(userId)}
                      disabled={msgLoadingIds.has(userId) || !userId}
                    >
                      {msgLoadingIds.has(userId) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  <div className="text-sm text-gray-700">
                    <strong>Pest:</strong> {service.typeOfPestProblem?.join(", ") || "—"} <br />
                    <strong>Location:</strong> {service.locationOfProblem?.join(", ") || "—"}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex items-center bg-gray-50 border rounded-md px-3 focus-within:ring-1 focus-within:ring-emerald-500">
                      <span className="text-gray-400 font-medium">$</span>
                      <Input
                        type="number"
                        placeholder={hasPriceSet ? service.charges?.toString() : "Price"}
                        className="bg-transparent border-none focus:ring-0 flex-1 py-2 text-sm"
                        value={amounts[service._id] ?? (hasPriceSet ? service.charges : "")}
                        onChange={(e) =>
                          setAmounts((prev) => ({ ...prev, [service._id]: e.target.value }))
                        }
                        disabled={loadingIds[service._id]}
                      />
                    </div>

                    <Button
                      onClick={() => {
                        const value = Number(amounts[service._id])
                        if (!amounts[service._id] || isNaN(value) || value <= 0) {
                          toast.error("Please enter a valid amount")
                          return
                        }
                        setChargeMutation.mutate({
                          serviceId: service._id,
                          amount: value,
                        })
                      }}
                      disabled={loadingIds[service._id] || !amounts[service._id]}
                      className="bg-emerald-600 hover:bg-emerald-700 flex-1 h-11"
                    >
                      {loadingIds[service._id] ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
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

      {/* ── Request Messaging Permission Modal ─────────────────────── */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Request Messaging Permission</h2>
            <p className="text-gray-600 mb-6">
              You need admin approval to message this customer.  
              Would you like to send a request for messaging permission?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false)
                  setSelectedReceiverId(null)
                }}
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequest}
                disabled={requestPermissionMutation.isPending}
                className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-60 transition flex items-center gap-2"
              >
                {requestPermissionMutation.isPending ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}