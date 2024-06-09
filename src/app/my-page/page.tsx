"use client"

import axios from "axios"
import { useState } from "react";

export default function ProfilePage() {
  const [username, setUsername] = useState("nothing");

  const getUser = async () => {
    const res = await axios.get("/api/user/me");
    setUsername(res.data.data._id);
  }

  return (
    <div className="m__container">
      <h2>
        {username}
      </h2>
    </div>
  )
}