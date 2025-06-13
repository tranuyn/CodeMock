// components/InputComponent.tsx
import React from "react";
import { TextField } from "@mui/material";
import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputComponentProps<T extends FieldValues> {
  title: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  allowNumbers?: boolean;
  inputStyle?: string;
}

function InputComponent<T extends FieldValues>({
  title,
  name,
  register,
  error,
  allowNumbers = false,
  inputStyle,
}: InputComponentProps<T>) {
  return (
    <TextField
      fullWidth
      label={title}
      type={allowNumbers ? "number" : "text"}
      {...register(name)}
      error={!!error}
      helperText={error?.message}
      className={inputStyle}
      variant="outlined"
      size="small"
      margin="normal"
    />
  );
}

export default InputComponent;
