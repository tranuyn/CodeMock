'use client'
import React from 'react';
import { Chip, Avatar, Typography } from '@mui/material';

interface MajorChipProps {
  title: string;
  count: number;
  isChoose?: boolean;
}

const MajorChip: React.FC<MajorChipProps> = ({ title, count, isChoose = false }) => {
  return (
    <Chip
      label={title}
      avatar={
        <Avatar 
          sx={{ 
            bgcolor: isChoose ? 'white' : 'primary.main', 
          }}
        >
          <Typography color={isChoose ? 'primary.main': 'white'} fontWeight="bold" fontSize= '0.75rem'>
            {count}
          </Typography>
        </Avatar>
      }
      sx={{
        bgcolor: isChoose ? 'primary.main' : 'white' , 
        color:  isChoose ? 'white': 'primary.main',
        borderRadius: '20px',
        fontWeight: 'medium',
        mr: 1,
      }}
    />
  );
};

export default MajorChip;
