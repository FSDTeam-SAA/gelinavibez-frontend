


'use client';

import { ReactNode } from "react";
import { Header } from "../(user-profile)/_components/Header";
// import RouteProtector from "../(user-profile)/_components/RouteProtector";
import { ServiceSidebar } from "./_components/serviceSidebar";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    // <RouteProtector>
      <div className="flex min-h-screen bg-[#F8F9FA]">
        <ServiceSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    // </RouteProtector>
  );
}
