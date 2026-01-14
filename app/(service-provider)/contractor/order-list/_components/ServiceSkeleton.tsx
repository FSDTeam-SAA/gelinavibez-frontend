import { Skeleton } from "@/components/ui/skeleton"

export function ServiceProviderSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Skeleton className="h-4 w-48 mb-6" />
      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block border rounded-xl overflow-hidden bg-white">
        <div className="h-12 bg-gray-100 border-b px-6 flex items-center gap-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 border-b px-6 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        ))}
      </div>
      {/* Mobile Card Skeleton */}
      <div className="lg:hidden space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-5 border rounded-xl bg-white space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}