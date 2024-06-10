"use client"

import { UsersSchema } from "@/models/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

// skeleton 구조로 먼저 UI 표시ㅐ주기

export default function ProfilePage() {
  const [user, setUser] = useState<UsersSchema>();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/api/user/me");
      setUser(res.data.data);
    }
  
    getUser();
  })

  if (!user) {
    return <></>;
  }

  return (
    <main>
      <div className="m__size">
        <div className={`box-container ${styles["profile-box"]}`}>
          <h2>{user.nickname}</h2>
          <RowComponent property="유저 아이디" value={user.username} />
          <RowComponent property="유저 아이디" value={user.username} />
          <RowComponent property="유저 아이디" value={user.username} />
          <RowComponent property="유저 아이디" value={user.username} />
          <RowComponent property="유저 아이디" value={user.username} />
        </div>
      </div>
    </main>
  )
}

function RowComponent({
  property,
  value
}: {
  property: string,
  value: string
}) {
  return (
    <div className={styles["row"]}>
      <span>
        {property}
      </span>
      <span>
        {value}
      </span>
    </div>
  )
}