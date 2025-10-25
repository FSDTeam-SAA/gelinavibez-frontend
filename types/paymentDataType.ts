export interface PaymentApiResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: Payment[]
}

export interface Payment {
  _id: string
  tenantId: string
  tenantName: string
  tenantEmail: string
  amount: number
  status: "pending" | "approved" | "rejected"
  user: {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    profileImage: string
  }
  contractor?: string
  extermination?: string
  apartmentName?: string
  typeOfProblem?: string
  chargeId?: string
  createdAt: string
  updatedAt: string
  paymentDate?: string
  stripeSessionId?: string
  stripePaymentIntentId?: string
  __v: number
}
