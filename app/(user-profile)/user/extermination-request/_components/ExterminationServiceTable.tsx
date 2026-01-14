"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

/* ================= TYPES ================= */

interface Extermination {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  propertyAddress: string;
  typeOfProperty: string[];
  typeOfPestProblem: string[];
  preferredServiceDate: string;
  preferredTime: string[];
  status: "pending" | "completed" | "rejected";
  charges?: number;
}

/* ================= COMPONENT ================= */

export default function ExterminationServiceTable() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const fetchServices = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/extermination/my-extermination-service`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["my-extermination"],
    queryFn: fetchServices,
  });

  const services: Extermination[] = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden lg:block">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Property</th>
                <th className="p-4">Pest</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : (
                services.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-semibold">{s.fullName}</p>
                      <p className="text-xs text-gray-500">{s.email}</p>
                    </td>

                    <td className="p-4 text-sm">{s.phoneNumber}</td>

                    <td className="p-4 text-sm">
                      {s.typeOfProperty.join(", ")}
                    </td>

                    <td className="p-4 text-sm">
                      {s.typeOfPestProblem.join(", ")}
                    </td>

                    <td className="p-4 text-sm">
                      {new Date(s.preferredServiceDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE + TABLET ================= */}
        <div className="lg:hidden p-4 space-y-4">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-36 bg-gray-200 animate-pulse rounded" />
            ))
          ) : (
            services.map((s) => (
              <div
                key={s._id}
                className="bg-white shadow rounded-lg p-4 space-y-2"
              >
                <div>
                  <p className="font-bold text-lg">{s.fullName}</p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                </div>

                <p className="text-sm">📞 {s.phoneNumber}</p>
                <p className="text-sm">🏠 {s.typeOfProperty.join(", ")}</p>
                <p className="text-sm">🐜 {s.typeOfPestProblem.join(", ")}</p>
                <p className="text-sm">
                  📅 {new Date(s.preferredServiceDate).toLocaleDateString()}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <StatusBadge status={s.status} />
                  {s.charges && (
                    <span className="font-semibold text-sm">
                      ${s.charges}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        status === "completed"
          ? "bg-green-100 text-green-700"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4" /></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
      <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
      <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20" /></td>
    </tr>
  );
}
