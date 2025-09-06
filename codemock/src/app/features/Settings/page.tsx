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
import { Color } from "@/assets/Color";
import { useState } from "react";
import CustomModal from "@/app/components/Modal";
import UpdatePasswordModal from "./Components/Modal/changePasswordModal";

const SettingPage: NextPageWithLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
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
          <Box
            sx={{
              justifyContent: "flex-end",
              display: "flex",
              borderTop: "1px solid #ccc",
              margin: "20px -20px 0px -20px",
              padding: "20px 20px 0px 20px",
            }}
          >
            <button
              style={{
                background: Color.gradient,
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
              onClick={() => setOpen(true)}
            >
              Đổi mật khẩu
            </button>
          </Box>

          <CustomModal
            open={open}
            onClose={() => setOpen(false)}
            title="Chỉnh sửa hồ sơ"
          >
            <UpdatePasswordModal user={user} onClose={() => setOpen(false)} />
          </CustomModal>
        </Box>
      </Box>
    </ProtectedLayout>
  );
};

export default SettingPage;
