'use client';

import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { InterviewSlotResult } from '@/api/interview-slot/interview-slot.type';
import FeedbackForm from './FeedbackForm';
import FeedbackDisplay from './FeedbackDisplay';
import RatingForm from './RatingForm';
import RatingDisplay from './RatingDisplay';

interface FeedbackTabsProps {
  userRole: 'MENTOR' | 'CANDIDATE';
  slot: InterviewSlotResult | undefined;
  onSubmitted?: () => void;
}

export default function FeedbackTabs({ userRole, slot, onSubmitted }: FeedbackTabsProps) {
  const [tab, setTab] = useState(0);

  const hasFeedback = !!slot?.feedback;
  const hasRating = !!slot?.rating;

  return (
    slot ? 
    <Box>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 2 }}>
      <Tab label="Nhận xét của chuyên gia" />
      {userRole === 'CANDIDATE' && <Tab label="Đánh giá về chuyên gia" />}
    </Tabs>

      {/* Tab 1: Mentor feedback */}
      {tab === 0 &&
        (userRole === 'MENTOR' && !hasFeedback ? (
          <FeedbackForm slotId={slot.slotId} onSuccess={onSubmitted} />
        ) : (slot.feedback === undefined ) ? (
          <FeedbackDisplay feedback={slot.feedback} />
        ) : <Typography>Hiện chuyên gia chưa gửi đánh giá đến cho bạn</Typography>
      )}

      {/* Tab 2: Candidate rating */}
      {tab === 1 &&
        (userRole === 'CANDIDATE' && !hasRating ? (
          <RatingForm
            slotId={slot.slotId}
            mentorId={slot.interviewSession?.mentor?.id}
            sessionId={slot.interviewSession?.sessionId}
            onSuccess={onSubmitted}
          />
        ) : (
          <RatingDisplay rating={slot.rating?.ratingStar ?? 0} comment={slot.rating?.comment} />
        ))}
    </Box> : <>Lỗi</>
  );
}
