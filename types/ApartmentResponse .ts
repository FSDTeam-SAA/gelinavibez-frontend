export interface Apartment {
  _id: string;
  title: string;
  description: string;
  aboutListing: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  day: string;
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

export interface DayGroup {
  _id: string; // sunday, monday, etc.
  apartments: Apartment[];
  count: number;
}

export interface ApartmentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: DayGroup[];
  };
}
