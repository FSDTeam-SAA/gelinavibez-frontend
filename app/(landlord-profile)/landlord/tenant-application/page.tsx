/* eslint-disable  */
"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { PlayCircle, Check, X, Mail, Phone, MapPin, Calendar } from "lucide-react";
import Image from 'next/image';

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const fetchLandlords = async (currentPage: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tenant/my-landlords?page=${currentPage}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  };

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tenant/${id}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to approve');
      return res.json();
    },
    onSuccess: () => {
      toast.success("Tenant Approved Successfully");
      queryClient.invalidateQueries({ queryKey: ['landlords'] });
    },
  });

  const denyMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tenant/${id}/deny`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to deny');
      return res.json();
    },
    onSuccess: () => {
      toast.error("Application Rejected");
      queryClient.invalidateQueries({ queryKey: ['landlords'] });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['landlords', page],
    queryFn: () => fetchLandlords(page),
    enabled: !!token && status === 'authenticated',
  });

  if (isLoading) return <LoadingSkeleton />;

  const applications = data?.data || [];
  const meta = data?.meta || { total: 0, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-0">
      <div className="w-full">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0F3D61] tracking-tight">Tenant Applications</h1>
            <p className="text-slate-500 mt-1">Manage Tenant Applications</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border shadow-sm text-sm font-bold text-[#0F3D61]">
            {meta.total} Applications Total
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-100 px-5">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold py-5">Applicant Details</TableHead>
                <TableHead className="font-bold">Property</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Applied On</TableHead>
                <TableHead className="text-right font-bold pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app: any) => (
                <TableRow key={app._id} className="group transition-colors hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-lg">{app.firstName} {app.lastName}</span>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Mail size={12}/> {app.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12}/> {app.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <MapPin size={14} className="text-slate-400"/> {app.apartmentId?.title || 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-slate-500 italic text-sm">
                    {new Date(app.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-3">
                      <MediaModal app={app} />
                      {app.status === 'pending' && (
                        <>
                          <Button 
                            onClick={() => approveMutation.mutate(app._id)}
                            disabled={approveMutation.isPending}
                            className="bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 px-4 rounded-[8px] text-white"
                          >
                            <Check size={18} className="mr-1"/> Approve
                          </Button>
                          <Button 
                            onClick={() => denyMutation.mutate(app._id)}
                            disabled={denyMutation.isPending}
                            className="bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-100 px-4 rounded-[8px] text-white"
                          >
                            <X size={18} className="mr-1"/> Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {applications.map((app: any) => (
            <Card key={app._id} className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800">{app.firstName} {app.lastName}</h3>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <Calendar size={12} className="inline mr-1"/>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2 mb-6 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><MapPin size={14}/> {app.apartmentId?.title || 'N/A'}</p>
                  <p className="flex items-center gap-2"><Mail size={14}/> {app.email}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <MediaModal app={app} fullWidth />
                  {app.status === 'pending' && (
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={() => approveMutation.mutate(app._id)} className="bg-emerald-600 w-full">Approve</Button>
                      <Button onClick={() => denyMutation.mutate(app._id)} className="bg-rose-600 w-full">Reject</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
       {totalPages > 1 && (
  <div className="mt-10 pb-10 flex justify-center">
    <Pagination className="bg-white rounded-xl shadow-sm border p-2">
      <PaginationContent className="flex items-center space-x-2">

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className={
              page === 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#0F3D61] hover:text-white rounded px-2 py-1 transition"
            }
          >
            Prev
          </PaginationPrevious>
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              isActive={page === p}
              className={
                page === p
                  ? "bg-[#0F3D61] text-white rounded px-3 py-1 font-semibold transition"
                  : "hover:bg-[#0F3D61] hover:text-white rounded px-3 py-1 transition cursor-pointer"
              }
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className={
              page === totalPages
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#0F3D61] hover:text-white rounded px-2 py-1 transition"
            }
          >
            Next
          </PaginationNext>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  </div>
)}

      </div>
    </div>
  );
};

// Custom Media Modal with your specific Color
const MediaModal = ({ app, fullWidth }: { app: any, fullWidth?: boolean }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button 
        style={{ backgroundColor: '#0F3D61' }} 
        className={`${fullWidth ? 'w-full ' : ''} text-white hover:opacity-90 rounded-[8px]`}
      >
        <PlayCircle size={18} className="mr-2"/> Media
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-5xl h-[70vh] bg-white !rounded-[8px]">
      <DialogHeader>
        <DialogTitle className="text-[#0F3D61] text-2xl">Application Media & Files</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.entries(app.uploads || {}).map(([key, url]: any) => (
          <div key={key} className="relative group overflow-hidden rounded-xl border-2 border-slate-100">
            <Image src={url} alt={key} width={1000} height={1000} className="aspect-video object-contain" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#0F3D61]/80 text-white p-2 text-xs font-bold uppercase tracking-widest">
              {key.replace('Doc', '').replace('id', 'ID ')}
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    denied: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return (
    <Badge variant="outline" className={`${styles[status]} font-bold px-3 py-1 capitalize`}>
      {status}
    </Badge>
  );
};

const LoadingSkeleton = () => (
  <div className="p-10 space-y-8">
    <Skeleton className="h-12 w-1/3" />
    <Skeleton className="h-[400px] w-full rounded-2xl" />
  </div>
);

export default Page;