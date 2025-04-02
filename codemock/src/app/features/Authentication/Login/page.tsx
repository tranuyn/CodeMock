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
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register", { email, password });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ ml: '45%' }}>
      <Paper
        elevation={1}
        className={styles.loginPaper}
      >
        <Typography variant="h4" className={styles.formTitle}>
          Đăng nhập
        </Typography>
        
        <Typography className={styles.fieldLabel}>
          Email / Username 
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className={styles.formContainer}>
          <TextField
            className={styles.customTextField}
            variant="filled"
            margin='dense'
            required
            fullWidth
            id="email"
            placeholder="YourEmail@gmail.com / User name"
            name="email"
            // autoComplete="email"
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
            Đăng nhập
          </Button>

          <Box className={styles.loginLink} sx={{ mt:1 }}>
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
      </Paper>
    </Container>
  );
};

export default Login;