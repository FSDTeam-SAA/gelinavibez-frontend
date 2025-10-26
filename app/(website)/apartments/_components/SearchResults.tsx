// "use client";
import { useQuery } from "@tanstack/react-query";
import { PropertyCard } from "@/components/card/PropertyCard";


type SearchResultsProps = {
  query: string;
};

interface Apartment {
  _id: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  street: string;
  city: string;
  state: string;
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
  availableFrom: {
    month: string;
    time: string;
  }
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search-apartments", query],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/group-by-day?searchTerm=${query}&status=approve`
      );
      if (!res.ok) throw new Error("Failed to fetch search results");
      return res.json();
    },
  });

  // Flatten apartments array
  // eslint-disable-next-line
  const apartments = data?.data?.data?.flatMap((group: any) => group.apartments) || [];

  if (isLoading)
    return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">Failed to load data</p>;
  if (!apartments.length)
    return <p className="text-center py-10 text-gray-500">No results found</p>;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-[#0F3D61] text-3xl lg:text-[40px] font-normal mb-8 text-center">
          Search Results 
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apt: Apartment) => (
            <PropertyCard
              key={apt._id}
              id={apt._id}
              image={apt.images?.[0]}
              title={apt.title}
              address={`${apt.address?.city || ""}, ${apt.address?.state || ""}`}
              price={`Price: $${apt.price}/m`}
              date={apt.availableFrom?.month || ""}
              time={
                apt.availableFrom?.time
                  ? new Date(apt.availableFrom.time).toLocaleTimeString()
                  : ""
              }
              beds={apt.bedrooms}
              baths={apt.bathrooms}
              sqft={`${apt.squareFeet} ft`}
              description={apt.description}
              type="Available"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
