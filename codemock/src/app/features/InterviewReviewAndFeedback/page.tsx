"use client";
import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import FilterSection from "./components/FilterSection";
import { RootState } from "@/store/redux";
import InterviewList from "./components/InterviewList";
import SearchBar from "./components/SearchBar";
import { searchInterviewSessions } from "@/api/interview/interview-session";
import { searchInterviewSlots } from "@/api/interview-slot/interview-slot";
import { InterviewInSchedule } from "../Schedule/page";
import { parseSortOption } from "@/app/utils/parseSortOption";
import { CircularProgress } from "@mui/material";

export default function InterviewReviewAndFeedback() {
  const [isLoading, setIsLoading] = useState(false);

  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [interviews, setInterviews] = useState<InterviewInSchedule[]>([]);
  const [filters, setFilters] = useState<{ slotDuration?: number; isFree?: boolean, majorIds?: string, levelId?: string }>({});

  useEffect(() => {
    if (userId && role) {
      handleSearch({ searchTerm: "", sortOption: "created_desc"});
    }
  }, [userId, role]);

  const handleSearch = async ({ searchTerm, sortOption, filters: passedFilters, } : { 
    searchTerm: string; 
    sortOption: string, 
    filters?: { slotDuration?: number; isFree?: boolean }
  }) => {
    setIsLoading(true);
    try {
      console.log(filters)
      const { sortField, sortOrder } = parseSortOption(sortOption);
      const params = {
        search: searchTerm,
        pageNumber: 1,
        pageSize: 10,
        status: 'done',
        sortField,
        sortOrder,
        ...(passedFilters ?? filters),
      };
      if (role === "MENTOR") {
        const res = await searchInterviewSessions(params);
        setInterviews(
          res.data.map((item) => ({
            type: "SESSION",
            data: item,
          }))
        );
      } else if (role === "CANDIDATE") {
        const res = await searchInterviewSlots(params);
        setInterviews(
          res.data.map((item) => ({
            type: "SLOT",
            data: item.interviewSession,
            slotData: item,
          }))
        );
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FilterSection
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              handleSearch({
                searchTerm: "",
                sortOption: "created_desc",
                filters: newFilters,
              });
            }}
          />
        </Grid>

        {/* Main content */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Search + Sort Controls */}
          <SearchBar
            onSearch={(searchTerm: string, sortOption: string) => {
              handleSearch({ searchTerm, sortOption });
            }}
          />
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress color="secondary"/>
            </Box>
          ) : (
            <InterviewList interviews={interviews} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
