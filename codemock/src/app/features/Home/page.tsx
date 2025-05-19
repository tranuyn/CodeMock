"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import backgroundImage from "@/assets/images/background.svg";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import JobListingsSection from "./components/JobListingsSection";
import ChangeFutureSection from "./components/ChangeFutureSection";
import RecommendationsSection from "./components/RecommendationsSection";

export default function Home() {
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
        <JobListingsSection />
        <ChangeFutureSection />
        <RecommendationsSection />
      </Box>
    </Box>
  );
}
