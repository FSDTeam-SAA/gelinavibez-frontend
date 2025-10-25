import { PaymentApiResponse } from "@/types/paymentDataType"

export async function getPayment(
    token: string,
    currentPage: number,
    itemsPerPage: number
): Promise<PaymentApiResponse> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment?page=${currentPage}&limit=${itemsPerPage}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
    if (!response.ok) {
        let errorMessage = "Failed to get payment"
        try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
        } catch {
        }
        throw new Error(errorMessage)
    }

    const resData: PaymentApiResponse = await response.json()
    return resData
}
