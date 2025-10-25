// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addService(token: string, payload: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      fullName: payload.fullName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      propertyAddress: payload.propertyAddress,
      typeOfProperty: payload.typeOfProperty,
      preferredContactMethod: payload.preferredContactMethod,

      typeOfPestProblem: payload.typeOfPestProblem,
      locationOfProblem: payload.locationOfProblem,
      durationOfIssue: payload.durationOfIssue,

      previousExterminationService: payload.exterminationService,
      previousExterminationDate: payload.previousExterminationDate,

      preferredServiceDate: payload.preferredServiceDate,
      preferredTime: payload.preferredTime,
      buildingAccessRequired: payload.building,
      contactInfo: payload.contactInfo,

      signature: payload.signature,
      date: payload.date,

    }),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update profile");
  return resData;
}
