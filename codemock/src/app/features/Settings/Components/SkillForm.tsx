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
import { AuthState } from "@/store/types";
import SkillCard from "./SkillCard";

interface SkillFormProp {
  user: AuthState;
}

const SkillForm = ({ user }: SkillFormProp) => {
  return (
    <Box className={styles.formContainer} style={{ padding: "20px 40px" }}>
      <Box
        className={styles.flexRow}
        sx={{ alignItems: "flex-end", marginBottom: "20px" }}
      >
        <div>
          <p className={styles.userName}>Kỹ năng</p>
          <p className={styles.bio}>
            50% nhà tuyển dụng dựa vào dữ liệu kỹ năng để tìm kiếm ứng viên phù
            hợp.
          </p>
        </div>
        <EditIcon sx={{ fontSize: "12" }} />
      </Box>

      <div className={styles.containerGrid}>
        <div className={styles.skillContainer}>
          <div className={styles.gradientBorder}>
            <p style={{ color: Color.purple, fontWeight: "bold" }}>Công nghệ</p>
            <ul className={styles.techList}>
              {user.technologies.map((item) => (
                <li key={item.id} className={styles.techItem}>
                  <SkillCard
                    title={item.name}
                    work_space="University of Information Technology"
                    imageUrl="https://res.cloudinary.com/dzdso60ms/image/upload/v1746456863/ixwtbjcdwd5orhswq4qw.png"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.skillContainer}>
          <div className={styles.gradientBorder}>
            <p style={{ color: Color.blue, fontWeight: "bold" }}>Chuyên môn</p>
            <ul className={styles.techList}>
              {user.majors?.map((item) => (
                <li key={item.id} className={styles.techItem}>
                  <SkillCard
                    title={item.name}
                    work_space="University of Information Technology"
                    imageUrl="https://res.cloudinary.com/dzdso60ms/image/upload/v1746456863/ixwtbjcdwd5orhswq4qw.png"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.skillContainer}>
          <div className={styles.gradientBorder}>
            <p style={{ color: Color.purple, fontWeight: "bold" }}>Kỹ năng</p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SkillForm;
