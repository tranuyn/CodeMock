// SearchBar.tsx
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string, sortOption: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('created_desc');
  const handleSearch = () => {
    onSearch(searchTerm, sortOption);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "center",
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Search input */}
      <TextField
        variant="standard"
        placeholder="Tìm buổi phỏng vấn đã tham gia"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          flex: 1,
          "& .MuiInput-root": {
            border: "none",
            fontSize: "16px",
            padding: "4px 16px",
          },
          "& .MuiInput-root:before, & .MuiInput-root:after": {
            display: "none",
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Sort dropdown */}
      <FormControl
        variant="standard"
        sx={{ minWidth: 200, mr: 1 }}
        disableUnderline
      >
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          disableUnderline
        >
          <MenuItem value="created_desc">Tạo mới nhất</MenuItem>
          <MenuItem value="created_asc">Tạo cũ nhất</MenuItem>
          <MenuItem value="start_desc">Ngày diễn ra gần nhất</MenuItem>
          <MenuItem value="start_asc">Ngày diễn ra xa nhất</MenuItem>
        </Select>
      </FormControl>

      {/* Search button */}
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          borderRadius: 2,
          background: "linear-gradient(90deg, #6A2CB6 0%, #5E77E2 100%)",
          color: "white",
          fontWeight: 600,
          px: 3,
          "&:hover": {
            background: "linear-gradient(90deg, #5A1CA6 0%, #4E67D2 100%)",
          },
        }}
      >
        Tìm kiếm
      </Button>
    </Box>
  );
};

export default SearchBar;
