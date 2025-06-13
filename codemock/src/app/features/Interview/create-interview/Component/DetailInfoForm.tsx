import { Control, Controller, UseFormRegister, FieldErrors } from "react-hook-form";
import styles from "../create-interview.module.css";
import { Box } from "@mui/material";
import { Color } from "@/assets/Color";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import InputComponent from "./InputComponent";
import { InterviewFormData } from "@/api/interview/interview-session.type";

interface GeneralInfoFormProps {
  register: UseFormRegister<InterviewFormData>;
  control: Control<InterviewFormData>;
  errors: FieldErrors<InterviewFormData>;
}

const SlotTimeForm = ({ register, control, errors }: GeneralInfoFormProps) => {
  return (
    <Box className={styles.formBox}>
      <h2 style={{ color: Color.blue }}>Thông tin chi tiết</h2>

      <Box className={styles.formFlexRow}>
        <InputComponent
          title="Số lượng ứng viên"
          name="totalSlots"
          allowNumbers
          register={register}
          error={errors.totalSlots}
        />
        <InputComponent
          title="Thời lượng ứng viên"
          name="slotDuration"
          allowNumbers
          register={register}
          error={errors.slotDuration}
        />
      </Box>

      <Box className={styles.formFlexRow}>
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày phỏng vấn"
                format="DD/MM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newVal) => field.onChange(newVal?.toDate())}
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          name="time"
          control={control}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Thời gian bắt đầu"
                ampm={false}
                value={field.value ? dayjs(field.value) : null}
                onChange={(newVal) => field.onChange(newVal?.toDate())}
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />
      </Box>

      <InputComponent
        title="Phí đăng ký"
        name="sessionPrice"
        allowNumbers
        register={register}
        error={errors.sessionPrice}
      />
    </Box>
  );
};

export default SlotTimeForm;
