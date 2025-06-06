'use client'

import { Grid } from '@mui/material';
import React from 'react'
import { RootState } from "@/store/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllInterviewSessions } from "@/api/interview/interview-session";
import InterviewSessionCard from "@/app/components/InterviewSessionCard";
import { InterviewSessionResult } from '@/api/interview/interview-session.type';
function SearchingInterviews() {
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
    <div>
      <Grid container spacing={2} wrap="wrap"
        justifyContent="flex-start">
        {interviews.map((session) => {
          const bookedInSession = session.interviewSlots.filter((slot) => slot.status === "booked").length;

          return (
            <Grid sx={{ width: 300 }} key={session.sessionId}>
              <InterviewSessionCard session={session} bookedSlotCount={bookedInSession} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  )
}

export default SearchingInterviews
