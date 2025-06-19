"use client";
import { Box } from "@mui/material";
import styles from "../setting.module.css";
import { AuthState } from "@/store/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UserActions } from "@/store/actions";
import { Color } from "@/assets/Color";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProp {
  user: AuthState;
}

const userInfoSchema = z.object({
  username: z.string().min(1, "Họ tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  phone: z.string().regex(/^\d{9,15}$/, "Số điện thoại phải gồm 9-15 chữ số"),
});

const UserInfoForm = ({ user }: FormProp) => {
  const methods = useForm<{
    username: string;
    email: string;
    phone: string;
    address: string;
  }>({
    defaultValues: {
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(userInfoSchema),
  });

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors, isDirty, isSubmitting },
    setValue,
    register,
  } = methods;

  const nothingChanged =
    watch("username") === (user.username || "") &&
    watch("phone") === (user.phone || "") &&
    watch("address") === (user.address || "") &&
    watch("email") === (user.email || "");

  const [loading, setLoading] = useState(false);

  const Reset = () => {
    setValue("username", user.username || "");
    setValue("address", user.address || "");
    setValue("phone", user.phone || "");
    setValue("email", user.email || "");
  };

  const dispatch = useDispatch();

  const onSubmit = async () => {
    setLoading(true);

    dispatch(
      UserActions.updateUserAction.request({
        username: getValues("username"),
        address: getValues("address"),
        phone: getValues("phone"),
        email: getValues("email"),
      })
    );

    setLoading(false);
  };

  return (
    <Box className={styles.formContainer} style={{ padding: "20px" }}>
      <p
        style={{
          fontWeight: 600,
          fontSize: "120%",
          paddingBottom: "20px",
          textAlign: "center",
          borderBottom: "1px solid #CBC7C7",
        }}
      >
        Thông tin cá nhân
      </p>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          <AccountCircleIcon sx={{ color: "#3E70A1" }} /> Họ tên
        </label>
        <input
          {...register("username")}
          placeholder={user?.username || "Nhập họ tên"}
          className={styles.inputField}
          // {...register(name, { required: true })}
        />
        {errors.username && (
          <p className={styles.errorText}>{errors.username.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          <MailOutlineIcon sx={{ color: "#3E70A1" }} /> Email
        </label>
        <input
          {...register("email")}
          placeholder={user?.email || "Nhập email"}
          className={styles.inputField}
          // {...register(name, { required: true })}
        />
        {errors.email && (
          <p className={styles.errorText}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          <PinDropIcon sx={{ color: "#3E70A1" }} /> Nơi ở
        </label>
        <input
          {...register("address")}
          placeholder={user?.address || "Nhập nơi ở"}
          className={styles.inputField}
          // {...register(name, { required: true })}
        />
        {errors.address && (
          <p className={styles.errorText}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>
          <PhoneOutlinedIcon sx={{ color: "#3E70A1" }} /> Số điện thoại
        </label>
        <input
          {...register("phone")}
          placeholder={user?.phone || "Nhập số điện thoại"}
          className={styles.inputField}
          // {...register(name, { required: true })}
        />
        {errors.phone && (
          <p className={styles.errorText}>{errors.phone.message}</p>
        )}
      </div>

      <Box
        className={styles.flexRow}
        sx={{
          borderTop: "1px solid #ccc",
          marginTop: "30px",
          paddingTop: "30px",
          gap: "20px",
        }}
      >
        <button
          className={styles.buttonReject}
          disabled={loading || nothingChanged}
          onClick={() => Reset()}
          style={{
            color: nothingChanged ? "#cccccc" : "black",
            cursor: nothingChanged ? "not-allowed" : "pointer",
            width: "80%",
            marginRight: "0",
          }}
        >
          Hủy
        </button>
        <button
          className={styles.buttonAcp}
          style={{
            background: nothingChanged ? "#cccccc" : Color.gradient,
            cursor: nothingChanged ? "not-allowed" : "pointer",
            width: "80%",
          }}
          disabled={loading || nothingChanged}
          type="submit"
          onClick={() => onSubmit()}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </Box>
    </Box>
  );
};

export default UserInfoForm;
