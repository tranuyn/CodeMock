'use client';

import { Box, Typography, Rating } from '@mui/material';

interface RatingDisplayProps {
  rating: number;
  comment?: string;
}

export default function RatingDisplay({ rating, comment }: RatingDisplayProps) {
  if (typeof rating !== 'number') return null;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'top'}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, mr: 1 }}>
          Đánh giá:
        </Typography>
        <Rating value={rating} precision={0.5} readOnly />
      </Box>
      {comment && (
        <Box>
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mt: 1 }}>
            Nhận xét
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            • {comment}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
