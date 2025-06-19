"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import backgroundImage from "@/assets/images/background.svg";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import JobListingsSection from "./components/JobListingsSection";
// Ensure JobListingsSection is a React component that accepts an 'interviews' prop
import ChangeFutureSection from "./components/ChangeFutureSection";
import RecommendationsSection from "./components/RecommendationsSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterviewsRequest } from "@/store/actions/interview-action";
import { RootState } from "@/store/redux";
import { InterviewInSchedule } from "../Schedule/page";

export interface MyInterviewProps {
  interviews: InterviewInSchedule[];
}

export default function Home() {
  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId && role) {
      dispatch(fetchInterviewsRequest({ userId, role: role as "MENTOR" | "CANDIDATE" }));
    }
  }, [userId, role]);

  const interviews = useSelector((state: RootState) => state.interviews.interviews || []);
  const upcomingInterviews = interviews.filter(
    (i: InterviewInSchedule) => i.data.status === "upcoming"
  );
  return (
    <Box component="main" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            zIndex: -10,
            filter: "brightness(0.65)",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, width: "100%"  }}>
        <Box
          sx={{ px: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            minHeight: "80vh",
          }}
        >
          <HeroSection />
          <StatsSection />
        </Box>
        <JobListingsSection interviews={upcomingInterviews}/>
        <ChangeFutureSection />
        <RecommendationsSection interviews={interviews} />
      </Box>
    </Box>
  );
}
