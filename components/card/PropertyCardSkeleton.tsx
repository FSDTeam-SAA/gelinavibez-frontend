"use client";

import { Bed, Bath, Square, ArrowRight } from "lucide-react";

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-[12px] overflow-hidden shadow-lg bg-white animate-pulse">
      {/* Skeleton for Property Image */}
      <div className="relative h-[220px] sm:h-[260px] md:h-[280px] lg:h-[297px] bg-gray-300 rounded-t-[12px]"></div>

      {/* Skeleton for Property Details */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Skeleton for Title and Price */}
        <div className="flex flex-wrap items-center justify-between mb-2 gap-1 sm:gap-2">
          <div className="h-6 sm:h-7 md:h-8 lg:h-9 bg-gray-300 rounded w-3/4"></div>
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-1/4"></div>
        </div>

        {/* Skeleton for Address */}
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-5/6 mb-4"></div>

        {/* Skeleton for Date and Time */}
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4 mb-4">
          <div className="flex gap-1 sm:gap-2 items-center">
            <div className="h-5 sm:h-6 bg-gray-300 rounded w-24"></div>
            <span>-</span>
            <div className="h-5 sm:h-6 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-5 sm:h-6 bg-gray-300 rounded w-20"></div>
        </div>

        {/* Skeleton for Description */}
        <div className="space-y-2 mb-6">
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Skeleton for Property Stats */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-gray-300" />
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-gray-300" />
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 text-gray-300" />
            <div className="h-4 sm:h-5 bg-gray-300 rounded w-16"></div>
          </div>
        </div>

        {/* Skeleton for See Details Button */}
        <div className="h-[42px] sm:h-[46px] md:h-[48px] bg-gray-300 rounded-[8px] flex items-center justify-center">
          <div className="h-4 w-20 bg-gray-400 rounded"></div>
          <ArrowRight className="h-4 w-4 text-gray-400 ml-2" />
        </div>
      </div>
    </div>
  );
}