'use client';

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Types
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
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: AdminUser[];
}

// Fetch all admins
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

  if (!res.ok) {
    throw new Error('Failed to fetch admin users');
  }

  return res.json();
};

// Create conversation
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

  // Fetch admins
  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['admins', 'all'],
    queryFn: () => fetchAllAdmins(token),
    enabled: !!token && status === 'authenticated', // only run when we have token
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create conversation mutation
  const createConvMutation = useMutation({
    mutationFn: (receiverId: string) => createConversation(token, receiverId),
    onSuccess: () => {
      router.push('/broker/message');

    },
    onError: (err) => {
      console.error('Failed to create conversation:', err);
      alert(err.message || 'Could not start chat. Please try again.');
    },
  });

  const handleChatClick = (adminId: string) => {
    if (!token) {
      alert('Please login to start a conversation');
      return;
    }
    createConvMutation.mutate(adminId);
  };

  // Loading states
  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return <div className="p-8 text-center">Loading admins...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-8 text-center text-amber-600">
        Please login to view admin list and start conversations
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Error: {error?.message || 'Failed to load admin users'}
      </div>
    );
  }

  const admins = data?.data || [];

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Users</h1>

      {admins.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No admin users found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={admin.profileImage}
                      alt={`${admin.firstName} ${admin.lastName}`}
                      className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/40?text=?';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {admin.firstName} {admin.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admin.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {admin.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleChatClick(admin._id)}
                      disabled={createConvMutation.isPending}
                      className={`
                        px-4 py-2 rounded-md text-white text-sm font-medium transition-colors
                        ${
                          createConvMutation.isPending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }
                      `}
                    >
                      {createConvMutation.isPending ? 'Starting chat...' : 'Chat with admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}