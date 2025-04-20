"use client";

import { Box, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MajorChip from "./components/MajorChip";
import { useState } from "react";

interface Major {
  id: string;
  name: string;
  slug: string;
}

export default function Searching() {
  const handleSearch = (searchTerm: string, level: string, major: string) => {
    console.log("Searching for:", searchTerm, level, major);
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

  const [selectedMajor, setSelectedMajor] = useState<Major[]>([]);

  const titles = [
    { id: "1", name: "FullStack Web Dev", slug: "fullstack-web-dev" },
    { id: "2", name: "Flutter Developer", slug: "flutter-developer" },
    { id: "3", name: "React Native Dev", slug: "react-native-dev" },
    { id: "4", name: "UI/UX Designer", slug: "ui-ux-designer" },
    { id: "5", name: "iOS Dev", slug: "ios-dev" },
    { id: "6", name: "Android Dev", slug: "android-dev" },
    { id: "7", name: "FullStack Web Dev", slug: "fullstack-web-dev" },
    { id: "8", name: "Flutter Developer", slug: "flutter-developer" },
    { id: "9", name: "React Native Dev", slug: "react-native-dev" },
    { id: "10", name: "UI/UX Designer", slug: "ui-ux-designer" },
    { id: "11", name: "iOS Dev", slug: "ios-dev" },
    { id: "12", name: "Android Dev", slug: "android-dev" },
  ];

  return (
    <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 2}}>
      <SearchBar onSearch={handleSearch} />
      <Box sx={{ bgcolor: "#EDF6FE" }}>
        <Typography
          fontSize="1rem"
          fontWeight="bold"
          color="#0A4D8C"
          mb={1}
          p={2}
        >
          Chọn chuyên ngành
        </Typography>
        <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap" }}>
          {titles.map((title, index) => (
            <Box
              key={index}
              onClick={() => handleChooseMajor(title)}
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
        </Box>
      </Box>
    </Box>
  );
}
