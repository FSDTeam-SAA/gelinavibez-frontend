'use client'

import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2, Check } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Plan {
  _id: string
  name: string
  type: string
  price: number
  features: string
  status: string
}

// Matching your specific API response structure
interface PaymentResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    url: string
    sessionId: string
  }
}

const SubscribePlan = () => {
  const { data: session, status } = useSession()
  const token = session?.accessToken as string | undefined

  /* -------------------- Fetch Plans -------------------- */
  const {
    data: plansData,
    isLoading: plansLoading,
    error,
  } = useQuery({
    queryKey: ['subscribePlans'],
    enabled: !!token, // Only fetch if we have a token
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribeplan/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error('Failed to fetch plans')
      return res.json()
    },
  })

  /* -------------------- Payment Mutation -------------------- */
  const paymentMutation = useMutation({
    mutationFn: async (planId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribeplan/pay/${planId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await res.json()
      
      if (!res.ok || !result.success) {
        throw new Error(result?.message || 'Payment initiation failed')
      }
      
      return result as PaymentResponse
    },
    onSuccess: (response) => {
      // Redirecting to the Stripe URL from your API response
      if (response?.data?.url) {
        window.location.href = response.data.url
      }
    },
    onError: (err) => {
      console.error('Payment Error:', err.message)
      alert(`Error: ${err.message}`)
    },
  })

  const plans: Plan[] = plansData?.data?.data || []

  /* -------------------- Loading & Error States -------------------- */
  if (status === 'loading' || plansLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F3D61]" />
      </div>
    )
  }

  if (status !== 'authenticated' || error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="bg-[#0F3D61] text-white p-6">
          {error ? 'Error loading plans. Please try again later.' : 'Please login to view plans.'}
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground mt-2">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            // Check if this specific plan is the one being clicked
            const isProcessing = 
              paymentMutation.isPending && 
              paymentMutation.variables === plan._id

            return (
              <Card key={plan._id} className="flex flex-col bg-[#0F3D61] text-white border-none">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-white/80 capitalize">
                    {plan.type} billing
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-6 flex-1">
                  <div>
                    <div className="text-4xl font-bold">
                      ${(plan.price / 100).toFixed(2)}
                    </div>
                    <p className="text-white/70 text-sm">per {plan.type}</p>
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold mb-3">Features</p>
                    <ul className="space-y-2">
                      {plan.features.split(',').map((f, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <Check className="h-4 w-4 text-[#EFDACB] shrink-0" />
                          {f.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    size="lg"
                    disabled={paymentMutation.isPending}
                    onClick={() => paymentMutation.mutate(plan._id)}
                    className="w-full bg-[#EFDACB] text-[#0F3D61] hover:bg-[#e6cfbb] font-semibold rounded-[8px] h-[48px]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      'Subscribe Now'
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SubscribePlan