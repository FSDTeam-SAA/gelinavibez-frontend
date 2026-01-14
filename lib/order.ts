

export async function getOrder(
    token: string,
    //eslint-disable-next-line 
): Promise<any> { 
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/my-assign-contractor`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    )
    if (!response.ok) {
        throw new Error("Failed to fetch contractor services");
    }

    const resData = await response.json()
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
