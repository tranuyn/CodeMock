"use client";

import { Box } from "@mui/material";
import SearchBar from "./components/SearchBar";
import MajorChip from "./components/MajorChip";

export default function Schedule() {
    const handleSearch = (searchTerm: string, level: string, major: string) => {
        console.log("Searching for:", searchTerm, level, major);
    };
  return (
    <div>
        <SearchBar onSearch={handleSearch} />
        
        <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
            <MajorChip
                title="FullStack Web Dev" 
                count="10" 
                color="#2c5282" 
            />
            <MajorChip 
                title="UI/UX Designer" 
                count="04" 
                color="#2c5282" 
            />
        </Box>
    </div>
  );
}
