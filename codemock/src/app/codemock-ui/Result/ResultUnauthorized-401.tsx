import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function ResultUnauthorized({
  title,
  subtitle,
  onBack,
}: {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <Box textAlign="center" py={6}>
      <LockOutlinedIcon color="warning" sx={{ fontSize: 80 }} />
      <Typography variant="h5" mt={2}>
        {title || "401 - Không có quyền truy cập"}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={1}>
        {subtitle || "Bạn không có quyền truy cập tài nguyên này."}
      </Typography>
      {onBack && (
        <Button variant="contained" sx={{ mt: 3 }} onClick={onBack}>
          Quay lại
        </Button>
      )}
    </Box>
  );
}
