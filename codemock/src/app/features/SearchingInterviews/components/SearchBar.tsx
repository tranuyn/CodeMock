import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Divider,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Major } from '@/store/types/major.type';
import { Level } from '@/store/types/level.type';

interface SearchBarProps {
  onSearch: (params: {
    searchTerm: string;
    level: Level | null;
    majors: Major[];
  }) => void;
  selectedMajors: Major[];
  selectedLevel: Level | null;
  onLevelChange: (level: Level | null) => void;
  onMajorsChange: (majors: Major[]) => void;
  levels: Level[];
  majors: Major[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  selectedMajors,
  selectedLevel,
  onLevelChange,
  onMajorsChange,
  levels = [],
  majors = [],
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, level: selectedLevel, majors: selectedMajors });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        width: '90%',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {/* Text input */}
      <TextField
        variant="standard"
        placeholder="Tên buổi phỏng vấn"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          flex: 1,
          '& .MuiInput-root': {
            border: 'none',
            fontSize: '16px',
            padding: '4px 16px',
          },
          '& .MuiInput-root:before, & .MuiInput-root:after': {
            display: 'none',
          },
        }}
      />

      {/* LEVEL SELECT */}
      <FormControl variant="standard" sx={{ minWidth: 180 }}>
        <Select
          value={selectedLevel?.id || ''}
          onChange={(e) => {
            const selected = levels.find((lvl) => lvl.id === e.target.value);
            onLevelChange(selected || null);
          }}
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
          disableUnderline
          renderValue={(selected) => {
            const level = levels.find((lvl) => lvl.id === selected);
            return level?.name || 'Chọn cấp bậc';
          }}
        >
          <MenuItem value="">Chọn cấp bậc</MenuItem>
          {levels.map((lvl) => (
            <MenuItem key={lvl.id} value={lvl.id}>
              {lvl.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* MAJOR MULTI SELECT */}
      <FormControl variant="standard" sx={{ minWidth: 220, maxWidth: 300 }}>
        <Select
          multiple
          displayEmpty
          disableUnderline
          value={selectedMajors.map((m) => m.id)}
          onChange={(e) => {
            const selected = majors?.filter((m) =>
              (e.target.value as string[]).includes(m.id)
            );
            onMajorsChange(selected);
          }}
          renderValue={(selected) => {
            if ((selected as string[]).length === 0) return 'Chọn chuyên ngành';
            return majors
              .filter((m) => (selected as string[]).includes(m.id))
              .map((m) => m.name)
              .join(', ');
          }}
          IconComponent={KeyboardArrowDownIcon}
        >
          {majors.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              <Checkbox checked={selectedMajors.some((mj) => mj.id === m.id)} size="small"/>
              <ListItemText primary={m.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(90deg, #6A2CB6 0%, #5E77E2 100%)',
          color: 'white',
          fontWeight: 'semiBold',
          padding: '8px 16px',
          '&:hover': {
            background: 'linear-gradient(90deg, #5A1CA6 0%, #4E67D2 100%)',
          },
        }}
        startIcon={<SearchIcon />}
      >
        Tìm buổi phỏng vấn
      </Button>
    </Box>
  );
};

export default SearchBar;
