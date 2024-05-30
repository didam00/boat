import styles from "./styles.module.scss";

export default function SmallInputBox({
  type,
  name,
  placeholder,
  required,
  pattern,
}: {
  type: string,
  name: string,
  placeholder: string,
  required: boolean,
  pattern?: string
}) {
  return (
    <div className={styles["input-box"]}>
      <input 
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
      />
    </div>
  )
}