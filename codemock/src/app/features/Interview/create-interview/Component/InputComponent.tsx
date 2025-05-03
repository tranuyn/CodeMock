// components/InputComponent.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "../create-interview.module.css";

interface InputComponentProps {
  title: string;
  allowNumbers?: boolean;
  register: UseFormRegister<any>; // Keep this as UseFormRegister
  name: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  title,
  allowNumbers = false,
  register,
  name,
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
        className={styles.inputField}
        {...register(name, { required: true })} // This is correct
      />
    </div>
  );
};

export default InputComponent;
