import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ResultSuccess({ title, subtitle, onAction }: {
  title?: string;
  subtitle?: string;
  onAction?: () => void;
}) {
  return (
    <Box textAlign="center" py={6}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
      <Typography variant="h5" mt={2}>{title || "Operation Successful"}</Typography>
      <Typography variant="body1" color="text.secondary" mt={1}>
        {subtitle || "Everything went as expected."}
      </Typography>
      {onAction && (
        <Button variant="contained" sx={{ mt: 3 }} onClick={onAction}>
          Continue
        </Button>
      )}
    </Box>
  );
}
