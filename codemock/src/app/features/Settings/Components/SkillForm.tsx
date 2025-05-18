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
import CustomModal from "@/app/components/Modal";
import UpdateSkillModal from "./Modal/UpdateSkillModal";
import { useState } from "react";

interface SkillFormProp {
  user: AuthState;
}

const SkillForm = ({ user }: SkillFormProp) => {
  const [open, setOpen] = useState(false);
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
        <EditIcon
          fontSize="large"
          className={styles.editIcon}
          onClick={() => setOpen(true)}
        />
      </Box>

      <div className={styles.containerGrid}>
        <div className={styles.skillContainer}>
          <div className={styles.gradientBorder}>
            <p style={{ color: Color.purple, fontWeight: "bold" }}>Công nghệ</p>
            <ul className={styles.techList}>
              {user.technologies.map((item) => (
                <li key={item.id} style={{ padding: "10px 0" }}>
                  <a>{item.name}</a>
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
                <li key={item.id} style={{ padding: "10px 0" }}>
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.skillContainer}>
          <div className={styles.gradientBorder}>
            <p style={{ color: Color.purple, fontWeight: "bold" }}>Kỹ năng</p>
            <ul className={styles.techList}>
              {user.skill?.map((item) => (
                <li className={styles.techItem}>
                  <SkillCard
                    title={item.detail}
                    work_space={item.work_space}
                    url_company={item.url_company}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Chỉnh sửa thông tin giới thiệu"
      >
        <UpdateSkillModal user={user} onClose={() => setOpen(false)} />
      </CustomModal>
    </Box>
  );
};

export default SkillForm;
