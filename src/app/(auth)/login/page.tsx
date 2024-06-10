"use client"

import styles from "./page.module.scss";
import SmallInputBox from "@/components/SmallInputBox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} >
        <BackgroundObjects />
        <section className={styles["main-content"]}>
          <Logo />
          <LoginForm />
          <ForgotPassword />
          <div style={{height: "4px"}}></div>
          <EnterRegisterPage />
        </section>
      </div>
    </main>
  )
}

function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submitAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const res = await axios.post("/api/user/login", data);
      router.back();
      
    } catch {
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={styles["form-container"]}
      onSubmit={submitAccount}
    >
      <SmallInputBox
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요"
        required={true}
        pattern="^[a-z]+[a-z0-9_]{5,19}$"
        autocomplete="on"
      />
      <SmallInputBox
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        required={true}
        pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z$`~!@$!%*#^?&-_=]{8,32}$"
      />
      <button type="submit" className={`submit-button`}>
        <span className={styles["text"]}>
          로그인
        </span>
      </button>
    </form>
  )
}

function Logo() {
  return (
    <div className={styles["typo_logo-container"]}>
      <img src="images/boat_typo.png" alt="typo logo" />
    </div>
  )
}

function ForgotPassword() {
  const router = useRouter();

  return (
    <div className={styles["forgot-password-container"]}
      onClick={() => {
        alert("새로 만드세요~!ㅋ");
        router.push("/register");
      }}
    >
      {/* <Link href="/"> */}
        비밀번호를 잃어버리셨나요?
      {/* </Link> */}
    </div>
  )
}

function EnterRegisterPage() {
  return (
    <div className={styles["enter-register-container"]}>
      <Link href="/register">
        아직 계정이 없으신가요? 회원가입 하러가기
      </Link>
    </div>
  )
}

function BackgroundObjects() {
  return (
    <div className={styles["background-objects"]}>
      <img src="/svgs/login-backobject.svg" />
      <img src="/svgs/login-backobject.svg" />
    </div>
  )
}