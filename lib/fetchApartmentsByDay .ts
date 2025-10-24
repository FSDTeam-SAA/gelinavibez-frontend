import { ApartmentResponse } from "@/types/ApartmentResponse ";


export const fetchApartmentsByDay = async (): Promise<ApartmentResponse["data"]["data"]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/group-by-day?status=approve`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch apartments");
  }

  const json = await res.json();
  return json.data.data; 
};
