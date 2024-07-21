"use client"

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import axios from "axios";
import SmallInputBox from "@/components/SmallInputBox";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z$`~!@$!%*#^?&-_=]{8,32}$/;
const ID_PATTERN = /^[a-z]+[a-z0-9_]{6,20}$/;

export default function RegisterPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    name: "",
    phoneNumber: "",
    birthday: "",
    country: "",
    city: "",
    job: "",
    gender: ""
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  
  const submitAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const err: string[] = [];

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (data.gender !== "남성" && data.gender !== "여성") {
      err.push("성별은 남성 또는 여성으로 입력해주세요.");
    }
    
    if (data.password !== data.passwordCheck) {
      err.push("비밀번호가 일치하지 않습니다.");
    }
    
    if (!ID_PATTERN.test(data.username.toString())) {
      err.push("아이디는 대문자, 소문자, 숫자, 특수문자로 이루어져야하며 하나 이상의 문자와 숫자가 들어가야합니다.");
    }

    if (!PASSWORD_PATTERN.test(data.password.toString())) {
      err.push("비밀번호는 대문자, 소문자, 숫자, 특수문자로 이루어져야하며 하나 이상의 문자와 숫자가 들어가야합니다.");
    }

    if (data.phoneNumber.toString().includes("-")) {
      err.push("전화번호에는 -를 제외한 숫자만 입력해주세요.");
    }

    setErrorMessage(err);
    if (err.length > 0) return;

    try {
      const res = await axios.post("/api/user/register", data);
      router.back();
    } catch {
      
    }
  }

  return (
    <form className={styles["form-container"]} onSubmit={submitAccount}>
      <h2>회원가입</h2>
      <section>
        {/* <h5 className={styles["form-title"]}>계정</h5> */}
        <div className={styles["form-group"]}>
          {/* <label htmlFor="email">이메일</label> */}
          <SmallInputBox placeholder="이메일" name="email" type="email" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="username">아이디</label> */}
          <SmallInputBox placeholder="아이디" name="username" type="text" min="6" max="20" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="password">비밀번호</label> */}
          <SmallInputBox placeholder="비밀번호" min="8" max="32" name="password" type="password" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="passwordCheck">비밀번호 확인</label> */}
          <SmallInputBox placeholder="비밀번호 확인" name="passwordCheck" type="password" required />
        </div>
      </section>
      <section>
        {/* <h5 className={styles["form-title"]}>정보</h5> */}
        <div className={styles["form-group"]}>
          {/* <label htmlFor="nickname">별명</label> */}
          <SmallInputBox placeholder="별명" name="nickname" type="text" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="name">이름</label> */}
          <SmallInputBox placeholder="이름" name="name" type="text" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="phoneNumber">전화번호</label> */}
          <SmallInputBox placeholder="전화번호" name="phoneNumber" type="tel" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="birthday">생년월일</label> */}
          <SmallInputBox placeholder="생년월일" name="birthday" type="date" required />
        </div>
      </section>
      <section>
        {/* <h5 className={styles["form-title"]}>추가 정보</h5> */}
        <div className={styles["form-group"]}>
          {/* <label htmlFor="country">국가</label> */}
          <SmallInputBox placeholder="국가" name="country" type="text" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="city">도시</label> */}
          <SmallInputBox placeholder="도시" name="city" type="text" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="job">직업</label> */}
          <SmallInputBox placeholder="직업" name="job" type="text" required />
        </div>
        <div className={styles["form-group"]}>
          {/* <label htmlFor="gender">성별</label> */}
          <SmallInputBox placeholder="성별" name="gender" type="text" required />
        </div>
      </section>
      <SubmitButton text="가입" />
      <div className={styles["error-message"]}> {
        errorMessage.map(e =>
          <span>
            {e}
          </span>)
      } </div>
    </form>
  );
};