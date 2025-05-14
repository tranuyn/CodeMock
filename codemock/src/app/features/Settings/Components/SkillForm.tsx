"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { RootState } from "@/store/redux";
import { Avatar, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../setting.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { Color } from "@/assets/Color";
import ExperienceCard from "./ExperienceCard";

const SkillForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Box className={styles.formContainer} style={{ padding: "20px 40px" }}>
      <div>
        <p className={styles.userName}>Kỹ năng</p>
        <p className={styles.bio}>
          50% nhà tuyển dụng dựa vào dữ liệu kỹ năng để tìm kiếm ứng viên phù
          hợp.
        </p>
      </div>

      <div className={styles.containerGrid}>
        <div className={styles.skillContainer}>
          <div className={styles.gradientBackground}></div>
          <div className={styles.gradientBorder}>
            <p>Công nghệ</p>
          </div>
        </div>

        <div className={styles.skillContainer}>
          <div className={styles.gradientBackground}></div>
          <div className={styles.gradientBorder}>
            <p>Chuyên môn</p>
          </div>
        </div>

        <div className={styles.skillContainer}>
          <div className={styles.gradientBackground}></div>
          <div className={styles.gradientBorder}>
            <p>Kỹ năng</p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SkillForm;
