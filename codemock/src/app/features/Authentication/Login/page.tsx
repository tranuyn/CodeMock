"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "@/store/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RootState } from "@/store/redux";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập email hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
});

type LoginFormValue = z.infer<typeof formSchema>;

const Login: React.FC<{ onSwitchToRegister: () => void }> = ({
  onSwitchToRegister,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLogin = useSelector((state: RootState) => state.auth.access_token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleLoginSuccess = useCallback(() => {
    router.push("/features/Home");
    dispatch(AuthActions.clearError());
  }, [router, dispatch]);

  const onSubmit = (data: LoginFormValue) => {
    dispatch(
      AuthActions.loginAction.request({
        email: data.email,
        password: data.password,
        callback: () => {
          handleLoginSuccess();
        },
      })
    );
  };

  return (
    <Container component="main" sx={{ height: "90%", overflow: "auto" }}>
      <Paper elevation={1} className={styles.loginPaper}>
        <Box className={styles.formHeader}>
          <Typography variant="h4" className={styles.formTitle}>
            Đăng nhập
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <Box className={styles.formFieldsSection}>
            <Typography className={styles.fieldLabel}>
              Email / Username
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin="dense"
              fullWidth
              id="email"
              placeholder="YourEmail@gmail.com / Username"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Typography
              className={styles.fieldLabel}
              sx={{ marginTop: errors.email ? 0.5 : 0 }}
            >
              Mật khẩu
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin="dense"
              fullWidth
              placeholder="Your Password"
              type="password"
              id="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {/* Nếu có lỗi từ backend */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {typeof error === "string" ? error : "Đăng nhập thất bại"}
              </Alert>
            )}
          </Box>

          <Box className={styles.formActionsSection}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.continueButton}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>

            <Box className={styles.loginLink} sx={{ mt: 1 }}>
              <Typography component="span" variant="body2">
                Bạn chưa có tài khoản?{" "}
              </Typography>
              <Link
                component="button"
                variant="body2"
                className={styles.loginHereLink}
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToRegister();
                }}
              >
                Đăng ký ngay
              </Link>
            </Box>

            <Box className={styles.termsText}>
              <Typography variant="body2">{/* terms or notes */}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
