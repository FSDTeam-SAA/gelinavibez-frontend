


'use client';
import { ReactNode } from "react";
import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";
import "../globals.css";
import RouteProtector from "./_components/RouteProtector";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RouteProtector>
      <div className="flex min-h-screen bg-[#F8F9FA]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </RouteProtector>
  );
}
