

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

// // ───────────────────────────────── Types ─────────────────────────────────
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

// const ITEMS_PER_PAGE = 10;

// // ───────────────────────────────── Page ─────────────────────────────────
// export default function BrokerApartmentsPage() {
//   const { data: session, status } = useSession();
//   const [selectedApartment, setSelectedApartment] =
//     useState<Apartment | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const token = session?.accessToken as string | undefined;

//   const { data, isLoading, error } = useQuery<ApiResponse>({
//     queryKey: ['broker-apartments', currentPage],
//     enabled: status === 'authenticated' && !!token,
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/assasint-broker?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           cache: 'no-store',
//         }
//       );

//       if (!res.ok) {
//         throw new Error('Failed to fetch apartments');
//       }

//       return res.json();
//     },
//   });

//   const apartments = data?.data.data ?? [];
//   const totalItems = data?.data.meta.total ?? 0;
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   // ---------- pagination window (unchanged) ----------
//   const getPageNumbers = (): number[] => {
//     const maxPagesToShow = 5;
//     const half = Math.floor(maxPagesToShow / 2);

//     let start = Math.max(1, currentPage - half);
//     let end = Math.min(totalPages, currentPage + half);

//     if (end - start + 1 < maxPagesToShow) {
//       if (start === 1) end = Math.min(totalPages, start + maxPagesToShow - 1);
//       if (end === totalPages)
//         start = Math.max(1, end - maxPagesToShow + 1);
//     }

//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   // ---------- states ----------
//   if (status === 'unauthenticated') {
//     return <p className="p-6">Please sign in</p>;
//   }

//   if (isLoading) {
//     return <p className="p-6">Loading...</p>;
//   }

//   if (error) {
//     return <p className="p-6 text-red-600">Error loading apartments</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">My Broker Apartments</h1>

//       {/* ======================= DESKTOP TABLE (ORIGINAL) ======================= */}
//       <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//         <table className="min-w-full divide-y divide-gray-200 bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Location
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Beds/Baths
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {apartments.map((apt) => (
//               <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 font-medium text-gray-900">
//                   {apt.title}
//                 </td>
//                 <td className="px-6 py-4 text-gray-500">
//                   {apt.address.city}, {apt.address.state}
//                 </td>
//                 <td className="px-6 py-4">
//                   ${apt.price.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 text-gray-500">
//                   {apt.bedrooms} bed • {apt.bathrooms} bath
//                 </td>
//                 <td className="px-6 py-4">
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
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => setSelectedApartment(apt)}
//                     className="text-indigo-600 hover:text-indigo-900 font-medium"
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ======================= MOBILE & TABLET CARDS ======================= */}
//       <div className="lg:hidden space-y-4">
//         {apartments.map((apt) => (
//           <div
//             key={apt._id}
//             className="bg-white rounded-xl border p-4 shadow-sm"
//           >
//             <h3 className="font-semibold text-lg">{apt.title}</h3>
//             <p className="text-sm text-gray-500">
//               {apt.address.city}, {apt.address.state}
//             </p>

//             <div className="flex justify-between mt-2 text-sm">
//               <span className="font-medium">
//                 ${apt.price.toLocaleString()}
//               </span>
//               <span>
//                 {apt.bedrooms} bed • {apt.bathrooms} bath
//               </span>
//             </div>

//             <div className="flex justify-between items-center mt-3">
//               <span
//                 className={`px-2 py-1 text-xs rounded-full ${
//                   apt.status === 'approve'
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-yellow-100 text-yellow-800'
//                 }`}
//               >
//                 {apt.status}
//               </span>

//               <Button size="sm" onClick={() => setSelectedApartment(apt)}>
//                 View
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ======================= PAGINATION (UNCHANGED) ======================= */}
//       {totalPages > 1 && (
//         <div className="mt-8 flex justify-center overflow-x-auto px-2">
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (currentPage > 1) setCurrentPage(currentPage - 1);
//                   }}
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
//                     if (currentPage < totalPages)
//                       setCurrentPage(currentPage + 1);
//                   }}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}

//       {/* ======================= MODAL (IMAGES + VIDEO FIXED) ======================= */}
//       {selectedApartment && (
//         <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between">
//               <h2 className="text-xl font-bold">
//                 {selectedApartment.title}
//               </h2>
//               <button
//                 className="text-2xl"
//                 onClick={() => setSelectedApartment(null)}
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-10">
//               {/* Images */}
//               {selectedApartment.images.length > 0 && (
//                 <section>
//                   <h3 className="text-lg font-semibold mb-4">
//                     Property Images
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {selectedApartment.images.map((img, i) => (
//                       <div
//                         key={i}
//                         className="relative aspect-[4/3] rounded-lg overflow-hidden"
//                       >
//                         <Image
//                           src={img}
//                           alt={`Image ${i + 1}`}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* Videos (FIXED) */}
//               {selectedApartment.videos.length > 0 && (
//                 <section>
//                   <h3 className="text-lg font-semibold mb-4">
//                     Property Videos
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {selectedApartment.videos.map((video, i) => (
//                       <div
//                         key={i}
//                         className="rounded-xl overflow-hidden bg-black shadow-lg"
//                       >
//                         <video
//                           controls
//                           preload="metadata"
//                           className="w-full aspect-video"
//                           poster={selectedApartment.images[0] || undefined}
//                         >
//                           <source src={video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {/* No media */}
//               {selectedApartment.images.length === 0 &&
//                 selectedApartment.videos.length === 0 && (
//                   <p className="text-center text-gray-500">
//                     No media available for this apartment
//                   </p>
//                 )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Label } from '@/components/ui/label';

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
  aboutListing?: string;
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
  amenities?: string[];
  currentStatus?: string;
  createdAt: string;
  updatedAt: string;
  // If your backend returns the note, you can add: note?: string;
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
  const queryClient = useQueryClient();

  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [noteInput, setNoteInput] = useState<string>(''); // controlled input in modal

  const [currentPage, setCurrentPage] = useState(1);

  const token = session?.accessToken as string | undefined;

  // ─── Fetch apartments ───
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

      if (!res.ok) throw new Error('Failed to fetch apartments');
      return res.json();
    },
  });

  const apartments = data?.data.data ?? [];
  const totalItems = data?.data.meta.total ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // ─── Save note mutation ───
  const saveNoteMutation = useMutation({
    mutationFn: async ({ apartmentId, note }: { apartmentId: string; note: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/${apartmentId}/note`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ note }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to save note');
      }

      return res.json(); // or just return true if no body needed
    },

    onSuccess: () => {
      toast.success('Note saved successfully');
      // Optional: close modal after save
      // setSelectedApartment(null);

      // Invalidate & refetch the list (useful if backend returns updated note)
      queryClient.invalidateQueries({ queryKey: ['broker-apartments'] });
    },

    onError: (err: Error) => {
      toast.error(err.message || 'Failed to save note');
    },
  });

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxPagesToShow) {
      if (start === 1) end = Math.min(totalPages, start + maxPagesToShow - 1);
      if (end === totalPages) start = Math.max(1, end - maxPagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleSaveNote = () => {
    if (!selectedApartment) return;
    if (!noteInput.trim()) {
      toast.warning('Please enter a note');
      return;
    }

    saveNoteMutation.mutate({
      apartmentId: selectedApartment._id,
      note: noteInput,
    });
  };

  if (status === 'unauthenticated') {
    return <p className="p-6 text-center">Please sign in to view your apartments</p>;
  }

  if (isLoading) {
    return <p className="p-6 text-center">Loading your properties...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">Error loading apartments</p>;
  }

  return (
    <div className="w-full  px-4 py-8 m">
      <h1 className="text-3xl font-bold mb-8">My  Apartments</h1>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Beds/Baths</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Area</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {apartments.map((apt) => (
              <tr key={apt._id} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-6 py-4 font-medium">{apt.title}</td>
                <td className="px-6 py-4 text-gray-600">
                  {apt.address.city}, {apt.address.state}
                </td>
                <td className="px-6 py-4 font-medium">${apt.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600">
                  {apt.bedrooms} bd • {apt.bathrooms} ba
                </td>
                <td className="px-6 py-4 text-gray-600">{apt.squareFeet} sqft</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      apt.status === 'approve' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedApartment(apt);
                      setNoteInput(''); // reset on open – or load existing note if you fetch it
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-5">
        {apartments.map((apt) => (
          <div
            key={apt._id}
            className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-1">{apt.title}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {apt.address.city}, {apt.address.state}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <span className="font-semibold">${apt.price.toLocaleString()}</span>
              </div>
              <div>
                {apt.bedrooms} bed • {apt.bathrooms} bath • {apt.squareFeet} sqft
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {apt.amenities?.slice(0, 4).map((amenity) => (
                <span key={amenity} className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  apt.status === 'approve' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {apt.status}
              </span>

              <Button
                size="sm"
                onClick={() => {
                  setSelectedApartment(apt);
                  setNoteInput(''); // reset
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
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
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal */}
      {selectedApartment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div  className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedApartment.title}</h2>
              <button
                className="text-3xl text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedApartment(null)}
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-10">
              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-gray-50 p-5 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-bold text-lg">${selectedApartment.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Beds / Baths</p>
                  <p className="font-bold text-lg">
                    {selectedApartment.bedrooms} / {selectedApartment.bathrooms}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="font-bold text-lg">{selectedApartment.squareFeet} sqft</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-bold text-lg capitalize">{selectedApartment.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="font-bold text-lg">{selectedApartment.currentStatus || '—'}</p>
                </div>
              </div>

              {/* Images */}
              {selectedApartment.images.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">Photos</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedApartment.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Image src={img} alt={`Property image ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Videos */}
              {selectedApartment.videos.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedApartment.videos.map((video, i) => (
                      <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-black">
                        <video
                          controls
                          preload="metadata"
                          className="w-full aspect-video"
                          poster={selectedApartment.images[0]}
                        >
                          <source src={video} type="video/mp4" />
                          Your browser does not support video.
                        </video>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Description + Amenities */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedApartment.description ||
                      selectedApartment.aboutListing ||
                      'No description provided.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                  {selectedApartment.amenities && selectedApartment.amenities.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedApartment.amenities.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-gray-700">
                          <span className="text-green-600">✔</span> {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No amenities listed</p>
                  )}
                </div>
              </section>

              {/* Notes Section */}
              <section>
                <Label htmlFor="note" className="text-lg font-semibold mb-2 block">
                  Your Notes for this Property
                </Label>
                <Textarea
                  id="note"
                  placeholder="Inspection completed, minor repair needed..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="min-h-[140px] resize-y"
                  disabled={saveNoteMutation.isPending}
                />
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedApartment(null)}
                    disabled={saveNoteMutation.isPending}
                    className='rounded-[4px]'
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleSaveNote}
                    disabled={saveNoteMutation.isPending || !noteInput.trim()}
                    className='bg-[#0F3D61] rounded-[4px] text-white hover:bg-[#0d334e] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F3D61]'
              
                  >
                    {saveNoteMutation.isPending ? 'Saving...' : 'Save Note'}
                  </Button>
                </div>
              </section>

              {/* No media fallback */}
              {selectedApartment.images.length === 0 && selectedApartment.videos.length === 0 && (
                <p className="text-center py-10 text-gray-500 italic">
                  No photos or videos available for this listing
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}