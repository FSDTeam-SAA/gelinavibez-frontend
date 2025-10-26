'use client';
import { ReactNode } from "react";
import "../globals.css";
import { Sidebar } from "./user/_components/Sidebar";
import { Header } from "./user/_components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
 
      <div className="flex min-h-screen bg-[#F8F9FA]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header/>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>

  );
}
