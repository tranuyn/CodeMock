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
import LevelForm from "./Components/LevelForm";
import ComingSoonInterview from "./Components/ComingSoonInterviewForm";
import ChartInterviewForm from "./Components/ChartInterviewForm";
import UserInfoForm from "./Components/UserInfoForm";

const SettingPage: NextPageWithLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <ProtectedLayout allowedRoles={["CANDIDATE", "MENTOR"]}>
      <Box className={styles.container}>
        <Box className={styles.leftContainer}>
          <AvataForm user={user} />
          <EducationForm user={user} />
          <ExperienceForm user={user} />
          <SkillForm user={user} />
        </Box>
        <Box className={styles.rightContainer}>
          <LevelForm user={user} />
          <ComingSoonInterview user={user} />
          <ChartInterviewForm user={user} />
          <UserInfoForm user={user} />
        </Box>
      </Box>
    </ProtectedLayout>
  );
};

export default SettingPage;
