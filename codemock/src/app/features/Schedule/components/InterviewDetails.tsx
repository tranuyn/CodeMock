"use client";
import React, { useTransition } from "react";
import styles from "../Schedule.module.css";
import { InterviewInSchedule } from "../page";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { parseSessionTime } from "@/app/utils/dateUtils";

interface InterviewDetailsProps {
  interview: InterviewInSchedule;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ interview }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const session = interview.data;

  const { start: startTime, end: endTime } = parseSessionTime(session);


  const joinMeeting = () => {
    startTransition(() => {
      router.push(`/features/Meeting/${session.roomId}`);
    });
  };

  return (
    <div className={styles.interviewDetails}>
      <h2 className={styles.detailsTitle}>Chi tiết lịch phỏng vấn</h2>
      <ul className={styles.detailsList}>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Tiêu đề:</span>
          <span className={styles.detailsValue}>
            {session.title ?? "Buổi phỏng vấn"}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Chuyên ngành:</span>
          <span className={styles.detailsValue}>
            {session.majors.map((major) => major.name).join(", ")}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Vị trí:</span>
          <span className={styles.detailsValue}>
            {session.level.name}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Thời gian:</span>
          <span className={styles.detailsValue}>
            {`${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")} (${format(startTime, "dd/MM/yyyy")})`}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Công nghệ:</span>
          <span className={styles.detailsValue}>
            {session.requiredTechnologies.map((tech) => tech.name).join(", ") || "N/A"}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Người phỏng vấn:</span>
          <span className={styles.detailsValue}>
            {session.mentor?.username || "Chưa xác định"}
          </span>
        </li>
      </ul>
      <div className={styles.actionButtons}>
        <button className={styles.cancelButton}>Hủy</button>
        <button
          onClick={joinMeeting}
          disabled={isPending}
          className={styles.joinButton}
        >
          {isPending ? "Đang tải..." : "Tham gia"}
        </button>
      </div>
    </div>
  );
};

export default InterviewDetails;
