"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { RootState } from "@/store/redux";
import { Avatar, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "../setting.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { Color } from "@/assets/Color";
import ExperienceCard from "./ExperienceCard";
import { AuthState } from "@/store/types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadImages } from "@/app/utils/cloudinary";
import { useForm, UseFormRegister } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { useDesktopPicker } from "@mui/x-date-pickers/internals/hooks/useDesktopPicker";
import { UserActions } from "@/store/actions";

interface SkillFormProp {
  user: AuthState;
  onClose: () => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UpdateAvataModal = ({ user, onClose }: SkillFormProp) => {
  const methods = useForm<AuthState>({
    defaultValues: {
      biography: user.biography || "",
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
  const [preview, setPreview] = useState<string>(user.avataUrl || "");
  const [fileTemp, setFileTemp] = useState<File>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileTemp(file);
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const nothingChanged =
    !fileTemp && watch("biography") === (user.biography || "");

  const Reset = () => {
    setValue("avataUrl", user.avataUrl);
    setPreview(user.avataUrl);
    setValue("biography", user.biography);
  };

  const SaveUserBioAndAvata = async () => {
    if (!fileTemp) {
      dispatch(
        UserActions.updateUserAction.request({
          biography: getValues("biography"),
        })
      );
      onClose();
      return;
    }
    const urlAvata = await uploadImages(fileTemp);
    dispatch(
      UserActions.updateUserAction.request({
        avataUrl: urlAvata,
        biography: getValues("biography"),
      })
    );
    onClose();
  };

  return (
    <>
      <Box className={styles.flexRow}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={styles.imgCtn} style={{ width: "200px" }}>
            <Avatar
              alt={user.username}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={preview || "/static/images/avatar/2.jpg"}
            />
          </div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload ảnh
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </div>

        <div style={{ maxWidth: "600px", marginLeft: "20px" }}>
          <p>Tiểu sử</p>
          <textarea
            id="biography"
            {...register("biography")}
            rows={5}
            cols={40}
            placeholder="Nhập nội dung..."
            className={styles.bio1}
          />
        </div>
      </Box>

      <Box
        className={styles.flexRow}
        sx={{
          justifyContent: "flex-end",
          borderTop: "1px solid #ccc",
          margin: "20px -20px 0px -20px",
          padding: "20px 20px 0px 20px",
        }}
      >
        <button
          className={styles.buttonReject}
          disabled={loading}
          onClick={() => Reset()}
          style={{
            color: nothingChanged ? "#cccccc" : "black",
            cursor: nothingChanged ? "not-allowed" : "pointer",
          }}
        >
          Hủy
        </button>
        <button
          className={styles.buttonAcp}
          style={{
            background: nothingChanged ? "#cccccc" : Color.gradient,
            cursor: nothingChanged ? "not-allowed" : "pointer",
          }}
          disabled={loading || nothingChanged}
          onClick={() => SaveUserBioAndAvata()}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </Box>
    </>
  );
};

export default UpdateAvataModal;
