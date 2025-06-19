// src/components/sections/RecommendationsSection.jsx
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
import { MyInterviewProps } from "../page";

export default function RecommendationsSection({
  interviews,
}: MyInterviewProps) {
  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [allInterviews, setAllInterviews] = useState<InterviewSessionResult[]>(
    []
  );
  const bookedSlotCount = allInterviews.reduce((count, session) => {
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
        setAllInterviews(sessions);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };
    fetchInterviews();
  }, [userId]);

  const upcomingInterviews = allInterviews.filter(
    (i: InterviewSessionResult) => i.status === "upcoming"
  );

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
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Đề Xuất Cho Bạn
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        gap={2}
        justifyContent="center"
        sx={{ margin: "0 auto" }}
      >
        {upcomingInterviews.map((session) => {
          const bookedInSession = session.interviewSlots.filter(
            (slot) => slot.status === "booked"
          ).length;

          return (
            <Box key={session.sessionId}>
              <InterviewSessionCard
                session={session}
                bookedSlotCount={bookedInSession}
                isMySession={interviews.some(
                  (interview) => interview.data.sessionId === session.sessionId
                )}
              />
            </Box>
          );
        })}
      </Box>

      {/* <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link href="/jobs" passHref style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Xem thêm</Button>
        </Link>
      </Box> */}
    </Container>
  );
}
