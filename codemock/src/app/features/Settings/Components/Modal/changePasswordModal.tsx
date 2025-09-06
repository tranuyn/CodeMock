"use client";
import { RootState } from "@/store/redux";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../setting.module.css";
import { Color } from "@/assets/Color";
import { AuthState, experience_detail } from "@/store/types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadImages } from "@/app/utils/cloudinary";
import { useForm, useFieldArray } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { UserActions } from "@/store/actions";
import InputComponent from "@/app/features/Interview/create-interview/Component/InputComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface SkillFormProp {
  user: AuthState;
  onClose: () => void;
}

const UpdatePasswordModal = ({ user, onClose }: SkillFormProp) => {
  const methods = useForm<{ password: string; confirm: string }>({
    defaultValues: {
      password: "",
      confirm: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
    setValue,
    register,
  } = methods;
  return (
    <>
      <InputComponent
        title="Mật khẩu"
        name="password"
        register={register}
        inputStyle={styles.customInput}
      />
      <InputComponent
        title="Xác nhận mật khẩu"
        name="confirm"
        register={register}
        inputStyle={styles.customInput}
      />
      <Box
        sx={{
          justifyContent: "flex-end",
          display: "flex",
          borderTop: "1px solid #ccc",
          margin: "20px -20px 0px -20px",
          padding: "20px 20px 0px 20px",
        }}
      >
        <button
          style={{
            background: Color.gradient,
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
          onClick={() => onClose}
        >
          Cập nhật mật khẩu
        </button>
      </Box>
    </>
  );
};

export default UpdatePasswordModal;
