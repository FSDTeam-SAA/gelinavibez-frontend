interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AvailableFrom {
  month: string;
  time: string;
}

interface Property {
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
  address: Address;
  availableFrom: AvailableFrom;
}

export interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: Property[];
  };
}