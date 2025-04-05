"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Image from 'next/image';
import backgroundImage from '@/assets/images/background.svg';
import Logo from '@/assets/images/logo.svg';
import styles from './Authentication.module.css';
import Login from "./Login/page";
import Register from "./Register/page"; 
import Starfield from "@/app/components/Starfield";

const Authentication = () => {
  const [authMode, setAuthMode] = useState("login"); 

  const [isAnimating, setIsAnimating] = useState(false);
  
  const switchToLogin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuthMode("login");
      setIsAnimating(false);
    }, 300); // Thời gian chờ bằng với thời gian transition
  };
  
  const switchToRegister = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuthMode("register");
      setIsAnimating(false);
    }, 300); // Thời gian chờ bằng với thời gian transition
  };

  return (
    <Box className={styles.loginContainer}>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
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

      <Box className={`${styles.formContainer} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
        {authMode === "login" ? (
          <Login onSwitchToRegister={switchToRegister} />
        ) : (
          <Register onSwitchToLogin={switchToLogin} />
        )}
      </Box>
    </Box>
  );
};

export default Authentication;