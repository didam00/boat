import React, { InputHTMLAttributes, KeyboardEventHandler } from "react";
import styles from "./styles.module.scss";

interface SmallInputBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

const SmallInputBox: React.FC<SmallInputBoxProps> = (props) => {
  return (
    <div className={styles["input-box"]}>
      <input {...props} />
    </div>
  );
};

export default SmallInputBox