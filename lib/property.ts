import { IApartmentResponse, IProperty, ISingleApartmentResponse } from "@/types/ApartmentResponse"
import { TenantApplicationResponse, } from "@/types/AppliedTable."

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
  formData.append("address[city]", payload.city)
  formData.append("address[state]", payload.state)
  formData.append("address[zipCode]", payload.zip)
  formData.append("address[street]", payload.street)
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
console.log(payload.time)
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("aboutListing", payload.about);
  formData.append("price", payload.price);
  formData.append("bedrooms", payload.beds);
  formData.append("bathrooms", payload.washrooms);
  formData.append("squareFeet", payload.squarefeets);
  formData.append("address[city]", payload.city)
  formData.append("address[state]", payload.state)
  formData.append("address[zipCode]", payload.zip)
  formData.append("address[street]", payload.street)
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

export async function deleteProperty(token: string, id: string) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/my-apartments/${id}`, {
    method: "DELETE",
    headers: {

      Authorization: `Bearer ${token}`,
    },

  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to add property");
  return resData;
}

export async function getMyProperties(token: string, currentPage: number, itemsPerPage: number): Promise<TenantApplicationResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tenant/my?page=${currentPage}&limit=${itemsPerPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData: TenantApplicationResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get property")
  }
  return resData
}