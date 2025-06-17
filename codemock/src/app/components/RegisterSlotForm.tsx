"use client";

import React, { useState } from "react";
import {
  Button,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Link,
} from "@mui/material";
import CustomModal from "./Modal";
import { registerInterviewSlot } from "@/api/interview-slot/interview-slot";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux";
import { toastService } from "@/app/components/toast/toast.service";

interface RegisterSlotFormProps {
  open: boolean;
  onClose: () => void;
  slots: {
    slotId: string;
    startTime: string;
    endTime: string;
    status: string;
    isPaid: boolean;
  }[];
  interviewId: string;
}

export default function RegisterSlotForm({
  open,
  onClose,
  slots,
  interviewId,
}: RegisterSlotFormProps) {
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const candidateId = useSelector(
    (state: RootState) => state.auth.user.id
  );

  const handleSubmit = async () => {
    if (!selectedSlotId || !resumeUrl || !agree) return;

    setLoading(true);
    try {
      await registerInterviewSlot(selectedSlotId, {
        candidateId,
        resumeUrl,
      });

      toastService.show({
        title: "Đăng ký thành công",
        description: "Bạn đã đăng ký slot phỏng vấn thành công.",
        variant: "success",
      });

      onClose();
      setSelectedSlotId("");
      setResumeUrl("");
      setAgree(true);
    } catch (error: any) {
      toastService.show({
        title: "Lỗi",
        description:
          error?.response?.data?.message || "Đăng ký thất bại",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Bạn có chắc chắn muốn đăng ký phỏng vấn?"
    >
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Typography fontWeight="bold">
          Chọn ca phỏng vấn bạn muốn đăng ký
        </Typography>

        <TextField
          select
          value={selectedSlotId}
          onChange={(e) => setSelectedSlotId(e.target.value)}
          fullWidth
          placeholder="Nhấn để chọn"
        >
          {slots
            .filter((slot) => slot.status !== "booked")
            .map((slot) => (
              <MenuItem key={slot.slotId} value={slot.slotId}>
                {new Date(slot.startTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          label="Link CV (Google Drive, Dropbox...)"
          placeholder="https://drive.google.com/..."
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography>
              Tôi đồng ý với{" "}
              <Link href="#" target="_blank">
                điều khoản và quy định
              </Link>{" "}
              tham gia phỏng vấn của HireU
            </Typography>
          }
        />

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Thoát
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedSlotId || !resumeUrl || !agree || loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}
