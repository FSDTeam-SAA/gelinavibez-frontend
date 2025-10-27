"use client";

import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: UserProfile;
}

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["user-profile"],
    queryFn: async (): Promise<ApiResponse> => {
      if (!token) throw new Error("No token available");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to fetch profile");
      }

      return response.json();
    },
    enabled: !!token && status === "authenticated",
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const user = data?.data;

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading...";
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "??";

  // Session loading state
  if (status === "loading") {
    return (
      <header className="h-20 bg-white flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50 border-b">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="hidden sm:block">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  // Not authenticated
  if (status === "unauthenticated") {
    return null; // or show login button
  }

  return (
    <header className="h-20 bg-white flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50 border-b">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          {isLoading ? (
            <AvatarFallback className="animate-pulse bg-gray-200">
              ...
            </AvatarFallback>
          ) : isError ? (
            <AvatarFallback className="bg-red-100 text-red-600">
              Error
            </AvatarFallback>
          ) : (
            <>
              <AvatarImage src={user?.profileImage} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </>
          )}
        </Avatar>

        <div className="hidden sm:block">
          {isLoading ? (
            <>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
            </>
          ) : isError ? (
            <>
              <div className="text-sm font-medium text-red-600">
                Failed to load
              </div>
              <div className="text-xs text-red-500">Try again later</div>
            </>
          ) : (
            <>
              <div className="text-sm font-medium text-gray-900">
                {fullName}
              </div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
