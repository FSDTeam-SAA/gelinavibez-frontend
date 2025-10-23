"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PropertyCard } from "../card/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/PropertyTypes";
import { PropertyCardSkeleton } from "../card/PropertyCardSkeleton";

// Function to fetch properties from the API
const fetchProperties = async (): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/?status=approve`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
};

export function ListingsSection() {
  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  // Map API data to PropertyCard props
  const properties = data?.data.data.map((property) => ({
    image: property.images[0] || "/assets/placeholder.jpg",
    title: property.title,
    address: `${property.address.street}, ${property.address.city}`,
    price: `Price: $${property.price.toLocaleString()}/m`,
    date: new Date(property.availableFrom.time).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: new Date(property.availableFrom.time).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    }),
    type: "Multiple Time",
    beds: property.bedrooms,
    baths: property.bathrooms,
    sqft: `${property.squareFeet.toLocaleString()}ft`,
    description: property.description,
    id: property._id,
  })) || [];

  return (
    <section className="bg-[#e8e8e8] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">
              Latest Listings
            </h1>
            <p className="text-[#616161] text-base lg:text-lg">
              Step into a world of curated elegance — exclusive properties crafted
              for the most discerning lifestyles.
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

        {/* Loading and Error States */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Render 3 skeleton cards to match the number of displayed properties */}
            {[...Array(3)].map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        )}
        {error && <div>Error loading properties: {(error as Error).message}</div>}

        {/* Property Cards Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        )}

        {/* Mobile View All Link */}
        <div className="lg:hidden mt-8 text-center">
          <Link
            href="/listings"
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