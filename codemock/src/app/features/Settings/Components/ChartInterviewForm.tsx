"use client";
import { Box } from "@mui/material";
import styles from "../setting.module.css";
import { AuthState } from "@/store/types";
import { PieChart } from "@mui/x-charts/PieChart";
interface FormProp {
  user: AuthState;
}
const desktopOS = [
  {
    label: "Windows",
    value: 72.72,
  },
  {
    label: "OS X",
    value: 16.38,
  },
  {
    label: "Linux",
    value: 3.83,
  },
];

const valueFormatter = (item: { value: number }) => `${item.value}%`;

const ChartInterviewForm = ({ user }: FormProp) => {
  return (
    <Box className={styles.formContainer} style={{ padding: "20px" }}>
      <p style={{ fontWeight: 600, fontSize: "120%", marginBottom: "10px" }}>
        Phỏng vấn của bạn
      </p>
      <PieChart
        className={styles.chart}
        series={[
          {
            data: desktopOS,
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
