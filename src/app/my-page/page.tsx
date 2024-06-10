"use client"

import { UsersSchema } from "@/models/Users";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

// skeleton 구조로 먼저 UI 표시ㅐ주기

export default function ProfilePage() {
  const [user, setUser] = useState<UsersSchema>();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/api/user/me");
      setUser(res.data.data);
    }
  
    getUser();
  }, [])

  if (!user) {
    return <></>;
  }

  return (
    <main>
      <div className="m__size">
        <div className={`box-container ${styles["profile-box"]}`}>
          <h2>{user.nickname}</h2>
          <RowComponent property="이메일" value={user.email} />
          <RowComponent property="유저 아이디" value={user.username} />
          <RowComponent property="이름" value={user.name} />
          <RowComponent property="전화번호" value={user.phoneNumber} />
          <RowComponent property="지역" value={user.address.country + " " + user.address.city} />
          {/* <RowComponent property="생일" value={`${user.birth.getFullYear()}년 ${user.birth.getMonth()+1}월 ${user.birth.getDate()}일`} /> */}
          <RowComponent property="직업" value={user.job} />
          <RowComponent property="성별" value={user.gender} />
          <div className={styles["row"]} style={{justifyContent: "right"}}>
            <button className={`submit-button`} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              router.push("/logout");
            }}>로그아웃</button>
          </div>
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