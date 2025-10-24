"use client";

import { useQuery } from "@tanstack/react-query";
import { PropertyCard } from "@/components/card/PropertyCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchApartmentsByDay } from "@/lib/fetchApartmentsByDay ";

/* -------------------------------------------------Skeleton card – looks exactly like PropertyCard------------------------------------------------- */
function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Image placeholder */}
      <div className="mb-4 h-48 w-full bg-gray-200 rounded-md" />

      {/* Title */}
      <div className="mb-2 h-6 w-3/4 bg-gray-200 rounded" />

      {/* Address */}
      <div className="mb-2 h-5 w-5/6 bg-gray-200 rounded" />

      {/* Price + date/time */}
      <div className="mb-3 flex gap-4">
        <div className="h-5 w-20 bg-gray-200 rounded" />
        <div className="h-5 w-24 bg-gray-200 rounded" />
      </div>

      {/* Beds / Baths / Sqft */}
      <div className="mb-4 flex gap-3 text-sm">
        <div className="h-5 w-12 bg-gray-200 rounded" />
        <div className="h-5 w-12 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-11/12 bg-gray-200 rounded" />
        <div className="h-4 w-10/12 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

/* -------------------------------------------------Main component------------------------------------------------- */
export function Sunday() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["apartments-by-day"],
    queryFn: fetchApartmentsByDay,
  });

  /* ---------- Loading state ---------- */
  if (isLoading) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">
              Sunday
            </h1>
          </div>

          {/* 3-column skeleton grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>

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

  /* ---------- Error state ---------- */
  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load data.
      </p>
    );
  }

  const sundayData = data?.find((d) => d._id === "sunday");
   if (!sundayData) return (
    <p className="text-center py-14 text-red-500 text-xl">
       <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">
            Sunday
          </h1>
      No apartments available.
    </p>
  );

  /* ---------- Success ---------- */
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-4">
            Sunday
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sundayData.apartments.map((apt) => (
            <PropertyCard
              key={apt._id}
              id={apt._id}
              image={apt.images?.[0]}
              title={apt.title}
              address={`${apt.address.city}, ${apt.address.state}`}
              price={`Price: $${apt.price}/m`}
              date={apt.availableFrom?.month || ""}
              time={new Date(apt.availableFrom?.time).toLocaleTimeString()}
              beds={apt.bedrooms}
              baths={apt.bathrooms}
              sqft={`${apt.squareFeet} ft`}
              description={apt.description}
              type="Available"
            />
          ))}
        </div>

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