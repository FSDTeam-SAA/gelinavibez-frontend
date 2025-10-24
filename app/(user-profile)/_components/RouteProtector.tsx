'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface RouteProtectorProps {
  children: ReactNode;
  allowedRoles?: string[]; // e.g. ['admin', 'manager']
}

export default function RouteProtector({ children,  }: RouteProtectorProps) {
  const session  = useSession();
  // const user=session.data?.user?.role
  // const router = useRouter();


  //  if(!user){
  //   router.push('/property')
  //  }
  

 

  return <>{children}</>;
}
