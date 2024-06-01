import { KeyboardEventHandler } from "react";
import styles from "./styles.module.scss";

export default function SmallInputBox({
  type,
  name,
  placeholder,
  required = false,
  pattern,
  autocomplete = "off",
  onkeydown
}: {
  type: string,
  name: string,
  placeholder: string,
  required?: boolean,
  pattern?: string,
  autocomplete?: "on" | "off"
  onkeydown?: KeyboardEventHandler
}) {
  return (
    <div className={styles["input-box"]}>
      <input 
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        autoComplete={autocomplete}
        onKeyDown={onkeydown}
      />
    </div>
  )
}