import styles from "./page.module.scss";
import SmallInputBox from "@/components/SmallInputBox";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} >
        <section className={styles["main-content"]}>
          <Logo />
          <LoginForm />
          <ForgotPassword />
        </section>
      </div>
    </main>
  )
}

function LoginForm() {
  return (
    <form className={styles["form-container"]}>
      <SmallInputBox
        type="text"
        name="id"
        placeholder="아이디를 입력해주세요"
        required={true}
        pattern="[A-Za-z0-9_]+"
        autocomplete="on"
      />
      <SmallInputBox
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        required={true}
        pattern="[A-Za-z0-9_]+"
      />
      <button className={`submit-button`}>
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
  return (
    <div className={styles["forgot-password-container"]}>
      <Link href="/">
        혹시 비밀번호를 잃어버리셨나요?
      </Link>
    </div>
  )
}