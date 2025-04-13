// Register.tsx
"use client";
import React, { useState } from "react";
import { Box, Button, Container, Typography, Paper, Link } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import styles from "../Login/Login.module.css";

import CustomStepper from "./Components/CustomStepper";
import { Step1Form, Step2Form, Step3Form } from "./Components/RegisterSteps";
import { registerSchema, RegisterFormData } from "./schema";

import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "@/store/actions";
import { toastService } from "@/app/components/toast/toast.service";
import { RootState } from "@/store/redux";

const Register: React.FC<{ onSwitchToLogin: () => void }> = ({
  onSwitchToLogin,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;
  const steps = [
    "Thông tin cơ bản",
    "Thông tin chuyên môn",
    "Xác nhận tài khoản",
  ];
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  // Initialize form with react-hook-form and yup validation
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      profession: "",
      educationLevel: "",
      technologies: "",
      verificationCode: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const handleNext = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: (keyof RegisterFormData)[] = [];

    if (activeStep === 0) {
      fieldsToValidate = ["email", "username", "password"];
    } else if (activeStep === 1) {
      fieldsToValidate = ["profession", "educationLevel", "technologies"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    console.log(
      "Validation result:",
      isStepValid,
      "for fields:",
      fieldsToValidate
    );

    if (activeStep === 1 && isStepValid) {
      const technologiesToArray = getValues("technologies")
        .split(",")
        .map((item) => item.trim());
      dispatch(
        AuthActions.registerAction.request({
          username: getValues("username"),
          email: getValues("email"),
          password: getValues("password"),
          phone: getValues("email"),
          account_type: "LOCAL",
          role: "CANDIDATE",
          profession: getValues("profession"),
          educationLevel: getValues("educationLevel"),
          technologies: technologiesToArray,
          callback: () => {
            toastService.show({
              title: "Đã lưu thông tin đăng ký",
              description: "Kiểm tra email để nhận mã xác nhận!",
              variant: "success",
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          },
        })
      );
    } else {
      if (isStepValid && !loading) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        console.log("Validation errors:", errors);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: RegisterFormData) => {
    if (activeStep < totalSteps - 1) {
      handleNext();
    } else {
      dispatch(
        AuthActions.activeAccountAction.request({
          email: getValues("email"),
          code_id: getValues("verificationCode"),
          callback: () => {
            toastService.show({
              title: "Đăng ký thành công",
              description: "Tài khoản của bạn đã được kích hoạt",
              variant: "success",
            });
            onSwitchToLogin();
          },
        })
      );
    }
  };

  const canProceed = () => {
    if (activeStep === 0) {
      return !errors.email && !errors.username && !errors.password;
    } else if (activeStep === 1) {
      return (
        !errors.profession && !errors.educationLevel && !errors.technologies
      );
    } else if (activeStep === 2) {
      return !errors.verificationCode;
    }
    return false;
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Step1Form />;
      case 1:
        return <Step2Form />;
      case 2:
        return <Step3Form email={getValues("email")} />;
      default:
        return null;
    }
  };

  return (
    <Container
      component="main"
      sx={{
        height: "auto",
        minHeight: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingY: 2,
      }}
    >
      <Paper elevation={1} className={styles.loginPaper}>
        <Box className={styles.formHeader}>
          <Typography variant="h4" className={styles.formTitle}>
            Đăng ký
          </Typography>
        </Box>

        <Box className={styles.stepperContainer}>
          <CustomStepper
            activeStep={activeStep}
            steps={steps}
            className={`${
              activeStep > 0 ? styles.stepper_transition : styles.stepper
            }`}
          />

          {activeStep > 0 && (
            <Button
              className={styles.backButton}
              size="small"
              onClick={handleBack}
              startIcon={<KeyboardArrowLeft />}
            >
              Quay lại
            </Button>
          )}
        </Box>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          >
            <Box className={styles.formFieldsSection}>
              {renderStepContent()}
            </Box>

            <Box className={styles.formActionsSection}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                className={styles.continueButton}
                endIcon={
                  activeStep < totalSteps - 1 ? <KeyboardArrowRight /> : null
                }
                disabled={!canProceed() || loading}
                onClick={
                  activeStep < totalSteps - 1
                    ? handleNext
                    : handleSubmit(onSubmit)
                }
              >
                {activeStep < totalSteps - 1
                  ? loading
                    ? "Đang xử lý ..."
                    : "Tiếp tục"
                  : "Đăng ký"}
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

            {activeStep === totalSteps - 1 && (
              <Box className={styles.termsText}>
                <Typography variant="body2">
                  Bằng việc đăng ký, bạn đồng ý với Điều khoản sử dụng của chúng
                  tôi
                </Typography>
              </Box>
            )}
          </Box>
        </FormProvider>
      </Paper>
    </Container>
  );
};

export default Register;
