import styles from "./layout.module.scss"

export default function AuthPage({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} >
        <BackgroundObjects />
        <section className={styles["main-content"]}>
          {/* <Logo /> */}
          { children }
        </section>
      </div>
    </main>
  )
}

function Logo() {
  return (
    <div className={styles["typo_logo-container"]}>
      <img src="images/boat_typo.png" alt="typo logo" />
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