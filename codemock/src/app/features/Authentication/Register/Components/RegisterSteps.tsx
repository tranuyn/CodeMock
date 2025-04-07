import React, { Fragment } from "react";
import { Typography, TextField, FormControl, Select, MenuItem, Button, Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import styles from "../../Login/Login.module.css";

export const Step1Form: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Box sx={{ marginBottom: errors.password ? 0.5 : 0 }}>
      <Typography className={styles.fieldLabel}>
        Nhập email để đăng ký
      </Typography>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.customTextField}
            variant="filled"
            margin="dense"
            required
            fullWidth
            id="email"
            placeholder="YourEmail@gmail.com"
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
        )}
      />

      <Typography className={styles.fieldLabel} 
            sx={{marginTop: errors.email ? 0.5 : 0}}
            >
        Tên người dùng
      </Typography>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.customTextField}
            variant="filled"
            margin="dense"
            required
            fullWidth
            id="username"
            placeholder="Yourname"
            error={!!errors.username}
            helperText={errors.username?.message as string}
          />
        )}
      />

      <Typography className={styles.fieldLabel}
            sx={{marginTop: errors.username ? 0.5 : 0}}>
        Mật khẩu
      </Typography>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.customTextField}
            variant="filled"
            margin="dense"
            required
            fullWidth
            id="password"
            placeholder="Your Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
        )}
      />
    </Box>
  );
};

export const Step2Form: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Box sx={{ marginBottom: errors.technologies ? 0.5 : 0 }}>
      <Typography className={styles.fieldLabel}>
        Lĩnh vực
      </Typography>
      <Controller
        name="profession"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" fullWidth required margin="dense" error={!!errors.profession}>
            <Select
              {...field}
              id="profession"
              displayEmpty
              className={styles.customSelect}
            >
              <MenuItem value="" disabled>
                <em>Chọn lĩnh vực</em>
              </MenuItem>
              <MenuItem value="it">Developer</MenuItem>
              <MenuItem value="qa">Quality Assurance</MenuItem>
              <MenuItem value="support">IT Support</MenuItem>
              <MenuItem value="data-science">Data Science</MenuItem>
              <MenuItem value="devops">DevOps</MenuItem>
              <MenuItem value="design">UI/UX Design</MenuItem>
              <MenuItem value="security">Cybersecurity</MenuItem>
              <MenuItem value="cloud">Cloud Computing</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {errors.profession && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.profession?.message as string}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Typography className={styles.fieldLabel}>
        Trình độ chuyên môn
      </Typography>
      <Controller
        name="educationLevel"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled" fullWidth required margin="dense" error={!!errors.educationLevel}>
            <Select
              {...field}
              id="educationLevel"
              displayEmpty
              className={styles.customSelect}
            >
              <MenuItem value="" disabled>
                <em>Chọn trình độ</em>
              </MenuItem>
              <MenuItem value="student">Sinh viên (Chưa có kinh nghiệm)</MenuItem>
              <MenuItem value="fresher">Mới tốt nghiệp (Intern)</MenuItem>
              <MenuItem value="junior">Fresher</MenuItem>
              <MenuItem value="junior">Junior (1-2 năm)</MenuItem>
              <MenuItem value="middle">Middle (3-5 năm)</MenuItem>
              <MenuItem value="senior">Senior (5+ năm)</MenuItem>
            </Select>
            {errors.educationLevel && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                {errors.educationLevel?.message as string}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Typography className={styles.fieldLabel}>
        Công nghệ sử dụng thành thạo
      </Typography>
      <Controller
        name="technologies"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.customTextField}
            variant="filled"
            margin="dense"
            required
            fullWidth
            id="technologies"
            placeholder="VD: React, Node.js, Python,..."
            helperText={errors.technologies?.message as string}
            error={!!errors.technologies}
          />
        )}
      />
    </Box>
  );
};

export const Step3Form: React.FC<{ email: string }> = ({ email }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <Typography className={styles.fieldLabel}>
        Nhập mã xác nhận
      </Typography>
      <Controller
        name="verificationCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.customTextField}
            variant="filled"
            margin='normal'
            required
            fullWidth
            id="verificationCode"
            placeholder="Mã xác nhận đã được gửi đến email của bạn"
            inputProps={{ maxLength: 6 }}
            error={!!errors.verificationCode}
            helperText={
              errors.verificationCode?.message ? (
                errors.verificationCode.message as string
              ) : (
                <Typography sx={{ color: '#B1C5D9' }} component="span">
                  Mã xác nhận có 6 ký tự
                </Typography>
              )
            }
          />
        )}
      />
      <Typography className={styles.infoText} sx={{ mt: 3 }}>
        <i>Chúng tôi đã gửi mã xác nhận đến email {email}. Vui lòng kiểm tra hộp thư đến và spam của bạn.</i>
      </Typography>
      <Button 
        variant="text"
        className={styles.backButton}
        onClick={() => console.log("Gửi lại mã xác nhận")}
      >
        Gửi lại mã
      </Button>
    </>
  );
};