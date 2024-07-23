"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch("/api/user/logout");
        router.push("/");
      } catch (error: any) {
        console.log(error.message)      
      }
    }

    logout()
  }, [router])

  
  return null;
} 