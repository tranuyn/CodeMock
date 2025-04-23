// InterviewDetails.tsx
import React from 'react';
import styles from '../Schedule.module.css';
import { Interview } from '../page';

interface InterviewDetailsProps {
  interview: Interview;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ interview }) => {
  return (
    <div className={styles.interviewDetails}>
      <h2 className={styles.detailsTitle}>Chi tiết lịch phỏng vấn</h2>
      <ul className={styles.detailsList}>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Tiêu đề:</span>
          <span className={styles.detailsValue}>{interview.title}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Chuyên ngành:</span>
          <span className={styles.detailsValue}>{interview.position}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Vị trí:</span>
          <span className={styles.detailsValue}>Intern</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Thời gian:</span>
          <span className={styles.detailsValue}>{`${interview.startTime} - ${interview.endTime}`}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Công nghệ:</span>
          <span className={styles.detailsValue}>
            {interview.technologies ? interview.technologies.join(', ') : 'N/A'}
          </span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsBullet}>•</span>
          <span className={styles.detailsLabel}>Người phỏng vấn:</span>
          <span className={styles.detailsValue}>{interview.interviewer || 'Chưa xác định'}</span>
        </li>
      </ul>
      <div className={styles.actionButtons}>
        <button className={styles.cancelButton}>Hủy</button>
        <button className={styles.joinButton}>Tham gia</button>
      </div>
    </div>
  );
};

export default InterviewDetails;