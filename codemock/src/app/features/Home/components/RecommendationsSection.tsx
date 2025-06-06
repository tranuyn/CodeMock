// src/components/sections/RecommendationsSection.jsx
"use client";

import { RootState } from "@/store/redux";
import { Box, Typography, Container, Grid, Button, Card, CardContent, CardActions, Chip } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllInterviewSessions } from "@/api/interview/interview-session";
import InterviewSessionCard from "@/app/components/InterviewSessionCard";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

export default function RecommendationsSection() {
  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [interviews, setInterviews] = useState<InterviewSessionResult[]>([]);
  const bookedSlotCount = interviews.reduce((count, session) => {
    const bookedInSession = session.interviewSlots.filter((slot: { status: string; }) => slot.status === "booked").length;
    return count + bookedInSession;
  }, 0);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const sessions = await getAllInterviewSessions() as InterviewSessionResult[];
        setInterviews(sessions);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };
    fetchInterviews();
  }, [userId]);

  return (
    <Container maxWidth={false} sx={{ flex: 1, py: 6, bgcolor: "rgba(240, 240, 240, 0.65)", borderRadius: 2, backdropFilter: 'blur(1px)', width: '94%' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Đề Xuất Cho Bạn
      </Typography>
      
      <Grid container spacing={2}>
        {interviews.map((session) => {
          const bookedInSession = session.interviewSlots.filter((slot) => slot.status === "booked").length;

          return (
            <Grid size={{ xs: 12, sm:6, md:4, lg: 3, xl: 2 }} key={session.sessionId}>
              <InterviewSessionCard session={session} bookedSlotCount={bookedInSession} />
            </Grid>
          );
        })}
      </Grid>
      
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link href="/jobs" passHref style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Xem thêm</Button>
        </Link>
      </Box>
    </Container>
  );
}