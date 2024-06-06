"use client"

import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push("/");
    } catch (error: any) {
      console.log(error.message)      
    }
  }

  logout()
  
  return (
    <></>
  )
}