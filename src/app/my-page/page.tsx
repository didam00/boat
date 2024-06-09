"use client"

import axios from "axios";
import { useState } from "react";

// skeleton 구조로 먼저 UI 표시ㅐ주기

export default function ProfilePage() {
  const [username, setUsername] = useState("nothing");

  const getUser = async () => {
    const res = await axios.get("/api/user/me");
    setUsername(res.data.data._id);
  }

  getUser();

  return (
    <div className="m__container">
      <h2>
        {username}
      </h2>
    </div>
  )
}