import styles from "./styles.module.scss";

export default function SubmitButton({
  text
}: {
  text: string
}) {
  return (
    <button className={styles["submit-button"]}>
      <span className="text">
        {text}
      </span>
    </button>
  )
}