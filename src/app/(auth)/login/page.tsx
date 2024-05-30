import SubmitButton from "@/components/SubmitButton";
import styles from "./page.module.scss";
import SmallInputBox from "@/components/SmallInputBox";

export default function LoginPage() {
  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} >
        <section className={styles["main-content"]}>
          <Logo />
          <LoginForm />
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
      />
      <SmallInputBox
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        required={true}
        pattern="[A-Za-z0-9_]+"
      />
      <SubmitButton text="로그인" />
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