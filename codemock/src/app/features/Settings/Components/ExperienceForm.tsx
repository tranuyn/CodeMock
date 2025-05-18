"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { RootState } from "@/store/redux";
import { Avatar, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "../setting.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { Color } from "@/assets/Color";
import ExperienceCard from "./ExperienceCard";
import CustomModal from "@/app/components/Modal";
import { useState } from "react";
import { AuthState } from "@/store/types";
import UpdateExperienceModal from "./Modal/UpdateExperienceModal";
import { UserActions } from "@/store/actions";

interface FormProp {
  user: AuthState;
}

const ExperienceForm = ({ user }: FormProp) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteExperience = () => {
    dispatch(
      UserActions.updateUserAction.request({
        experiences: undefined,
      })
    );
  };
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

        <EditIcon
          fontSize="large"
          className={styles.editIcon}
          onClick={() => setOpen(true)}
        />
      </Box>

      <div className={styles.flexRow} style={{ alignItems: "flex-end" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {user.experiences?.length > 0 &&
            user.experiences.map((item, index) => (
              <>
                {index > 0 && (
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "#ccc",
                      margin: "2px 0",
                    }}
                  />
                )}
                <ExperienceCard
                  position={item.position}
                  work_space={item.work_space}
                  yearStart={item.yearStart}
                  yearEnd={item.yearEnd}
                  url_company={item.url_company}
                />
              </>
            ))}
        </div>

        {user.experiences?.length > 0 && (
          <Button
            sx={{
              width: "fit-content",
              background: Color.gradient,
              fontSize: "large",
              marginBottom: "10px",
            }}
            variant="contained"
            onClick={() => deleteExperience()}
          >
            Xóa kinh nghiệm
          </Button>
        )}
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Chỉnh sửa thông tin kinh nghiệm"
      >
        <UpdateExperienceModal user={user} onClose={() => setOpen(false)} />
      </CustomModal>
    </Box>
  );
};

export default ExperienceForm;
