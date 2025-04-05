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
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Check from '@mui/icons-material/Check';
import type { StepIconProps } from '@mui/material/StepIcon';
import styles from "../Login/Login.module.css";

// Custom connector styling
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...(theme.applyStyles && theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    })),
  },
}));

// Custom step icon styling
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    ...(theme.applyStyles && theme.applyStyles('dark', {
      color: theme.palette.grey[700],
    })),
    ...(ownerState.active && {
      color: '#784af4',
    }),
  }),
);

// Custom step icon component
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const Register: React.FC<{ onSwitchToLogin: () => void }> = ({
  onSwitchToLogin,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const totalSteps = 3;
  const steps = ['', '', '']; // Empty strings for steps as you don't need labels

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext(); // Move to next step when form is submitted
    console.log("Register", { email, username, password });
  };

  // Calculate progress for progress bar
  const progress = (activeStep / (totalSteps - 1)) * 100;

  return (
    <Container component="main" sx={{ height: "90%" }}>
      <Paper elevation={1} className={styles.loginPaper}>
        <Box className={styles.formHeader}>
          <Typography variant="h4" className={styles.formTitle}>
            Đăng ký
          </Typography>
        </Box>
        
        {/* Custom Stepper replacing the LinearProgress */}
        <Box sx={{ width: '100%', mb: 2 }}>
          <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={QontoStepIcon}>{""}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Bước {activeStep + 1}/{totalSteps}
            </Typography>
            {activeStep > 0 && (
              <Button 
                size="small" 
                onClick={handleBack}
                startIcon={<KeyboardArrowLeft />}
              >
                Quay lại
              </Button>
            )}
          </Box>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className={styles.formContainer}
        >
          <Box className={styles.formFieldsSection}>
            <Typography className={styles.fieldLabel}>
              Nhập email để đăng ký
            </Typography>
            <TextField
              className={styles.customTextField}
              variant="filled"
              margin="dense"
              required
              fullWidth
              id="email"
              placeholder="YourEmail@gmail.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Typography className={styles.fieldLabel}>
              Tên người dùng
            </Typography>

            <TextField
              className={styles.customTextField}
              variant="filled"
              margin="dense"
              required
              fullWidth
              id="username"
              placeholder="Yourname"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Typography className={styles.fieldLabel}>Mật khẩu</Typography>

            <TextField
              className={styles.customTextField}
              variant="filled"
              margin="dense"
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
              endIcon={activeStep < totalSteps - 1 ? <KeyboardArrowRight /> : null}
              disabled={activeStep === totalSteps - 1}
            >
              {activeStep < totalSteps - 1 ? 'Tiếp tục' : 'Đăng ký'}
            </Button>

            <Box className={styles.loginLink} sx={{ mt: 1 }}>
              <Typography component="span" variant="body2">
                Bạn đã có tài khoản?{" "}
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