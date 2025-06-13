// src/components/JobListingsSection.jsx
"use client";

import { RootState } from "@/store/redux";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllInterviewSessions } from "@/api/interview/interview-session";
import InterviewSessionCard from "@/app/components/InterviewSessionCard";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

export default function JobListingsSection() {
  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [interviews, setInterviews] = useState<InterviewSessionResult[]>([]);
  const bookedSlotCount = interviews.reduce((count, session) => {
    const bookedInSession = session.interviewSlots.filter(
      (slot: { status: string }) => slot.status === "booked"
    ).length;
    return count + bookedInSession;
  }, 0);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const sessions =
          (await getAllInterviewSessions()) as InterviewSessionResult[];
        setInterviews(sessions);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };

    fetchInterviews();
  }, [userId]);

  return (
    <Container
      maxWidth={false}
      sx={{
        flex: 1,
        py: 6,
        bgcolor: "rgba(240, 240, 240, 0.65)",
        borderRadius: 2,
        backdropFilter: "blur(1px)",
        width: "94%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Bạn Có Buổi Phỏng Vấn Sắp Diễn Ra
        </Typography>
        <Link href="/schedule" passHref style={{ textDecoration: "none" }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            Xem tất cả lịch trình
          </Typography>
        </Link>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        gap={2}
        justifyContent="center"
        sx={{ margin: "0 auto" }}
      >
        {interviews.map((session) => {
          const bookedInSession = session.interviewSlots.filter(
            (slot) => slot.status === "booked"
          ).length;

          return (
            <Box key={session.sessionId}>
              <InterviewSessionCard
                session={session}
                bookedSlotCount={bookedInSession}
              />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
