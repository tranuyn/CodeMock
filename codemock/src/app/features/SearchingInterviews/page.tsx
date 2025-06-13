"use client";

import { Box, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MajorChip from "./components/MajorChip";
import { SetStateAction, useEffect, useState } from "react";
import SearchingInterviews from "./Interviews";
import { getAllInterviewSessions, searchInterviewSessions } from "@/api/interview/interview-session";
import { useDispatch, useSelector } from "react-redux";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";
import { getAllMajor } from "@/store/actions/major-action";
import { getAllLevel } from "@/store/actions/level-action";
import { Major } from "@/store/types/major.type";
import { Level } from "@/store/types/level.type";

export default function Searching() {
  const [selectedMajor, setSelectedMajor] = useState<Major[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [searchResults, setSearchResults] = useState<InterviewSessionResult[]>([]);


  const dispatch = useDispatch();
  const majors = useSelector((state: any) => state.majors.majors || []);
  const levels = useSelector((state: any) => state.levels.levels || []);

  useEffect(() => {
    dispatch(getAllMajor());
    dispatch(getAllLevel());
  }, [dispatch]);

  useEffect(() => {
    const fetchAll = async () => {
      const all = await getAllInterviewSessions();
      setSearchResults(all as InterviewSessionResult[]);
    };

    fetchAll();
  }, []);

  const handleSearch = async ({ searchTerm, level, majors }) => {
    const res = await searchInterviewSessions({
      search: searchTerm,
      levelId: level?.id,
      majorIds: majors.map((m: { id: string }) => m.id).join(','),
      pageNumber: 1,
      pageSize: 10,
      sortField: "createdAt",
      sortOrder: "DESC",
    });
    setSearchResults(res.data || []); 
  };

  const handleChooseMajor = (major: Major) => {
    console.log("Choosing major:", major);
    setSelectedMajor((prev) => {
      if (prev.some((m) => m.id === major.id)) {
        return prev.filter((m) => m.id !== major.id);
      } else {
        return [...prev, major];
      }
    });
  };

  return (
    <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 2}}>
      <SearchBar
        onSearch={handleSearch}
        selectedMajors={selectedMajor}
        onLevelChange={(level: SetStateAction<Level | null>) => setSelectedLevel(level)}
        onMajorsChange={setSelectedMajor}
        selectedLevel={selectedLevel}
        levels={levels}
        majors={majors}
      />
      <Box sx={{ bgcolor: "#EDF6FE", display: "flex", flexDirection: "column", width: "100%", p:2 }}>
        <Typography
          fontSize="1rem"
          fontWeight="bold"
          color="#0A4D8C"
          mb={1}
        >
          Chọn chuyên ngành
        </Typography>
        {/* <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap" }}>
          {titles.map((title, index) => (
            <Box
              key={index}
              onClick={() => handleChooseMajor(title.)}
              sx={{ cursor: "pointer" }}
            >
              <MajorChip
                key={title.id}
                title={title.name}
                count={10}
                isChoose={selectedMajor.some((m) => m.id === title.id)}
              />
            </Box>
          ))}
        </Box> */}
        <SearchingInterviews interviews={searchResults} />
      </Box>
    </Box>
  );
}
