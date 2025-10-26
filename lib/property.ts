import { IApartmentResponse, IProperty, ISingleApartmentResponse } from "@/types/ApartmentResponse"

export async function getProperty(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/my-apartments`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData: IApartmentResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get property")
  }
  return resData
}

export async function addProperty(token: string, payload: IProperty) {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("aboutListing", payload.about);
  formData.append("price", payload.price);
  formData.append("bedrooms", payload.beds);
  formData.append("bathrooms", payload.washrooms);
  formData.append("squareFeet", payload.squarefeets);
  formData.append("address[state]", payload.address);
  formData.append("day", payload.day);
  formData.append("availableFrom[month]", payload.month);
  formData.append("availableFrom[time]", new Date(payload.time).toISOString());
  if (payload.thumbnails) {
    for (let i = 0; i < payload.thumbnails.length; i++) {
      formData.append("images", payload.thumbnails[i]);
    }
  }
  if (payload.videos) {
    for (let i = 0; i < payload.videos.length; i++) {
      formData.append("videos", payload.videos[i]);
    }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment`, {
    method: "POST",
    headers: {

      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to add property");
  return resData;
}

export async function getSingelProperty(token: string, id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/my-apartments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData: ISingleApartmentResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get property")
  }
  return resData
}

export async function editProperty(token: string, payload: IProperty, id: string) {

  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("aboutListing", payload.about);
  formData.append("price", payload.price);
  formData.append("bedrooms", payload.beds);
  formData.append("bathrooms", payload.washrooms);
  formData.append("squareFeet", payload.squarefeets);
  formData.append("address[state]", payload.address);
  formData.append("day", payload.day);
  formData.append("availableFrom[month]", payload.month);
  formData.append("availableFrom[time]", new Date(payload.time).toISOString());
  if (payload.thumbnails) {
    for (let i = 0; i < payload.thumbnails.length; i++) {
      formData.append("images", payload.thumbnails[i]);
    }
  }
  if (payload.videos) {
    for (let i = 0; i < payload.videos.length; i++) {
      formData.append("videos", payload.videos[i]);
    }
  }
  console.log(formData)

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/my-apartments/${id}`, {
    method: "PUT",
    headers: {

      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to add property");
  return resData;
}