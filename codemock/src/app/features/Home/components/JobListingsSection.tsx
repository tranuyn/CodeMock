// src/components/JobListingsSection.jsx
"use client";

import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import Link from "next/link";
import InterviewSessionCard from "@/app/components/InterviewSessionCard";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";
import { MyInterviewProps } from "../page";

export default function JobListingsSection( {interviews} : MyInterviewProps) {
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
          const rawSession = session.data as InterviewSessionResult;

          const bookedInSession = rawSession.interviewSlots?.filter(
            (slot) => slot.status === "booked"
          ).length ?? 0;

          return (
            <Box key={session.data.sessionId}>
              <InterviewSessionCard
                session={rawSession}
                bookedSlotCount={bookedInSession}
                isMySession={true}
              />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
