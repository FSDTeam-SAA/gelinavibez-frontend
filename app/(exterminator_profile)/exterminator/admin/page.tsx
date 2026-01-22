
'use client';

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Image from 'next/image';

// Types (Keep these the same)
interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  role: string;
  verified: boolean;
  accessRoutes?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: { total: number; page: number; limit: number };
  data: AdminUser[];
}

const fetchAllAdmins = async (token: string | undefined): Promise<ApiResponse> => {
  if (!token) throw new Error('No authentication token available');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all-user?role=admin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch admin users');
  return res.json();
};

const createConversation = async (token: string | undefined, receiverId: string) => {
  if (!token) throw new Error('No authentication token available');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ receiverId }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create conversation');
  }
  return res.json();
};

export default function AdminListPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session?.accessToken as string | undefined;

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['admins', 'all'],
    queryFn: () => fetchAllAdmins(token),
    enabled: !!token && status === 'authenticated',
    staleTime: 5 * 60 * 1000,
  });

  const createConvMutation = useMutation({
    mutationFn: (receiverId: string) => createConversation(token, receiverId),
    onSuccess: () => router.push('/exterminator/message'),
    onError: (err) => toast.error(err.message || 'Could not start chat.'),
  });

  const handleChatClick = (adminId: string) => {
    if (!token) {
      toast.error('Please login to start a conversation');
      return;
    }
    createConvMutation.mutate(adminId);
  };

  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return <div className="p-8 text-center animate-pulse">Loading admins...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="p-8 text-center text-amber-600">Please login to view admin list.</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-600">Error: {error?.message}</div>;
  }

  const admins = data?.data || [];

  return (
    <div className="p-4 md:p-6 w-full  mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6">ALL Admin</h1>

      {admins.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No admin users found</p>
      ) : (
        <>
          {/* MOBILE VIEW: Card layout (Visible only on small screens) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {admins.map((admin) => (
              <div key={admin._id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-4">
                  <Image
                    src={admin.profileImage}
                    alt={admin.firstName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {admin.firstName} {admin.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{admin.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${admin.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {admin.verified ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>
                <button
                  onClick={() => handleChatClick(admin._id)}
                  disabled={createConvMutation.isPending}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-medium active:bg-green-700 transition-colors"
                >
                  {createConvMutation.isPending ? 'Connecting...' : 'Chat with admin'}
                </button>
              </div>
            ))}
          </div>

          {/* TABLE VIEW: Large Screens (Hidden on mobile) */}
          <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Image
                        src={admin.profileImage}
                        alt={`${admin.firstName} ${admin.lastName}`}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {admin.firstName} {admin.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{admin.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${admin.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {admin.verified ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleChatClick(admin._id)}
                        disabled={createConvMutation.isPending}
                        className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium disabled:bg-gray-400 transition-colors"
                      >
                        {createConvMutation.isPending ? 'Starting...' : 'Chat with admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}