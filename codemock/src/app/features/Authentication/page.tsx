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
import Register from "./Register/page"; 
import Starfield from "@/app/components/Starfield";
import Link from "next/link";

const Authentication = () => {
  const [authMode, setAuthMode] = useState("login"); 

  const [isAnimating, setIsAnimating] = useState(false);
  
  const switchToLogin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuthMode("login");
      setIsAnimating(false);
    }, 300);
  };
  
  const switchToRegister = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuthMode("register");
      setIsAnimating(false);
    }, 300); 
  };

  return (
    <Box className={styles.loginContainer}>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className={styles.backgroundWrapper}>
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          style={{ objectFit: 'cover', objectPosition: '50% 35%' }}
          priority
        />
      </div>
      <Box className={styles.authContent}>
        <Box className={styles.leftSideContent}>
          <Link href="/" style={{ textDecoration: 'none'}}>
          <Image
            src={Logo}
            alt="logo"
            style={{ objectFit: 'contain', width: 200 }}
            priority
          />
          </Link>
          <Box className={styles.textContent}>
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
    </Box>
  );
};

export default Authentication;