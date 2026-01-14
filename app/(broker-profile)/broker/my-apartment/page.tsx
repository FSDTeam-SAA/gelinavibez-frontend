// 'use client';

// import { useSession } from 'next-auth/react';
// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import Image from 'next/image';

// import { Button } from '@/components/ui/button';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';

// // ──────────────────────────────────────────────────────────────────────────────
// // Types
// // ──────────────────────────────────────────────────────────────────────────────
// interface Address {
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// interface AvailableFrom {
//   month: string;
//   time: string;
// }

// export interface Apartment {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   bedrooms: number;
//   bathrooms: number;
//   squareFeet: number;
//   address: Address;
//   availableFrom: AvailableFrom;
//   images: string[];
//   videos: string[];
//   status: 'pending' | 'approve';
//   action: string;
//   day: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiMeta {
//   page: number;
//   limit: number;
//   total: number;
// }

// interface ApiResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: {
//     meta: ApiMeta;
//     data: Apartment[];
//   };
// }

// // ──────────────────────────────────────────────────────────────────────────────
// // Skeleton Row Component
// // ──────────────────────────────────────────────────────────────────────────────
// const SkeletonRow = () => (
//   <tr className="border-b animate-pulse">
//     <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-3/4" /></td>
//     <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-5/6" /></td>
//     <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-24" /></td>
//     <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-16" /></td>
//     <td className="px-6 py-4"><div className="h-4 bg-gray-300 rounded w-20" /></td>
//     <td className="px-6 py-4"><div className="h-8 bg-gray-300 rounded w-16" /></td>
//   </tr>
// );

// const ITEMS_PER_PAGE = 10;

// export default function BrokerApartmentsPage() {
//   const { data: session, status } = useSession();
//   const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const token = session?.accessToken as string | undefined;

//   const { data, isLoading, error } = useQuery<ApiResponse, Error>({
//     queryKey: ['broker-apartments', currentPage],
//     queryFn: async () => {
//       if (!token) throw new Error('Not authenticated');

//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/assasint-broker?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;

//       const res = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         cache: 'no-store',
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to fetch apartments: ${res.statusText}`);
//       }

//       return res.json();
//     },
//     enabled: status === 'authenticated' && !!token,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     // keepPreviousData: true,
//   });

//   const apartments = data?.data.data ?? [];
//   const totalItems = data?.data.meta.total ?? 0;
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   // Generate visible page numbers (max 5 shown)
//   const getPageNumbers = (): number[] => {
//     const maxPagesToShow = 5;
//     const half = Math.floor(maxPagesToShow / 2);

//     let start = Math.max(1, currentPage - half);
//     let end = Math.min(totalPages, currentPage + half);

//     // Adjust window if near edges
//     if (end - start + 1 < maxPagesToShow) {
//       if (start === 1) {
//         end = Math.min(totalPages, start + maxPagesToShow - 1);
//       } else if (end === totalPages) {
//         start = Math.max(1, end - maxPagesToShow + 1);
//       }
//     }

//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   if (status === 'loading' || isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">My Broker Apartments</h1>
//         <div className="overflow-x-auto rounded-lg border">
//           <table className="min-w-full divide-y divide-gray-200 bg-white">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds/Baths</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
//                 <SkeletonRow key={i} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-red-600">
//         <p>Error loading apartments: {error.message}</p>
//       </div>
//     );
//   }

//   if (status === 'unauthenticated') {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <p className="text-gray-600">Please sign in to view your broker apartments.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">My Broker Apartments</h1>

//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//         <table className="min-w-full divide-y divide-gray-200 bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds/Baths</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {apartments.map((apt) => (
//               <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{apt.title}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">
//                     {apt.address.city}, {apt.address.state}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     ${apt.price.toLocaleString()}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {apt.bedrooms} bed{apt.bedrooms !== 1 ? 's' : ''} • {apt.bathrooms} bath
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
//                       apt.status === 'approve'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}
//                   >
//                     {apt.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <button
//                     onClick={() => setSelectedApartment(apt)}
//                     className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center">
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (currentPage > 1) setCurrentPage(currentPage - 1);
//                   }}
//                   className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
//                 />
//               </PaginationItem>

//               {getPageNumbers().map((page) => (
//                 <PaginationItem key={page}>
//                   <PaginationLink
//                     href="#"
//                     isActive={page === currentPage}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setCurrentPage(page);
//                     }}
//                   >
//                     {page}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}

//               {totalPages > 5 && currentPage < totalPages - 2 && (
//                 <PaginationItem>
//                   <PaginationEllipsis />
//                 </PaginationItem>
//               )}

//               <PaginationItem>
//                 <PaginationNext
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//                   }}
//                   className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}

//       {/* Modal */}
//       {selectedApartment && (
//         <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             {/* Header */}
//             <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">{selectedApartment.title}</h2>
//                 <p className="text-sm text-gray-500 mt-1">
//                   ${selectedApartment.price.toLocaleString()} • {selectedApartment.bedrooms} bed •{' '}
//                   {selectedApartment.bathrooms} bath
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedApartment(null)}
//                 className="text-gray-500 hover:text-gray-800 text-3xl leading-none p-2"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-6">
//               {/* Images */}
//               {selectedApartment.images.length > 0 && (
//                 <section className="mb-12">
//                   <h3 className="text-xl font-semibold mb-5 text-gray-800">Property Images</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {selectedApartment.images.map((img, index) => (
//                       <div
//                         key={index}
//                         className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
//                       >
//                         <Image
//                           src={img}
//                           alt={`Property image ${index + 1}`}
//                           fill
//                           className="object-cover transition-transform duration-500 group-hover:scale-105"
//                           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* Videos */}
//               {selectedApartment.videos.length > 0 && (
//                 <section>
//                   <h3 className="text-xl font-semibold mb-5 text-gray-800">Property Videos</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {selectedApartment.videos.map((video, index) => (
//                       <div key={index} className="rounded-xl overflow-hidden shadow-lg bg-black">
//                         <video
//                           controls
//                           preload="metadata"
//                           className="w-full aspect-video"
//                           poster={selectedApartment.images[0] || undefined}
//                         >
//                           <source src={video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                         <div className="bg-gray-900/80 text-gray-200 text-xs px-3 py-2">
//                           Video {index + 1}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {selectedApartment.images.length === 0 && selectedApartment.videos.length === 0 && (
//                 <div className="text-center py-16 text-gray-500">
//                   No media available for this property
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// ───────────────────────────────── Types ─────────────────────────────────
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

export interface Apartment {
  _id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: Address;
  availableFrom: AvailableFrom;
  images: string[];
  videos: string[];
  status: 'pending' | 'approve';
  action: string;
  day: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiMeta {
  page: number;
  limit: number;
  total: number;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: ApiMeta;
    data: Apartment[];
  };
}

const ITEMS_PER_PAGE = 10;

// ───────────────────────────────── Page ─────────────────────────────────
export default function BrokerApartmentsPage() {
  const { data: session, status } = useSession();
  const [selectedApartment, setSelectedApartment] =
    useState<Apartment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const token = session?.accessToken as string | undefined;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['broker-apartments', currentPage],
    enabled: status === 'authenticated' && !!token,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/assasint-broker?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch apartments');
      }

      return res.json();
    },
  });

  const apartments = data?.data.data ?? [];
  const totalItems = data?.data.meta.total ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // ---------- pagination window (unchanged) ----------
  const getPageNumbers = (): number[] => {
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxPagesToShow) {
      if (start === 1) end = Math.min(totalPages, start + maxPagesToShow - 1);
      if (end === totalPages)
        start = Math.max(1, end - maxPagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // ---------- states ----------
  if (status === 'unauthenticated') {
    return <p className="p-6">Please sign in</p>;
  }

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">Error loading apartments</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Broker Apartments</h1>

      {/* ======================= DESKTOP TABLE (ORIGINAL) ======================= */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Beds/Baths
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {apartments.map((apt) => (
              <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {apt.title}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {apt.address.city}, {apt.address.state}
                </td>
                <td className="px-6 py-4">
                  ${apt.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {apt.bedrooms} bed • {apt.bathrooms} bath
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      apt.status === 'approve'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedApartment(apt)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======================= MOBILE & TABLET CARDS ======================= */}
      <div className="lg:hidden space-y-4">
        {apartments.map((apt) => (
          <div
            key={apt._id}
            className="bg-white rounded-xl border p-4 shadow-sm"
          >
            <h3 className="font-semibold text-lg">{apt.title}</h3>
            <p className="text-sm text-gray-500">
              {apt.address.city}, {apt.address.state}
            </p>

            <div className="flex justify-between mt-2 text-sm">
              <span className="font-medium">
                ${apt.price.toLocaleString()}
              </span>
              <span>
                {apt.bedrooms} bed • {apt.bathrooms} bath
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  apt.status === 'approve'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {apt.status}
              </span>

              <Button size="sm" onClick={() => setSelectedApartment(apt)}>
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ======================= PAGINATION (UNCHANGED) ======================= */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center overflow-x-auto px-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {getPageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* ======================= MODAL (IMAGES + VIDEO FIXED) ======================= */}
      {selectedApartment && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between">
              <h2 className="text-xl font-bold">
                {selectedApartment.title}
              </h2>
              <button
                className="text-2xl"
                onClick={() => setSelectedApartment(null)}
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-10">
              {/* Images */}
              {selectedApartment.images.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-4">
                    Property Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedApartment.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`Image ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Videos (FIXED) */}
              {selectedApartment.videos.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-4">
                    Property Videos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedApartment.videos.map((video, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden bg-black shadow-lg"
                      >
                        <video
                          controls
                          preload="metadata"
                          className="w-full aspect-video"
                          poster={selectedApartment.images[0] || undefined}
                        >
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* No media */}
              {selectedApartment.images.length === 0 &&
                selectedApartment.videos.length === 0 && (
                  <p className="text-center text-gray-500">
                    No media available for this apartment
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
