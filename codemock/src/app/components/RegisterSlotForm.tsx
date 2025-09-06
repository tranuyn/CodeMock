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
  Avatar,
} from "@mui/material";
import CustomModal from "./Modal";
import {
  createPaymentToRegister,
  registerInterviewSlot,
} from "@/api/interview-slot/interview-slot";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux";
import { toastService } from "@/app/components/toast/toast.service";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TermsModal from "./TermsModal";

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
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "coin" | "">("");
  const candidateId = useSelector((state: RootState) => state.auth.user.id);

  const handleCodemockCoinSubmit = async () => {
    setLoading(true);
    try {
      await registerInterviewSlot(selectedSlotId, {
        candidateId,
        resumeUrl,
        payByCodemockCoin: true,
      });

      toastService.show({
        title: "Đăng ký thành công",
        description: "Bạn đã đăng ký slot bằng Codemock Coin.",
        variant: "success",
      });

      onClose();
      setSelectedSlotId("");
      setResumeUrl("");
      setAgree(true);
      setPaymentMethod("");
      window.location.reload();
    } catch (error: any) {
      toastService.show({
        title: "Lỗi",
        description: error?.response?.data?.message || "Đăng ký thất bại",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMomoPayment = async () => {
    if (!selectedSlotId || !resumeUrl || !agree) return;

    try {
      const extraData = JSON.stringify({
        candidateId,
        resumeUrl,
      });

      const res = await createPaymentToRegister({
        amount: "50000",
        orderInfo: selectedSlotId,
        extraData: extraData,
      });

      if (res?.payUrl) {
        window.location.href = res.payUrl; // ✅ Redirect tới trang MoMo
      } else {
        toastService.show({
          title: "Lỗi",
          description: "Không thể khởi tạo giao dịch MoMo",
          variant: "error",
        });
      }
    } catch (error: any) {
      toastService.show({
        title: "Lỗi MoMo",
        description: error?.response?.data?.message || "Thanh toán thất bại",
        variant: "error",
      });
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
                })}{" "}
                -{" "}
                {new Date(slot.endTime).toLocaleTimeString("vi-VN", {
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
              <span
                onClick={() => setOpenTermsModal(true)}
                style={{ color: "#1976d2", textDecoration: "underline", cursor: "pointer" }}
              >
                điều khoản và quy định
              </span>{" "}
              tham gia phỏng vấn của HireU
            </Typography>
          }
        />

        <Box>
          <FormControl>
            <Typography fontWeight="bold">
              Chọn phương thức thanh toán
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) =>
                setPaymentMethod(e.target.value as "momo" | "coin")
              }
            >
              <FormControlLabel
                value="momo"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography>Momo</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="coin"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://cdn-icons-png.flaticon.com/512/10692/10692946.png"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography>Codemock Coin</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Thoát
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              if (paymentMethod === "coin") handleCodemockCoinSubmit();
              else if (paymentMethod === "momo") handleMomoPayment();
            }}
            disabled={!selectedSlotId || !resumeUrl || !agree || loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </Box>
      </Box>
      <TermsModal open={openTermsModal} onClose={() => setOpenTermsModal(false)} />
    </CustomModal>
  );
}
