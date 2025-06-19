"use client";

import { InterviewSessionResult } from "@/api/interview/interview-session.type";
import { Card, CardContent, CardActions, Typography, Box, Chip, Button, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import RegisterSlotForm from "./RegisterSlotForm";
import CancelSlotModal from "./Register&CancelSlotModal/CancelSlotModal";
import { useState } from "react";
import { toastService } from "./toast/toast.service";
import { InterviewInSchedule } from "../features/Schedule/page";
import { cancelInterviewSlot } from "@/api/interview-slot/interview-slot";
import { fetchInterviewsRequest } from "@/store/actions/interview-action";

interface InterviewSessionCardProps {
  session: InterviewSessionResult;
  bookedSlotCount: number;
  isMySession: boolean
  allMySlot?: InterviewInSchedule[]
}

export default function InterviewSessionCard({ session, bookedSlotCount, isMySession = false, allMySlot }: InterviewSessionCardProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const router = useRouter();
  const start = new Date(session.startTime);
  const end = new Date(session.endTime ?? start.getTime() + session.totalSlots * session.slotDuration * 60000);
  const formattedTime = `${start.toLocaleDateString("vi-VN")} ${start.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}-${end.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
  const isFree = session.sessionPrice === 0;
  const handleDetailClick = () => {
    router.push(`/features/Interview/${session.sessionId}`);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 3
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontSize: "1.1rem" }} gutterBottom>
            {session.title || "Buổi phỏng vấn"}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", mb: 1 }}>
            {isFree ? (
              <Chip label="Free" size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", mr: 1 }} />
            ) : (
              <Chip label={`${session.sessionPrice.toLocaleString("vi-VN")}₫`} size="small" sx={{ bgcolor: "#fff3e0", color: "#ef6c00", mr: 1 }} />
            )}
            <Typography variant="body2" color="text.secondary">
              {formattedTime}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
            <Avatar alt={session.mentor?.avatarUrl} src={session.mentor?.avatarUrl} />
            <Box>
              <Typography variant="body2">{session.mentor?.username || "Mentor"}</Typography>
              <Typography variant="caption" color="text.secondary">{session.level?.name || ""}</Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              Chuyên ngành: {session.majors?.map((m: { name: string; }) => m.name).join(", ")}
            </Typography>
            <Typography variant="body2">
              Công nghệ: {session.requiredTechnologies?.map((t: { name: string; }) => t.name).join(", ")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body2">
              {bookedSlotCount}/{session.totalSlots} Slot đã đăng ký
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Button variant="outlined" size="small" onClick={handleDetailClick}>
            Xem chi tiết
          </Button>
          {session.status !== 'upcoming' ? <></> : 
            <Button variant="contained" color="primary" size="small" 
            onClick={isMySession ? () => setIsCancelOpen(true) : () => setIsRegisterOpen(true)}>
              {isMySession ? 'Hủy đăng ký':'Đăng ký' }
            </Button>
          }
        </CardActions>
      </Card>
  
      <RegisterSlotForm
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        slots={session?.interviewSlots || []}
        interviewId={session?.sessionId || ""}
      />

      <CancelSlotModal
        open={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={async (reason) => {
          const mySlot = allMySlot?.find(i => i.data.sessionId === session.sessionId)?.slotData;
          if (!mySlot) {
            setIsCancelOpen(false);
            toastService.show({
              title: "Không tìm thấy slot",
              description: "Bạn chưa đăng ký hoặc slot đã bị xóa.",
              variant: "error",
            });
            return;
          }

          try {
            await cancelInterviewSlot(mySlot?.slotId, { cancelReason: reason });
            toastService.show({
              title: "Đã hủy đăng ký",
              description: "Hủy thành công!",
              variant: "success",
            });
            setIsCancelOpen(false);
             window.location.reload();
          } catch (err) {
            console.error(err);
            setIsCancelOpen(false);
            toastService.show({
              title: "Lỗi",
              description: "Không thể hủy đăng ký.",
              variant: "error",
            });
          }
        }}
      />
    </>
  );
}
