"use client";

import { PropertyCard } from "@/components/card/PropertyCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
// import { Skeleton } from "@/components/ui/skeleton";

// API Response Types
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

interface Apartment {
  _id: string;
  title: string;
  description: string;
  address: Address;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  availableFrom: AvailableFrom;
  createdAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: Apartment[];
  };
}

const fetchApprovedApartments = async (): Promise<Apartment[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/?status=approve`);
  if (!res.ok) throw new Error("Failed to fetch apartments");
  const json: ApiResponse = await res.json();
  return json.data.data;
};

export function YouMayLike() {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["approved-apartments"],
    queryFn: fetchApprovedApartments,
  });

  // Format address
  const formatAddress = (addr: Address) => {
    return `${addr.street}, ${addr.city}${addr.state ? `, ${addr.state}` : ""}`;
  };

  // Format price
  const formatPrice = (price: number) => {
    return `Price: $${price.toLocaleString()}/m`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <section className="bg-[#e8e8e8] py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center text-red-600">
          Failed to load properties. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#e8e8e8] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">
              Also You may like
            </h1>
            <p className="text-[#616161] text-base lg:text-lg">
              Step into a world of curated elegance — exclusive properties
              crafted for the most discerning lifestyles.
            </p>
          </div>
          <Link
            href="/apartments"
            className="hidden lg:flex items-center gap-2 text-[#1a4d6d] hover:text-[#0f3a52] font-semibold"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Carousel with 3 cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((e ) => (
              // <Skeleton key={i} className="h-96 rounded-xl" />
              <p key={e}>loding.....</p>
            ))}
          </div>
        ) : properties && properties.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {properties.map((property) => {
                const firstImage = property.images[0] || "/placeholder.jpg";
                const availableDate = property.availableFrom?.time || property.createdAt;

                return (
                  <CarouselItem
                    key={property._id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <PropertyCard
                      id={property._id}
                      image={firstImage}
                      title={property.title}
                      address={formatAddress(property.address)}
                      price={formatPrice(property.price)}
                      date={formatDate(availableDate)}
                      time={formatTime(availableDate)}
                      type="Multiple Time"
                      beds={property.bedrooms}
                      baths={property.bathrooms}
                      sqft={`${property.squareFeet}ft`}
                      description={property.description}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex -left-12" />
            <CarouselNext className="hidden lg:flex -right-12" />
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">No properties available.</p>
        )}

        {/* Mobile View All Link */}
        <div className="lg:hidden mt-8 text-center">
          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 text-[#1a4d6d] hover:text-[#0f3a52] font-semibold"
          >
            View All
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}