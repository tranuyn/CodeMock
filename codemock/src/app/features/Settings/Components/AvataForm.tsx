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

const AvataForm = ({ user }: FormProp) => {
  const createdAt = new Date(user.createdAt); // Giả sử user.createdAt là chuỗi ISO
  const day = String(createdAt.getDate()).padStart(2, "0");
  const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = createdAt.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const bgUrl =
    "https://cellphones.com.vn/sforum/wp-content/uploads/2022/02/22-2.jpg";
  const [open, setOpen] = useState(false);
  return (
    <Box className={styles.formContainer}>
      <img className={styles.bgImg} src={bgUrl} />
      <Box className={styles.contentCtn}>
        <Box
          className={styles.flexRow}
          sx={{ alignItems: "flex-end", marginBottom: "20px" }}
        >
          <div className={styles.imgCtn}>
            {user.avataUrl ? (
              <Avatar
                alt={user.username}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                src={user.avataUrl}
              />
            ) : (
              <Avatar
                alt={user.username}
                sx={{
                  bgcolor: Color.purple,
                  width: "100%",
                  height: "100%",
                }}
                src="/static/images/avatar/2.jpg"
              />
            )}
          </div>
          <EditIcon
            fontSize="large"
            className={styles.editIcon}
            onClick={() => setOpen(true)}
          />
        </Box>

        <Box className={styles.flexRow} sx={{ padding: "0px 20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "60%",
            }}
          >
            <p className={styles.userName}>Hồ Kim Thiên Nga</p>
            <p className={styles.bio}>{user.biography || " "} </p>
            <p className={styles.in4}>
              <span style={{ color: "#6D6C6C" }}>
                Ho Chi Minh city, Viet Nam
              </span>
              <span> - </span>
              <span style={{ color: "#0074C2" }}>{user.email}</span>
              <span> - </span>
              <span style={{ color: "#0EA75D" }}>
                Đã tham gia từ {formattedDate}
              </span>
            </p>

            <p className={styles.avaPoint}>Điểm trung bình: 9.5</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "40%",
            }}
          >
            <ExperienceCard
              position="Student"
              work_space="University of Information Technology"
              yearStart={2022}
              imageUrl="https://res.cloudinary.com/dzdso60ms/image/upload/v1746456863/ixwtbjcdwd5orhswq4qw.png"
            />
            <ExperienceCard
              position="Frontend Developer Intern"
              work_space="Spiraledge Cooporation VietNam"
              yearStart={2025}
              imageUrl="https://res.cloudinary.com/dzdso60ms/image/upload/v1746456780/rt9hnrcwz1ayqcrfbwyn.jpg"
            />
          </div>
        </Box>
      </Box>
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Chỉnh sửa thông tin giới thiệu"
      >
        <UpdateAvataModal user={user} onClose={() => setOpen(false)} />
      </CustomModal>
    </Box>
  );
};

export default AvataForm;
