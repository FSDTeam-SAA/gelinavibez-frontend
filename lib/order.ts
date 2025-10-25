import { ContractorFetchResponse } from "@/types/orderDataType"

export async function getOrder(
    token: string,
): Promise<ContractorFetchResponse> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/my-assign-extermination`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
    if (!response.ok) {
        let errorMessage = "Failed to get contractor"
        try {
            const errorData = await response.json()
            errorMessage = errorData.message || errorMessage
        } catch {
        }
        throw new Error(errorMessage)
    }

    const resData: ContractorFetchResponse = await response.json()

    return resData
}

export async function ammountPyload(token: string, payload: { id: string; amount: number }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/charge`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            exterminationId: payload.id,
            amount: payload.amount,
        }),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "send failed");
    return resData;
}
