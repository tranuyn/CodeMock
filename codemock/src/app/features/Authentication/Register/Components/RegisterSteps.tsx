import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import styles from "../../Login/Login.module.css";
import callApi from "@/store/redux-saga/common-saga";
import axios from "axios";
import { Detail } from "@/store/types";
import { useDispatch } from "react-redux";
import { Major } from "@/store/redux-saga/major-sagas";
import { Level } from "@/store/redux-saga/level-sagas";
import { Technology } from "@/store/redux-saga/technology-sagas";

export const Step1Form: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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

      <Typography
        className={styles.fieldLabel}
        sx={{ marginTop: errors.email ? 0.5 : 0 }}
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

      <Typography
        className={styles.fieldLabel}
        sx={{ marginTop: errors.username ? 0.5 : 0 }}
      >
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
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [majors, setMajors] = useState<Major[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const dispatch = useDispatch();

  const fetchDropdownOptions = useCallback(async () => {
    try {
      dispatch({
        type: "GET_ALL_MAJOR",
        callback: (data: Major[]) => {
          setMajors(data);
          console.log("Major", data);
        },
      });

      dispatch({
        type: "GET_ALL_LEVEL",
        callback: (data: Level[]) => {
          setLevels(data);
        },
      });

      dispatch({
        type: "GET_ALL_TECHNOLOGY",
        callback: (data: Technology[]) => {
          setTechnologies(data);
        },
      });
    } catch (error) {
      console.error("Failed to fetch dropdown options:", error);
    }
  }, []);

  useEffect(() => {
    console.log("Effect called");
    fetchDropdownOptions();
  }, []);

  return (
    <Box sx={{ marginBottom: errors.technologies ? 0.5 : 0 }}>
      <Typography className={styles.fieldLabel}>Chuyên ngành</Typography>
      <Controller
        name="profession"
        control={control}
        render={({ field }) => (
          <FormControl
            variant="filled"
            fullWidth
            required
            margin="dense"
            error={!!errors.profession}
          >
            <Select
              {...field}
              id="profession"
              multiple
              displayEmpty
              className={styles.customSelect}
            >
              <MenuItem value="" disabled>
                <em>Chọn lĩnh vực</em>
              </MenuItem>
              {majors.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.profession && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5, ml: 2 }}
              >
                {errors.profession?.message as string}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Typography className={styles.fieldLabel}>Trình độ chuyên môn</Typography>
      <Controller
        name="educationLevel"
        control={control}
        render={({ field }) => (
          <FormControl
            variant="filled"
            fullWidth
            required
            margin="dense"
            error={!!errors.educationLevel}
          >
            <Select
              {...field}
              onChange={(e) => field.onChange([e.target.value])}
              value={field.value?.[0] || ""}
              id="educationLevel"
              displayEmpty
              className={styles.customSelect}
            >
              <MenuItem value="" disabled>
                <em>Chọn trình độ</em>
              </MenuItem>
              {levels.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.educationLevel && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5, ml: 2 }}
              >
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
          <FormControl
            variant="filled"
            fullWidth
            required
            margin="dense"
            error={!!errors.technologies}
          >
            <Select
              {...field}
              id="technologies"
              displayEmpty
              multiple
              className={styles.customSelect}
            >
              <MenuItem value="" disabled>
                <em>Chọn công nghệ của bạn</em>
              </MenuItem>
              {technologies.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.technologies && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5, ml: 2 }}
              >
                {errors.technologies?.message as string}
              </Typography>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};

export const Step3Form: React.FC<{ email: string }> = ({ email }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Typography className={styles.fieldLabel}>Nhập mã xác nhận</Typography>
      <Controller
        name="verificationCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.customTextField}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="verificationCode"
            placeholder="Mã xác nhận đã được gửi đến email của bạn"
            inputProps={{ maxLength: 6 }}
            error={!!errors.verificationCode}
            helperText={
              errors.verificationCode?.message ? (
                (errors.verificationCode.message as string)
              ) : (
                <Typography sx={{ color: "#B1C5D9" }} component="span">
                  Mã xác nhận có 6 ký tự
                </Typography>
              )
            }
          />
        )}
      />
      <Typography className={styles.infoText} sx={{ mt: 3 }}>
        <i>
          Chúng tôi đã gửi mã xác nhận đến email {email}. Vui lòng kiểm tra hộp
          thư đến và spam của bạn.
        </i>
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
