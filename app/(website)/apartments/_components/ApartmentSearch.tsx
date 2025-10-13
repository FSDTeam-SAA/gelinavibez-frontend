"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, ChevronDown } from "lucide-react"

const searchSuggestions = [
  "Search Suggestion here",
  "Search Suggestion here",
  "Search Suggestion here",
  "Search Suggestion here",
  "Search Suggestion here",
  "Search Suggestion here",
]

export function ApartmentSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [location, setLocation] = useState("Location")
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="w-full  mx-auto" ref={searchRef}>
      <div className="bg-[#0F3D61] py-2 px-4 sm:px-6 rounded-[8px]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Location Dropdown */}
          <div className="relative w-full sm:w-48">
            <Button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center justify-between gap-2 px-4 h-12 sm:h-14 w-full bg-[#0F3D61] hover:bg-[#0F3D61]/80 text-[#EFDACB] border border-[#EFDACB]/50 sm:border-none"
              aria-label="Select location"
              aria-expanded={showLocationDropdown}
            >
              <MapPin className="w-5 h-5 text-[#EFDACB]" />
              <span className="text-sm font-medium truncate">{location}</span>
              <ChevronDown className="w-4 h-4 ml-auto text-[#EFDACB]" />
            </Button>

            {showLocationDropdown && (
              <div
                className="
                  absolute top-full left-0 mt-2
                  w-full min-w-[150px] max-w-[200px] sm:w-48
                  bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]
                "
                role="listbox"
              >
                {["New York", "Los Angeles", "Chicago"].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city)
                      setShowLocationDropdown(false)
                    }}
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

          {/* Search Input */}
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Find your suitable apartment..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="h-12 sm:h-14 w-full  lg:w-[1100px] bg-[#AFB3B0] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-poppins placeholder:text-[#0F3D61] text-[#0F3D61] rounded"
            />
          </div>

          {/* Search Button */}
          <Button className="h-12 sm:h-14 w-full sm:w-auto px-6 sm:px-8 bg-[#EFDACB] hover:bg-[#EFDACB]/90 text-[#0F3D61] rounded">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-64 overflow-y-auto">
          {searchSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchQuery(suggestion)
                setShowSuggestions(false)
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}