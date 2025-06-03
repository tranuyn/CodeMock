"use client";

import { useState } from "react";
import { RootState } from "@/store/redux";
import { Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../setting.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { Color } from "@/assets/Color";
import ExperienceCard from "./ExperienceCard";
import CustomModal from "@/app/components/Modal";
import { AuthState } from "@/store/types";
import UpdateAvataModal from "./UpdateAvataModal";

interface FormProp {
  user: AuthState;
}

const LevelForm = ({ user }: FormProp) => {
  return (
    <Box className={styles.formContainer} style={{ padding: "20px" }}>
      <div
        style={{
          borderBottom: "1px solid #e2e1e1",
          marginBottom: "10px",
          paddingBottom: "5px",
        }}
      >
        <p style={{ fontWeight: 600, fontSize: "110%", marginBottom: "5px" }}>
          Trạng thái
        </p>
        <p style={{ fontWeight: 400, marginBottom: "5px", color: "#6D6C6C" }}>
          {user.role} - {user.levels[0].name}
        </p>
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: "110%", marginBottom: "5px" }}>
          URL hồ sơ
        </p>
        <p style={{ fontWeight: 400, color: "#6D6C6C" }}>
          www.hireu.com/profile/ho-kim-thien-nga-630611319
        </p>
      </div>
    </Box>
  );
};

export default LevelForm;
