import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: 1,
        borderRadius: 1
      }}
    >
      <SearchIcon sx={{ color: 'action.active', m: 1 }} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputProps={{ 'aria-label': 'search interviews' }}
      />
    </Paper>
  );
}