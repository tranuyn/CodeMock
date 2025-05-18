// src/components/JobListingsSection.jsx
"use client";

import { RootState } from "@/store/redux";
import { Box, Typography, Container, Grid, Button, Card, CardContent, CardActions, Chip } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InterviewSessionResult } from "../../Schedule/page";
import { getAllInterviewSessions } from "@/api/interview/interview_session";

export default function JobListingsSection() {
  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [interviews, setInterviews] = useState<InterviewSessionResult[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const sessions = await getAllInterviewSessions() as InterviewSessionResult[];
        setInterviews(sessions);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };

    if (userId) {
      fetchInterviews();
    }
  }, [userId]);

  return (
    <Container maxWidth={false} sx={{ flex: 1, py: 6, bgcolor: "rgba(240, 240, 240, 0.65)", borderRadius: 2, backdropFilter: 'blur(1px)', width: '90%' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Bạn Có Buổi Phỏng Vấn Sắp Diễn Ra
        </Typography>
        <Link href="/schedule" passHref style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
            Xem tất cả lịch trình
          </Typography>
        </Link>
      </Box>
      
      <Grid container spacing={2}>
        {interviews.map((session) => {
          const start = new Date(session.startTime);
          const end = new Date(session.endTime ?? start.getTime() + session.totalSlots * session.slotDuration * 60000);
          const formattedTime = `${start.toLocaleDateString("vi-VN")} ${start.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}-${end.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
          const isFree = session.sessionPrice === 0;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={session.sessionId}>
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
                      <Chip
                        label="Free"
                        size="small"
                        sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", mr: 1 }}
                      />
                    ) : (
                      <Chip
                        label={`${session.sessionPrice.toLocaleString("vi-VN")}₫`}
                        size="small"
                        sx={{ bgcolor: "#fff3e0", color: "#ef6c00", mr: 1 }}
                      />
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {formattedTime}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "grey.300",
                        mr: 1,
                      }}
                    />
                    <Box>
                      <Typography variant="body2">{session.mentor?.username || "Mentor"}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {session.level?.name || ""}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {session.majors?.map(m => m.name).join(", ")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {session.requiredTechnologies?.map(t => t.name).join(", ")}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button variant="outlined" size="small" href={`/schedule`}>
                    Xem chi tiết
                  </Button>
                  <Button variant="contained" color="primary" size="small">
                    Đăng ký
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}