"use client";

import { InterviewSessionResult } from "@/api/interview/interview_session";
import { Card, CardContent, CardActions, Typography, Box, Chip, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface InterviewSessionCardProps {
  session: InterviewSessionResult;
  bookedSlotCount: number;
}

export default function InterviewSessionCard({ session, bookedSlotCount }: InterviewSessionCardProps) {
  const router = useRouter();
  const start = new Date(session.startTime);
  const end = new Date(session.endTime ?? start.getTime() + session.totalSlots * session.slotDuration * 60000);
  const formattedTime = `${start.toLocaleDateString("vi-VN")} ${start.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}-${end.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
  const isFree = session.sessionPrice === 0;
  const handleDetailClick = () => {
    router.push(`/features/Interview/${session.sessionId}`);
  };

  return (
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
        <Typography variant="h6" gutterBottom>
          {session.description || "Buổi phỏng vấn"}
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "grey.300", mr: 1 }} />
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
        <Button variant="contained" color="primary" size="small">
          Đăng ký
        </Button>
      </CardActions>
    </Card>
  );
}
