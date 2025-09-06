'use client';

import { createFeedback } from '@/api/feedback/feedback';
import { toastService } from '@/app/components/toast/toast.service';
import { Box, Typography, TextField, Button, Rating, Grid, Input } from '@mui/material';
import { useState } from 'react';

export default function FeedbackForm({ slotId, onSuccess }: { slotId: string; onSuccess?: () => void }) {
  const [strengths, setStrengths] = useState('');
  const [improvementAreas, setImprovementAreas] = useState('');
  const [overallPerformance, setOverallPerformance] = useState('');
  const [techScore, setTechScore] = useState(1);
  const [comScore, setComScore] = useState(1);
  const [probScore, setProbScore] = useState(1);

  const handleSubmit = async () => {
    try {
      await createFeedback({
        slot: { slotId },
        strengths,
        improvementAreas,
        overallPerformance,
        technicalScore: techScore,
        communicationScore: comScore,
        problemSolvingScore: probScore,
      });
      toastService.show({ title: 'Gửi thành công', description: 'Đã gửi nhận xét.', variant: 'success' });
      onSuccess?.();
    } catch (err) {
      toastService.show({ title: 'Lỗi', description: 'Không thể gửi nhận xét', variant: 'error' });
    }
  };

  return (
    <Box>
      <Typography fontWeight="bold" mb={2}>Các điểm tương quan</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }} >
          <Typography variant="body2">Kỹ thuật</Typography>
            <Input
              type='number'
              value={techScore}
              onChange={e => setTechScore(Number(e.target.value) || 0)}
            />
        </Grid>
        <Grid size={{ xs: 12, sm: 4}} >
          <Typography variant="body2">Giao tiếp</Typography>
          <Input
            type='number'
            value={comScore}
            onChange={e => setComScore(Number(e.target.value) || 0)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4}}>
          <Typography variant="body2">Giải quyết vấn đề</Typography>
          <Input
            type='number'
            value={probScore}
            onChange={e => setProbScore(Number(e.target.value) || 0)}
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <TextField fullWidth label="Nhận xét chung" value={overallPerformance} onChange={e => setOverallPerformance(e.target.value)} multiline rows={2} margin="normal" />
        <TextField fullWidth label="Điểm mạnh" value={strengths} onChange={e => setStrengths(e.target.value)} multiline rows={2} margin="normal" />
        <TextField fullWidth label="Điểm cần cải thiện" value={improvementAreas} onChange={e => setImprovementAreas(e.target.value)} multiline rows={2} margin="normal" />
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Gửi nhận xét
      </Button>
    </Box>
  );
}
