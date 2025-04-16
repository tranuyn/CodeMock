import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
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
        borderRadius: 28,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        width: '100%',
        maxWidth: '900px',
      }}
    >
      <TextField
        variant="standard"
        placeholder="Tên buổi phỏng vấn"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          flexGrow: 1,
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

      <TextField
        select
        variant="standard"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="Chọn cấp bậc"
        SelectProps={{
          native: true,
          IconComponent: KeyboardArrowDownIcon,
        }}
        sx={{
          width: '160px',
          '& .MuiInput-root': {
            border: 'none',
            fontSize: '16px',
            padding: '4px 16px',
          },
          '& .MuiInput-root:before, & .MuiInput-root:after': {
            display: 'none',
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      >
        <option value="" disabled>
          Chọn cấp bậc
        </option>
        <option value="junior">Junior</option>
        <option value="middle">Middle</option>
        <option value="senior">Senior</option>
      </TextField>

      <TextField
        select
        variant="standard"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="Chọn chuyên ngành"
        SelectProps={{
          native: true,
          IconComponent: KeyboardArrowDownIcon,
        }}
        sx={{
          width: '180px',
          '& .MuiInput-root': {
            border: 'none',
            fontSize: '16px',
            padding: '4px 16px',
          },
          '& .MuiInput-root:before, & .MuiInput-root:after': {
            display: 'none',
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      >
        <option value="" disabled>
          Chọn chuyên ngành
        </option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">FullStack</option>
        <option value="ui-ux">UI/UX</option>
      </TextField>

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(90deg, #6A2CB6 0%, #5E77E2 100%)',
          color: 'white',
          fontWeight: 'bold',
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