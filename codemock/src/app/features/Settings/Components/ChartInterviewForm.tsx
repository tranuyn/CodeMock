"use client";
import { Box } from "@mui/material";
import styles from "../setting.module.css";
import { AuthState } from "@/store/types";
import { PieChart } from "@mui/x-charts/PieChart";
interface FormProp {
  user: AuthState;
}

const valueFormatter = (item: { value: number }) => `${item.value} lần`;

const ChartInterviewForm = ({ user }: FormProp) => {
  return (
    <Box className={styles.formContainer} style={{ padding: "20px" }}>
      <p style={{ fontWeight: 600, fontSize: "120%", marginBottom: "10px" }}>
        Lịch sử phỏng vấn của bạn 
      </p>
      <PieChart
        className={styles.chart}
        series={[
          {
            data: [
              { value: user.totalInterviews, label : "Số buổi phỏng vấn", },
              { value: user.warning_count, label: "Số lần vi phạm" },
            ],
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter,
          },
        ]}
        width={300}
        height={300}
      />
    </Box>
  );
};

export default ChartInterviewForm;
