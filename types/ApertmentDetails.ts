interface MediaItem {
  id: number
  type: "image" | "video"
  src: string
  thumbnail: string
  alt: string
}

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

interface AvailableFrom {
  month: string
  time: string
}

interface Apartment {
  address: Address
  availableFrom: AvailableFrom
  _id: string
  title: string
  description: string
  aboutListing: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFeet: number
  amenities: string[]
  images: string[]
  videos: string[]
  day: string
  action: string
  status: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

interface ApartmentDetailsResponse {
  statusCode: number
  success: boolean
  message: string
  data: Apartment
}