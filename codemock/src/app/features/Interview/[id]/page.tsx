"use client";

import { getInterviewSessionById, InterviewSessionResult } from "@/api/interview/interview_session";
import InterviewSessionDetail from "../Components.tsx/InterviewSessionDetail";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function InterviewSection({ params }: { params: { id: string } }) {
  const [interview, setInterview] = useState<InterviewSessionResult>();
  
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const sessions = await getInterviewSessionById(params.id) as InterviewSessionResult;
        setInterview(sessions);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };
    fetchInterviews();
  }, [params.id]);

  return (
    <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
      {interview ? <InterviewSessionDetail session={interview} /> : <div>Loading...</div>}
    </Box>
  );
}
