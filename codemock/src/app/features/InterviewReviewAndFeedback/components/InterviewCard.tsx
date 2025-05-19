import { Box, Grid, Typography, Button, Rating } from "@mui/material";
import Image from "next/image";
import { Interview } from "../types";
import { mapStatusToColor } from "@/app/constants/color";
import VisibilityIcon from '@mui/icons-material/Visibility';
interface InterviewCardProps {
  interview: Interview;
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  const getScoreColor = (score: string | null, isText = false): string => {
    if (!score) return "#f5f5f5";

    const numScore = parseInt(score.split("/")[0]);
    return isText ? mapStatusToColor(numScore) : mapStatusToColor(numScore, false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        borderRadius: 1,
        mb: 2,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      {/* Image section */}
      <Box
        sx={{ width: 150, height: 150, position: "relative", flexShrink: 0 }}
      >
        <Image
          src=""
          alt="Interviewer"
          width={150}
          height={150}
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Content section */}
      <Grid container sx={{ flex: 1, p: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
          >
            {interview.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {interview.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {interview.date} | {interview.time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {interview.interviewer}
          </Typography>

          {/* Rating display if available */}
          {interview.rating ? (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography variant="body2" sx={{ mr: 1, fontWeight: "bold" }}>
                {interview.rating.toFixed(1)}
              </Typography>
              <Rating
                value={interview.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {interview.status}
            </Typography>
          )}
        </Grid>

        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {/* Price */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: interview.price === "Free" ? "#4caf50" : "#ff0000",
            }}
          >
            {interview.price}
          </Typography>

          {/* Score pill */}
          {interview.score && (
            <Box
              sx={{
                bgcolor: getScoreColor(interview.score),
                color: getScoreColor(interview.score, true),
                py: 0.5,
                px: 2,
                borderRadius: 1,
                fontWeight: "bold",
                my: 1,
              }}
            >
              {interview.score}
            </Box>
          )}

          {/* Action button */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            sx={{ mt: 1 }}
          >
            Xem lại
          </Button>

          {/* Rating button if applicable */}
          {!interview.rating && (
            <Button
              variant="text"
              color="primary"
              startIcon={<span>⭐</span>}
              sx={{ mt: 1 }}
            >
              Đánh giá
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
