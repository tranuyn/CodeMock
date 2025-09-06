"use client";
import { Box } from "@mui/material";
import styles from "../setting.module.css";
import { AuthState } from "@/store/types";
import { useEffect, useState } from "react";
import { getAllInterviewSessions } from "@/api/interview/interview-session";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux";
import { call } from "redux-saga/effects";
import { handleError } from "@/store/redux-saga/common-saga";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

interface FormProp {
  user: AuthState;
}

const ComingSoonInterview = ({ user }: FormProp) => {
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [interviews, setInterviews] = useState<InterviewSessionResult[]>([]);
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const sessions =
          (await getAllInterviewSessions()) as InterviewSessionResult[];
        setInterviews(sessions);
      } catch (err) {
        call(handleError, err, true); //toast service
      }
    };

    if (user.id) {
      fetchInterviews();
    }
  }, [user.id]);
  return (
    <Box className={styles.formContainer} style={{ padding: "20px" }}>
      <p style={{ fontWeight: 600, fontSize: "120%", marginBottom: "10px" }}>
        Bạn có buổi phỏng vấn
      </p>
      <div className={styles.dateLine}>
        {interviews[0]?.status === "upcoming"
          ? "Sắp tới"
          : "Chưa có lịch phỏng vấn"}
        {interviews[0]?.status === "upcoming" && (
          <>
            <p>{formatDate(interviews[0]?.startTime)}</p>
            <div className={styles.line} />
          </>
        )}
      </div>
      <div>
        {interviews.length > 0 &&
          user.id === userId &&
          interviews[0]?.status === "upcoming" &&
          interviews[0].interviewSlots.map((item) => (
            <div className={styles.interviewCardContainer} key={item.slotId}>
              <span className={styles.detailsBullet}>•</span>
              <div className={styles.infoList}>
                <p>
                  {formatTime(item?.startTime)} - {formatTime(item.endTime)}
                </p>
                <p style={{ color: "#000" }}>{interviews[0].description}</p>
                <p>{interviews[0].mentor.username}</p>
              </div>
            </div>
          ))}
      </div>
    </Box>
  );
};

export default ComingSoonInterview;
