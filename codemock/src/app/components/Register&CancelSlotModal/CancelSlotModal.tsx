'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box,
} from '@mui/material';
import { useState } from 'react';

interface CancelSlotDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const predefinedReasons = [
  'Tôi có công việc đột xuất trùng với lịch phỏng vấn',
  'Tôi muốn chuẩn bị kỹ càng hơn cho lần phỏng vấn sau',
  'Buổi phỏng vấn này không còn phù hợp với tôi',
  'Lý do khác',
];

export default function CancelSlotModal({
  open,
  onClose,
  onConfirm,
}: CancelSlotDialogProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    const finalReason =
      selectedReason === 'Lý do khác' ? customReason.trim() : selectedReason;
    if (!finalReason) return;

    onConfirm(finalReason);
    setSelectedReason('');
    setCustomReason('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: 'error.main' }}>
        Bạn có chắc chắn muốn hủy buổi phỏng vấn đã đăng ký?
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Hãy cho chúng tôi biết lý do bạn muốn hủy
        </Typography>
        <RadioGroup
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
        >
          {predefinedReasons.map((reason) => (
            <FormControlLabel
              key={reason}
              value={reason}
              control={<Radio />}
              label={reason}
            />
          ))}
        </RadioGroup>
        {selectedReason === 'Lý do khác' && (
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Lý do khác..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        )}
        <Box mt={3}>
          <Typography variant="body2" color="error">
            <strong>Lưu ý:</strong>
          </Typography>
          <ul style={{ fontSize: 14, paddingLeft: 20 }}>
            <li>
              Nếu bạn hủy buổi phỏng vấn trước 24h thì buổi đăng ký sẽ được xóa khỏi lịch và bạn có thể đăng ký lại (nếu còn slot).
            </li>
            <li>
              Nếu hủy trong vòng 24h, tài khoản sẽ bị cảnh cáo. Quá 3 lần sẽ bị khóa đăng ký trong 3 tháng.
            </li>
          </ul>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Thoát
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={!selectedReason || (selectedReason === 'Lý do khác' && !customReason.trim())}
        >
          Xác nhận hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
