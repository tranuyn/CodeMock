import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, Select, MenuItem, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [level, setLevel] = useState('');
  const [major, setMajor] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ searchTerm, level, major });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        width: '70%',
      }}
    >
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
      <Divider orientation="vertical" flexItem />

      <FormControl
        variant="standard"
        sx={{ 
          width: '25%',
          '& .MuiInputBase-root': {
            fontSize: '16px',
            padding: '4px 16px',
          },
          '& .MuiInput-underline:before, & .MuiInput-underline:after': {
            display: 'none',
          },
        }}
      >
        <Select
          labelId="level-select-label"
          id="level-select"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
          disableUnderline
        >
          <MenuItem value="" disabled>
            Chọn cấp bậc
          </MenuItem>
          <MenuItem value="junior">Junior</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
        </Select>
      </FormControl>
      <Divider orientation="vertical" flexItem />

      <FormControl
        variant="standard"
        sx={{ 
          width: '25%',
          '& .MuiInputBase-root': {
            fontSize: '16px',
            padding: '4px 16px',
          },
          '& .MuiInput-underline:before, & .MuiInput-underline:after': {
            display: 'none',
          },
        }}
      >
        <Select
          labelId="major-select-label"
          id="major-select"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          displayEmpty
          IconComponent={KeyboardArrowDownIcon}
          disableUnderline
        >
          <MenuItem value="" disabled>
            Chọn chuyên ngành
          </MenuItem>
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="fullstack">FullStack</MenuItem>
          <MenuItem value="ui-ux">UI/UX</MenuItem>
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