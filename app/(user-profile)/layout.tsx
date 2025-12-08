// 'use client';
// import { ReactNode } from "react";
// import "../globals.css";
// import { Sidebar } from "./user/_components/Sidebar";
// import { Header } from "./user/_components/Header";

// export default function Layout({ children }: { children: ReactNode }) {
//   return (
 
//       <div className="flex min-h-screen bg-[#F8F9FA]">
//         <Sidebar />
//         <div className="flex-1 flex flex-col">
//           <Header/>
//           <main className="flex-1 p-6">{children}</main>
//         </div>
//       </div>

//   );
// }


'use client';
import { ReactNode, useState } from "react";
import "../globals.css";
import { Sidebar } from "./user/_components/Sidebar";
import { Header } from "./user/_components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar with toggle state */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Pass toggle function to Header */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
