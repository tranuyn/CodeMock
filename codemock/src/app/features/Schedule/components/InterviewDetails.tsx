// InterviewDetails.tsx
import React from "react";
import styles from "../Schedule.module.css";
import { InterviewInSchedule } from "../page";
import { randomID } from "@/app/utils/zegocloud";

interface InterviewDetailsProps {
  interview: InterviewInSchedule;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ interview }) => {
  const joinMeeting = () => {
    const roomID = randomID(5);
    window.location.href = `http://localhost:3000/features/Meeting?roomID=${roomID}`;
  };
  return (
    <div className={styles.interviewDetails}>
      <h2 className={styles.detailsTitle}>Chi tiết lịch phỏng vấn</h2>
      <ul className={styles.detailsList}>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Tiêu đề:</span>
          <span className={styles.detailsValue}>{interview.display.title}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Chuyên ngành:</span>
          <span className={styles.detailsValue}>
            {interview.display.majors?.map((major) => major.name).join(", ")}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Vị trí:</span>
          <span className={styles.detailsValue}>
            {interview.display.level.name}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Thời gian:</span>
          <span
            className={styles.detailsValue}
          >{`${interview.display.startTime} - ${interview.display.endTime}`}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Công nghệ:</span>
          <span className={styles.detailsValue}>
            {interview.display.requiredTechnologies
              ? interview.display.requiredTechnologies
                  .map((technology) => technology.name)
                  .join(", ")
              : "N/A"}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Người phỏng vấn:</span>
          <span className={styles.detailsValue}>
            {interview.display.interviewer || "Chưa xác định"}
          </span>
        </li>
      </ul>
      <div className={styles.actionButtons}>
        <button className={styles.cancelButton}>Hủy</button>
        <button onClick={() => joinMeeting()} className={styles.joinButton}>
          Tham gia
        </button>
      </div>
    </div>
  );
};

export default InterviewDetails;
