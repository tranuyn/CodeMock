"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { RootState } from "@/store/redux";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./setting.module.css";
import AvataForm from "./Components/AvataForm";
import EducationForm from "./Components/EducationForm";
import ExperienceForm from "./Components/ExperienceForm";
import SkillForm from "./Components/SkillForm";

const SettingPage: NextPageWithLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <ProtectedLayout allowedRoles={["CANDIDATE", "MENTOR"]}>
      <Box className={styles.container}>
        <Box className={styles.leftContainer}>
          <AvataForm user={user} />
          <EducationForm />
          <ExperienceForm />
          <SkillForm user={user} />
        </Box>
        <Box className={styles.rightContainer}>Bên phải</Box>
      </Box>
    </ProtectedLayout>
  );
};

export default SettingPage;
