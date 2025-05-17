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

const ExperienceForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Box className={styles.formContainer} style={{ padding: "20px 40px" }}>
      <Box
        className={styles.flexRow}
        sx={{ alignItems: "flex-end", marginBottom: "20px" }}
      >
        <div>
          <p className={styles.userName}>Kinh nghiệm</p>
          <p className={styles.bio}>
            Giới thiệu những thành tựu của bạn để thu hút nhà tuyển dụng
          </p>
        </div>

        <EditIcon sx={{ fontSize: "12" }} />
      </Box>

      <div className={styles.flexRow} style={{ alignItems: "flex-end" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <ExperienceCard
            position="Frontend Developer Intern"
            work_space="Spiraledge Cooporation VietNam"
            yearStart={2025}
            imageUrl="https://res.cloudinary.com/dzdso60ms/image/upload/v1746456780/rt9hnrcwz1ayqcrfbwyn.jpg"
          />
        </div>

        <Button
          sx={{
            width: "fit-content",
            background: Color.gradient,
            fontSize: "large",
            marginBottom: "10px",
          }}
          variant="contained"
        >
          Thêm kinh nghiệm
        </Button>
      </div>
    </Box>
  );
};

export default ExperienceForm;
