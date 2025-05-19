"use client";
import { useState } from "react";
import { Container, Grid, Typography, Box, ListItem } from "@mui/material";
import SearchBar from "./components/SearchBar";
import FilterSection from "./components/FilterSection";
import InterviewCard from "./components/InterviewCard";

// Sample interview data - in production, this would come from an API
const sampleInterviews = [
  {
    id: 1,
    title: "[INTERN] Phỏng vấn Intern Front-end Developer ReactJS",
    description:
      "Front-end Developer, Master in ReactJs, Javascript, Typescript, html, css, bootstrap, sql basic",
    interviewer: "Jessica Mariana, Data Engineer",
    date: "27/03/2025",
    time: "14:00 - 14:30",
    status: "Chưa Có Đánh Giá",
    price: "50.000 VND",
    rating: null,
    score: "7/10",
  },
  {
    id: 2,
    title: "[INTERN] Phỏng vấn Intern Front-end Developer ReactJS",
    description:
      "Front-end Developer, Master in ReactJs, Javascript, Typescript, html, css, bootstrap, sql basic",
    interviewer: "Jessica Mariana, Data Engineer",
    date: "27/03/2025",
    time: "14:00 - 14:30",
    status: "",
    price: "50.000 VND",
    rating: 4.0,
    score: "3/10",
  },
  {
    id: 3,
    title: "[INTERN] Phỏng vấn Intern Front-end Developer ReactJS",
    description:
      "Front-end Developer, Master in ReactJs, Javascript, Typescript, html, css, bootstrap, sql basic",
    interviewer: "Jessica Mariana, Data Engineer",
    date: "27/03/2025",
    time: "14:00 - 14:30",
    status: "Chưa Có Đánh Giá",
    price: "Free",
    rating: null,
    score: "5/10",
  },
  {
    id: 4,
    title: "[INTERN] Phỏng vấn Intern Front-end Developer ReactJS",
    description:
      "Front-end Developer, Master in ReactJs, Javascript, Typescript, html, css, bootstrap, sql basic",
    interviewer: "Jessica Mariana, Data Engineer",
    date: "27/03/2025",
    time: "14:00 - 14:30",
    status: "",
    price: "50.000 VND",
    rating: 4.0,
    score: "5/10",
  },
];

// Past interview sessions
const pastInterviews = [
  {
    id: 101,
    title: "Junior - Frontend Developer",
    instructor: "Dr. Carol D. Pollock-Yurisch",
    timeSlot: "08:30 am - 10:30 am",
  },
  {
    id: 102,
    title: "Junior - Soft skill Improvement",
    instructor: "Dr. Donald J. Watson",
    timeSlot: "08:30 am - 10:30 am",
  },
];

export default function InterviewReviewAndFeedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInterviews, setFilteredInterviews] =
    useState(sampleInterviews);

  interface Interview {
    id: number;
    title: string;
    description: string;
    interviewer: string;
    date: string;
    time: string;
    status: string;
    price: string;
    rating: number | null;
    score: string;
  }

  type HandleSearch = (query: string) => void;

  const handleSearch: HandleSearch = (query) => {
    setSearchQuery(query);
    // Filter interviews based on search query
    if (query.trim() === "") {
      setFilteredInterviews(sampleInterviews);
    } else {
      const filtered = sampleInterviews.filter(
        (interview: Interview) =>
          interview.title.toLowerCase().includes(query.toLowerCase()) ||
          interview.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInterviews(filtered);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Left sidebar with filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          <ListItem>
            <FilterSection />
          </ListItem>
        </Grid>

        {/* Main content area */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Search bar section */}
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ListItem>
                <SearchBar
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearch(e.target.value)
                  }
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

          {/* Interview listings */}
          <Box>
            {filteredInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </Box>

          {/* Past interviews section */}
          <Box mt={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Bạn có buổi phỏng vấn
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "primary.main", mb: 2 }}
            >
              Ngày mai, 2022
            </Typography>

            {pastInterviews.map((session) => (
              <Box
                key={session.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  mb: 1,
                  bgcolor: "white",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#f5f5f5",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    color: "#666",
                  }}
                >
                  •
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {session.timeSlot}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {session.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {session.instructor}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
