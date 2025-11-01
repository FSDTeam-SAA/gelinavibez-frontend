"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface Apartment {
  _id: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}

// Fetch locations from API
async function fetchLocations(): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/locations`
  );
  if (!res.ok) throw new Error("Failed to fetch locations");
  const json = await res.json();
  return json.data ?? [];
}

export function ApartmentSearch() {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("Location");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<Apartment[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch apartments for autocomplete
  useEffect(() => {
    async function fetchApartments() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/group-by-day?status=approve`
        );
        const data = await res.json();
        const allApartments: Apartment[] =
        // eslint-disable-next-line
          data?.data?.data?.flatMap((group: any) => group.apartments) ?? [];
        setSuggestions(allApartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    }
    fetchApartments();
  }, []);

  // Fetch locations using React Query
  const {
    data: locationOptions = [],
    isLoading: locationsLoading,
    error: locationsError,
  } = useQuery({
    queryKey: ["apartment-locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 5,
  });
  console.log(locationOptions, "2145154145154");

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setShowLocationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Common search trigger function
  const triggerSearch = (query?: string, loc?: string) => {
    const params = new URLSearchParams();
    if (query?.trim()) params.append("q", query.trim());
    if (loc && loc !== "Location") params.append("q", loc);
    router.push(
      `/apartments${params.toString() ? `?${params.toString()}` : ""}`
    );
    setHasSearched(true);
  };

  // Filter suggestions for autocomplete
  const filteredSuggestions = suggestions.filter((apartment) => {
    const q = searchQuery.toLowerCase();
    return (
      apartment?.title?.toLowerCase()?.includes(q) ||
      apartment?.address?.city?.toLowerCase()?.includes(q) ||
      apartment?.address?.state?.toLowerCase()?.includes(q) ||
      apartment?.address?.street?.toLowerCase()?.includes(q)
    );
  });

  // Input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSuggestions(val.length > 0);
    if (val.length > 0) setLocation("Location");
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) setShowSuggestions(true);
  };

  // Location select handler — now auto-searches immediately
  const handleLocationSelect = (city: string) => {
    setLocation(city);
    setSearchQuery("");
    setShowLocationDropdown(false);
    triggerSearch("", city);
  };

  // Debounced auto search when typing (optional)
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const delay = setTimeout(() => triggerSearch(searchQuery, location), 800);
      return () => clearTimeout(delay);
    }
  }, [searchQuery, location]);

  // Manual search (button)
  const handleSearch = () => {
    if (!searchQuery.trim() && location === "Location") return;
    triggerSearch(searchQuery, location);
  };

  // Reset Filters button handler
  const handleReset = () => {
    setSearchQuery("");
    setLocation("Location");
    setHasSearched(false);
    router.push("/apartments");
  };
  console.log(location);

  return (
    <div className="w-full mx-auto" ref={searchRef}>
      <div className="bg-[#0F3D61] py-2 px-4 sm:px-6 rounded-[8px]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Location Dropdown */}
          <div className="relative w-full sm:w-48">
            <Button
              onClick={() => setShowLocationDropdown((v) => !v)}
              className="flex items-center justify-between gap-2 px-4 h-12 sm:h-14 w-full bg-[#0F3D61] hover:bg-[#0F3D61]/80 text-[#EFDACB] border border-[#EFDACB]/50 sm:border-none"
              aria-label="Select location"
              aria-expanded={showLocationDropdown}
            >
              <MapPin className="w-5 h-5 text-[#EFDACB]" />
              <span className="text-sm font-medium truncate">
                {locationsLoading ? "Loading…" : location}
              </span>
              <ChevronDown className="w-4 h-4 ml-auto text-[#EFDACB]" />
            </Button>

            {showLocationDropdown && (
              <div
                className="absolute top-full left-0 mt-2 w-full min-w-[150px] max-w-[200px] sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100] max-h-60 overflow-y-auto hide-scrollbar "
                role="listbox"
              >
                {locationsLoading && (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Loading…
                  </div>
                )}
                {locationsError && (
                  <div className="px-4 py-2 text-sm text-red-600">
                    Failed to load
                  </div>
                )}
                {locationOptions.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleLocationSelect(city)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    role="option"
                    aria-selected={location === city}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input + Suggestions */}
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Find your suitable apartment..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="h-12 sm:h-14 w-full lg:w-[1100px] bg-[#AFB3B0] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-poppins placeholder:text-[#0F3D61] text-[#0F3D61] rounded"
            />

            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-64 overflow-y-auto z-[200]">
                {filteredSuggestions.map((apartment) => (
                  <button
                    key={apartment._id}
                    onClick={() => {
                      setSearchQuery(apartment.title);
                      setShowSuggestions(false);
                      triggerSearch(apartment.title, location);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {apartment.title} — {apartment.address.city},{" "}
                    {apartment.address.state}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Button: Search / Reset */}
          {hasSearched ? (
            <Button
              onClick={handleReset}
              className="h-12 sm:h-14 w-full sm:w-auto px-6 sm:px-8 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Reset Filters
            </Button>
          ) : (
            <Button
              onClick={handleSearch}
              className="h-12 sm:h-14 w-full sm:w-auto px-6 sm:px-8 bg-[#EFDACB] hover:bg-[#EFDACB]/90 text-[#0F3D61] rounded flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5 mr-2" /> Search
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

