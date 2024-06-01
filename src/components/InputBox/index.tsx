import styles from "./styles.module.scss";

export default function InputBox({
  type,
  name,
  placeholder,
  pattern,
  required = false,
}: {
  type: string,
  name: string,
  placeholder: string,
  pattern?: string
  required?: boolean,
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