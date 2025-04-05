"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import styles from './Login.module.css';

const Login: React.FC<{ onSwitchToRegister: () => void }> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login", { email, password });
  };
  
  return (
    <Container component="main" sx={{ height: '90%' }}>
      <Paper
        elevation={1}
        className={styles.loginPaper}
      >
        <Box className={styles.formHeader}>
          <Typography variant="h4" className={styles.formTitle}>
            Đăng nhập
          </Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit} className={styles.formContainer}>
          <Box className={styles.formFieldsSection}>
            <Typography className={styles.fieldLabel}>
              Email / Username
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin='dense'
              required
              fullWidth
              id="email"
              placeholder="YourEmail@gmail.com / User name"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Typography className={styles.fieldLabel}>
              Mật khẩu
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin='dense'
              required
              fullWidth
              name="password"
              placeholder="Your Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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