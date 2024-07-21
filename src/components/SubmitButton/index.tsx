import styles from "./styles.module.scss";

export default function SubmitButton({
  text
}: {
  text: string
}) {
  return (
    <button className={styles["submit-button"]} type="submit">
      <span className="text">
        {text}
      </span>
    </button>
  )
}