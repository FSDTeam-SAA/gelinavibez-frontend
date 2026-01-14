/*eslint-disable */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

/* ================= TYPES ================= */

interface Contractor {
  _id: string;
  companyName: string;
  CompanyAddress: string;
  name: string;
  number?: string;
  email?: string;
  images: string[];
  videos: string[];
  status: "pending" | "completed" | "rejected";
}

interface ApiResponse {
  success: boolean;
  data: Contractor[];
}

/* ================= COMPONENT ================= */

export default function ContractorTable() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const fetchContractors = async (): Promise<ApiResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contractor/my-contractor-service`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["my-contractors"],
    queryFn: fetchContractors,
  });

  const contractors = data?.data || [];

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "Images" | "Videos";
    items: string[];
  }>({
    isOpen: false,
    type: "Images",
    items: [],
  });

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:block">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm uppercase">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4">Media</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : (
                contractors.map((c) => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-semibold">{c.companyName}</p>
                      <p className="text-xs text-gray-500">{c.CompanyAddress}</p>
                    </td>

                    <td className="p-4">{c.name}</td>

                    <td className="p-4">
                      <StatusBadge status={c.status} />
                    </td>

                    <td className="p-4">
                      <MediaButtons contractor={c} setModal={setModal} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE & TABLET ================= */}
        <div className="lg:hidden p-4 space-y-4">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded" />
            ))
          ) : (
            contractors.map((c) => (
              <div key={c._id} className="bg-white shadow rounded-lg p-4 space-y-2">
                <div>
                  <p className="font-bold text-lg">{c.companyName}</p>
                  <p className="text-xs text-gray-500">{c.CompanyAddress}</p>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span>👤 {c.name}</span>
                  <StatusBadge status={c.status} />
                </div>

                <MediaButtons contractor={c} setModal={setModal} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6 relative">
            <button
              onClick={() => setModal({ ...modal, isOpen: false })}
              className="absolute top-4 right-5 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">{modal.type}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modal.type === "Images"
                ? modal.items.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="w-full h-48 object-cover rounded"
                    />
                  ))
                : modal.items.map((src, i) => (
                    <video
                      key={i}
                      src={src}
                      controls
                      className="w-full h-48 bg-black rounded"
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
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

function MediaButtons({ contractor, setModal }: any) {
  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() =>
          setModal({
            isOpen: true,
            type: "Images",
            items: contractor.images || [],
          })
        }
        disabled={!contractor.images?.length}
        className="px-3 py-1 text-xs rounded text-white disabled:opacity-40"
        style={{ backgroundColor: "#0F3D61" }}
      >
        Images ({contractor.images?.length || 0})
      </button>

      <button
        onClick={() =>
          setModal({
            isOpen: true,
            type: "Videos",
            items: contractor.videos || [],
          })
        }
        disabled={!contractor.videos?.length}
        className="px-3 py-1 text-xs rounded text-white disabled:opacity-40"
        style={{ backgroundColor: "#0F3D61" }}
      >
        Videos ({contractor.videos?.length || 0})
      </button>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </td>
      <td className="p-4">
        <div className="h-6 bg-gray-200 rounded w-20" />
      </td>
      <td className="p-4">
        <div className="h-6 bg-gray-200 rounded w-32" />
      </td>
    </tr>
  );
}
