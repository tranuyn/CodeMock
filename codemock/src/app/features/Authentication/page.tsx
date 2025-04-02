"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Image from 'next/image';
import backgroundImage from '@/assets/images/background.svg';
import Logo from '@/assets/images/logo.svg';
import styles from './Authentication.module.css';
import Login from "./Login/page";
import Register from "./Register/page"; // Import component Register

const Authentication = () => {
  const [authMode, setAuthMode] = useState("login"); // State để quản lý mode hiện tại

  // Functions để chuyển đổi giữa các mode
  const switchToLogin = () => setAuthMode("login");
  const switchToRegister = () => setAuthMode("register");

  return (
    <Box className={styles.loginContainer}>
      <Image
        src={backgroundImage}
        alt="Background"
        fill
        style={{ objectFit: 'cover', objectPosition: '50% 35%' }}
        priority
      />
      
      <Box className={styles.leftSideContent}>
        <Image
          src={Logo}
          alt="logo"
          style={{ objectFit: 'contain', width: 200 }}
          priority
        />
        <Box>
          <Typography component="h1" className={styles.signInText}>
            {authMode === "login" ? "SIGN IN TO YOUR" : "REGISTER FOR YOUR"}
          </Typography>
          <Typography component="h1" className={styles.adventureText}>
            ADVENTURE!
          </Typography>
        </Box>
      </Box>

      {authMode === "login" ? (
        <Login onSwitchToRegister={switchToRegister} />
      ) : (
        <Register onSwitchToLogin={switchToLogin} />
      )}
    </Box>
  );
};

export default Authentication;