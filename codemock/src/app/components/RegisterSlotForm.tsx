"use client"

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

interface RegisterSlotFormProps {
  open: boolean;
  onClose: () => void;
  slots: { 
    slotId: string;
    startTime: string;
    endTime: string;
    status: string;
    isPaid: boolean; }[]; 
  interviewId: string;
}

export default function RegisterSlotForm({
  open,
  onClose,
  slots,
  interviewId,
}: RegisterSlotFormProps) {
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [agree, setAgree] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedSlotId && cvFile && agree) {
      console.log("Đăng ký slot:", {
        slotId: selectedSlotId,
        cvFile,
        interviewId,
      });
      onClose();
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title="Bạn có chắc chắn muốn đăng ký phỏng vấn?">
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Typography fontWeight="bold">Chọn ca phỏng vấn bạn muốn đăng ký</Typography>

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
              <MenuItem key={slot.id} value={slot.id}>
                {new Date(slot.startTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </MenuItem>
            ))}
        </TextField>

        <Button variant="outlined" component="label">
          {cvFile ? cvFile.name : "Tải CV tại đây"}
          <input hidden type="file" onChange={handleFileChange} />
        </Button>

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
          <Button variant="outlined" color="primary" onClick={handleSubmit} disabled={!selectedSlotId || !cvFile || !agree}>
            Đăng ký
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}
