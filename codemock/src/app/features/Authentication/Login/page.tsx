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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormData } from "./schema";
import styles from './Login.module.css';

const Login: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login", data);
  };

  return (
    <Container component="main" sx={{ height: '90%', overflow: 'auto' }}>
      <Paper
        elevation={1}
        className={styles.loginPaper}
      >
        <Box className={styles.formHeader}>
          <Typography variant="h4" className={styles.formTitle}>
            Đăng nhập
          </Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Box className={styles.formFieldsSection}>
            <Typography className={styles.fieldLabel}>
              Email / Username
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin='dense'
              fullWidth
              id="email"
              placeholder="YourEmail@gmail.com / User name"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            
            <Typography className={styles.fieldLabel} sx={{marginTop: errors.email ? 0.5 : 0}}>
              Mật khẩu
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin='dense'
              fullWidth
              placeholder="Your Password"
              type="password"
              id="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          
          <Box className={styles.formActionsSection}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.continueButton}
            >
              Đăng nhập
            </Button>
            
            <Box className={styles.loginLink} sx={{ mt: 1 }}>
              <Typography component="span" variant="body2">
                Bạn chưa có tài khoản? {' '}
              </Typography>
              <Link
                component="a"
                variant="body2"
                className={styles.loginHereLink}
                onClick={onSwitchToRegister}
              >
                Đăng ký ngay
              </Link>
            </Box>
            
            <Box className={styles.termsText}>
              <Typography variant="body2">
                {/* By registering you with our Terms and Conditions */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;