import React from 'react';
import { Chip, Typography, Box } from '@mui/material';

const MajorChip = ({ title, count, color = '#1976d2' }) => {
  return (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            {title}
          </Typography>
          <Box
            sx={{
              ml: 1,
              bgcolor: 'white',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{ color }}
            >
              {count}
            </Typography>
          </Box>
        </Box>
      }
      sx={{
        bgcolor: color,
        color: 'white',
        borderRadius: '20px',
        '& .MuiChip-label': {
          px: 0,
        },
        fontWeight: 'medium',
        mr: 1,
      }}
    />
  );
};

export default MajorChip;
