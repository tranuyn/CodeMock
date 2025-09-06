'use client';

import { createRating } from "@/api/rating/rating";
import { toastService } from "@/app/components/toast/toast.service";
import { RootState } from "@/store/redux";
import { Box, Rating, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

interface RatingFormProps {
  slotId: string;
  mentorId: string;
  sessionId: string;
  onSuccess?: () => void;
}

export default function RatingForm({
  slotId,
  mentorId,
  sessionId,
  onSuccess
}: RatingFormProps) {
  const [value, setValue] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const userId = useSelector((state: RootState) => state.auth.user.id);

  const handleSubmit = async () => {
    if (!slotId || !mentorId || !sessionId || !userId) {
      toastService.show({
        title: "Thiếu thông tin",
        description: "Không thể gửi đánh giá do thiếu dữ liệu cần thiết.",
        variant: "error",
      });
      return;
    }

    if (!value || value === 0) {
      toastService.show({
        title: "Chưa chọn sao",
        description: "Vui lòng chọn số sao trước khi gửi đánh giá.",
        variant: "warning",
      });
      return;
    }

    try {
      await createRating({
        slot: { slotId },
        mentor: { id: mentorId },
        candidate: { id: userId },
        interviewSession: { sessionId },
        ratingStar: value,
        comment,
      });

      toastService.show({
        title: "Đã gửi đánh giá",
        description: "Cảm ơn bạn đã đánh giá chuyên gia.",
        variant: "success",
      });

      onSuccess?.();
    } catch (err) {
      console.error("Rating submit error:", err);
      toastService.show({
        title: "Lỗi",
        description: "Không thể gửi đánh giá. Vui lòng thử lại.",
        variant: "error",
      });
    }
  };

  return (
    <Box>
      <Rating
        value={value}
        onChange={(_, newVal) => setValue(newVal)}
        size="large"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Nhận xét của bạn"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Gửi đánh giá
      </Button>
    </Box>
  );
}
