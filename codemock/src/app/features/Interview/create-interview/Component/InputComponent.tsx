// components/InputComponent.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "../create-interview.module.css";

interface InputComponentProps {
  title: string;
  allowNumbers?: boolean;
  register?: UseFormRegister<any>; // Keep this as UseFormRegister
  name: string;
  inputStyle?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  title,
  allowNumbers = false,
  register,
  name,
  inputStyle,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.inputLabel}>
        {title}
      </label>
      <input
        type={allowNumbers ? "number" : "text"}
        id={name}
        placeholder={`Nhập ${title}`}
        className={`${styles.inputField} ${inputStyle}`}
        {...register(name, { required: true })} // This is correct
      />
    </div>
  );
};

export default InputComponent;
