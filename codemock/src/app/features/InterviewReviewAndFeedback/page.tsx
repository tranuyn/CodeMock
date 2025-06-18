"use client";
import { useMemo, useState, useEffect } from "react";
import { Container, Grid, Typography, Box, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import FilterSection from "./components/FilterSection";
import InterviewCard from "./components/InterviewCard";
import InterviewMentorCard from "./components/InterviewMentorCard";
import { InterviewInSchedule } from "@/app/features/Schedule/page";
import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";
import dayjs from "dayjs";
import { RootState } from "@/store/redux";

// Utils
const formatTimeRange = (start: string, end: string) =>
  `${dayjs(start).format("HH:mm")} - ${dayjs(end).format("HH:mm")}`;

const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY");

// Fake: xử lý mapping đơn giản cho InterviewCard
const mapSlotToCard = (
  item: InterviewInSchedule
): InterviewSlotResult & {
  interviewer: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: string;
  avatarUrl: string;
} => {
  const slot = item.slotData!;
  const session = item.data;

  return {
    ...slot,
    interviewer: session.mentor.username,
    title: session.title,
    description: session.description,
    date: formatDate(slot.startTime),
    time: formatTimeRange(slot.startTime, slot.endTime),
    price:
      session.sessionPrice === 0 ? "Free" : `${session.sessionPrice.toLocaleString()} VND`,
    avatarUrl: session?.mentor?.avatarUrl ?? '',
  };
};

export default function InterviewReviewAndFeedback() {
  const interviews = useSelector(
    (state: RootState) => state.interviews.interviews || []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInterviews = useMemo(() => {
    if (!searchQuery.trim()) return interviews;

    return interviews.filter((item) => {
      const session = item.data;
      return (
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [interviews, searchQuery]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <ListItem>
            <FilterSection />
          </ListItem>
        </Grid>

        {/* Main */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Search & Filters */}
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ListItem>
                <SearchBar
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm buổi phỏng vấn đã tham gia"
                />
              </ListItem>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <ListItem>
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                    borderRadius: 1,
                    p: 1,
                    boxShadow: 1,
                  }}
                >
                  Lọc theo thời gian
                </Box>
              </ListItem>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <ListItem>
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                    borderRadius: 1,
                    p: 1,
                    boxShadow: 1,
                  }}
                >
                  Lọc theo kết quả
                </Box>
              </ListItem>
            </Grid>
          </Grid>

          {/* Interview listing */}
          <Box>
            {filteredInterviews.map((item) =>
              item.type === "SLOT" && item.slotData ? (
                <InterviewCard
                  key={item.slotData.slotId}
                  interview={mapSlotToCard(item)}
                />
              ) : (
                <InterviewMentorCard
                  key={item.data.sessionId}
                  session={item.data as InterviewSessionResult}
                />
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
