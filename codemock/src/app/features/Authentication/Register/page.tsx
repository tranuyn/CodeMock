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
import styles from '../Login/Login.module.css';

const Register: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register", { email, username, password });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ ml: '45%' }}>
      <Paper
        elevation={1}
        className={styles.loginPaper}
      >
        <Typography variant="h4" className={styles.formTitle}>
          Đăng ký
        </Typography>
        
        <Typography className={styles.fieldLabel}>
          Nhập email để đăng ký
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className={styles.formContainer}>
          <TextField
            className={styles.customTextField}
            variant="filled"
            margin='dense'
            required
            fullWidth
            id="email"
            placeholder="YourEmail@gmail.com"
            name="email"
            // autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Typography className={styles.fieldLabel}>
            Tên người dùng
          </Typography>
          
          <TextField
            className={styles.customTextField}
            variant="filled"
            margin='dense'
            required
            fullWidth
            id="username"
            placeholder="Yourname"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            // autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={styles.continueButton}
          >
            Tiếp tục
          </Button>

          <Box className={styles.loginLink} sx={{ mt:1 }}>
            <Typography component="span" variant="body2">
              Bạn đã có tài khoản? {' '}
            </Typography>
            <Link
              component="button"
              variant="body2"
              className={styles.loginHereLink}
              onClick={onSwitchToLogin}
            >
              Đăng nhập ngay
            </Link>
          </Box>
          
          <Box className={styles.termsText}>
            <Typography variant="body2">
              {/* By registering you with our Terms and Conditions */}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;