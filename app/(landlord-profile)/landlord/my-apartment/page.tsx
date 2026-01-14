'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/* ---------------- TYPES ---------------- */

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Apartment {
  _id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: Address;
  images: string[];
  videos: string[];
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: Apartment[];
  };
}

/* ---------------- SKELETON ---------------- */

const SkeletonRow = () => (
  <TableRow>
    <TableCell><div className="h-4 bg-muted rounded w-32 animate-pulse" /></TableCell>
    <TableCell><div className="h-4 bg-muted rounded w-24 animate-pulse" /></TableCell>
    <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse" /></TableCell>
    <TableCell><div className="h-4 bg-muted rounded w-16 animate-pulse" /></TableCell>
    <TableCell><div className="h-4 bg-muted rounded w-28 animate-pulse" /></TableCell>
    <TableCell><div className="h-8 bg-muted rounded w-24 animate-pulse" /></TableCell>
  </TableRow>
);

/* ---------------- PAGE ---------------- */

export default function MyApartmentsPage() {
  const { data: session, status } = useSession();
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const fetchApartments = async (): Promise<ApiResponse> => {
    const token = session?.accessToken;
    if (!token) throw new Error('No authentication token');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/apartment/assasint-landlord?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) throw new Error('Failed to fetch apartments');
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['assasint-landlord-apartments', currentPage],
    queryFn: fetchApartments,
    enabled: status === 'authenticated',
  });

  const apartments = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  if (status === 'loading') return <div className="p-8 text-center">Checking authentication...</div>;
  if (status === 'unauthenticated') return <div className="p-8 text-center text-destructive">Please login first</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Managed Apartments</h1>

      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-lg mb-6">
          Error: {(error as Error).message}
        </div>
      )}

      {/* ================= MOBILE & TABLET (CARD VIEW) ================= */}
      <div className="space-y-4 lg:hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))
        ) : apartments.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No apartments found
          </div>
        ) : (
          apartments.map((apt) => (
            <div
              key={apt._id}
              className="border rounded-lg p-4 shadow-sm bg-white space-y-3"
            >
              <div>
                <h3 className="font-semibold text-lg">{apt.title}</h3>
                <p className="text-sm text-muted-foreground">{apt.address.city}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span><strong>Price:</strong> ${apt.price.toLocaleString()}</span>
                <span><strong>Beds:</strong> {apt.bedrooms}</span>
                <span><strong>Baths:</strong> {apt.bathrooms}</span>
                <span><strong>Area:</strong> {apt.squareFeet} sqft</span>
              </div>

              <Button
                onClick={() => setSelectedApartment(apt)}
                className="w-full bg-[#0F3D61] text-white rounded-[8px] hover:bg-[#0F3D61]/90"
              >
                View Media
              </Button>
            </div>
          ))
        )}
      </div>

      {/* ================= LG DESKTOP (TABLE – UNCHANGED) ================= */}
      <div className="rounded-md border hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Beds / Baths</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : apartments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No apartments found
                </TableCell>
              </TableRow>
            ) : (
              apartments.map((apt) => (
                <TableRow key={apt._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{apt.title}</TableCell>
                  <TableCell>$ {apt.price.toLocaleString()}</TableCell>
                  <TableCell>{apt.bedrooms} / {apt.bathrooms}</TableCell>
                  <TableCell>{apt.squareFeet} sqft</TableCell>
                  <TableCell>{apt.address.city}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedApartment(apt)}
                      className="bg-[#0F3D61] border-none text-white rounded-[8px] hover:bg-[#0F3D61]/90"
                    >
                      View Media
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}
      {meta && totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * meta.limit + 1} to{' '}
            {Math.min(currentPage * meta.limit, meta.total)} of {meta.total}
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* ================= MEDIA DIALOG ================= */}
      <Dialog open={!!selectedApartment} onOpenChange={() => setSelectedApartment(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
          {selectedApartment && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedApartment.title}</DialogTitle>
              </DialogHeader>

              <div className="mt-6 space-y-8">
                {selectedApartment.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedApartment.images.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden border">
                          <Image
                            src={img}
                            alt={`Image ${idx + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedApartment.videos.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedApartment.videos.map((video, idx) => (
                        <video key={idx} controls className="w-full rounded-lg">
                          <source src={video} type="video/mp4" />
                        </video>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
