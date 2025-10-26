import React from "react"

// components/skeletons/PropertyListingSkeleton.tsx
export function PropertyListingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Section */}
      <div className="container mx-auto px-4 py-10 lg:py-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Thumbnail Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:h-[55px] rounded-[8px] bg-gray-200 animate-pulse border-2 border-border"
                />
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="w-full h-[260px] sm:h-[400px] md:h-[580px] bg-gray-200 animate-pulse rounded-xl" />
            </div>
          </div>

          {/* Right Details Panel */}
          <div className="lg:col-span-5 order-3 space-y-6">
            {/* Title */}
            <div className="h-10 w-4/5 bg-gray-200 rounded animate-pulse" />

            {/* Location & Info */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* About Listing */}
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-baseline gap-2">
                <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Video Gallery */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="rounded-xl overflow-hidden shadow-lg mb-6">
          <div className="h-[220px] sm:h-[320px] md:h-[420px] lg:h-[483px] bg-gray-200 animate-pulse" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden">
              <div className="w-full h-[120px] sm:h-[140px] md:h-[157px] bg-gray-200 animate-pulse rounded-[8px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/70 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Default export (optional, but safe)
export default PropertyListingSkeleton