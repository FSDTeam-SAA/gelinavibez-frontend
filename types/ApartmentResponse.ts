export interface IApartment {
  _id: string;
  title: string;
  description: string;
  aboutListing: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  amenities: string[];
  images: string[];
  videos: string[];
  action: string;
  status: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  availableFrom: {
    month: string;
    time: string; // ISO date string
  };
}

export interface IApartmentMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApartmentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: IApartmentMeta;
  data: IApartment[];
}

export interface IProperty {
  title: string;
  price: string;
  month: string; // You could change to Date if needed
  time: string;
  beds: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  washrooms: string;
  squarefeets: string;
  description: string;
  about: string;
  day: string;
  thumbnails: File[]; // Adjust based on upload structure
  videos: File[];     // same here
}




export interface ISingleApartmentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IApartment;
}

export interface IApartment {
  _id: string;
  title: string;
  description: string;
  aboutListing: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  amenities: string[];
  images: string[];
  videos: string[];
  day: string;
  action: string;
  status: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  availableFrom: {
    month: string;
    time: string;
  };
}
