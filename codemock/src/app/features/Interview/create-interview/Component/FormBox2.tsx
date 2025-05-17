import { Control, UseFormRegister } from "react-hook-form";
import { InterviewFormData } from "../shema";
import styles from "../create-interview.module.css";
import { Box } from "@mui/material";
import { Color } from "@/assets/Color";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputComponent from "./InputComponent";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface GeneralInfoFormProps {
  register: UseFormRegister<InterviewFormData>;
  control: Control<InterviewFormData>;
}

const SlotTimeForm = ({ register, control }: GeneralInfoFormProps) => {
  return (
    <Box className={styles.formBox}>
      <h2 style={{ color: Color.blue }}>Thông tin chi tiết</h2>

      <Box className={styles.formFlexRow}>
        <InputComponent
          title="Số lượng ứng viên"
          name="slot_count"
          register={register}
        />
        <InputComponent
          title="Thời lượng ứng viên"
          name="slot_count"
          register={register}
        />
      </Box>

      <Box className={styles.formFlexRow}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Ngày phỏng vấn" />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Thời gian bắt đầu" />
        </LocalizationProvider>
      </Box>

      <InputComponent
        title="Phí đăng ký"
        name="slot_count"
        register={register}
      />
    </Box>
  );
};

export default SlotTimeForm;
