import { Box, Grid, Typography, Button, Rating } from "@mui/material";
import { mapStatusToColor } from "@/app/constants/color";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";

interface InterviewCardProps {
  interview: InterviewSlotResult;
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
        <img
          src={interview?.interviewSession?.mentor?.avatarUrl || ""} // fallback nếu thiếu avatar
          alt="Mentor"
          width={150}
          height={150}
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Content section */}
      <Grid container sx={{ flex: 1, p: 2 }}>
        <Grid size={{ xs:12, md:8 }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
          >
            {interview.interviewSession?.title}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {interview.interviewSession?.description}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {/* {interview.date} | {interview.time} */}
            {/* ngày vs giờ:  */}
            {interview.startTime ? new Date(interview.startTime).toLocaleString() : "Chưa xác định"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {/* {interview.interviewer} */} Cái gì đây đ biet
          </Typography>

          {/* Rating display if available */}
          {/* {interview.rating !== null ? (
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
          )} */}
        </Grid>
        <Grid size={{ xs:12, sm:4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          Price
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: interview.interviewSession?.sessionPrice === 0 ? "#4caf50" : "#ff0000",
            }}
          >
            {interview.interviewSession?.sessionPrice}
          </Typography>

          {/* Score pill */}
          {interview.feedback && (
            <Box
              sx={{
                bgcolor: getScoreColor(interview.feedback),
                color: getScoreColor(interview.feedback, true),
                py: 0.5,
                px: 2,
                borderRadius: 1,
                fontWeight: "bold",
                my: 1,
              }}
            >
              {interview.feedback}
            </Box>
          )}

          {/* Action button */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            sx={{ mt: 1 }}
            onClick={() => {
              // TODO: Xử lý navigation đến trang "xem lại"
            }}
          >
            Xem lại
          </Button>

          {/* Rating button nếu chưa có */}
          {/* {interview.rating === null && (
            <Button
              variant="text"
              color="primary"
              startIcon={<span>⭐</span>}
              sx={{ mt: 1 }}
              onClick={() => {
                // TODO: mở modal đánh giá
              }}
            >
              Đánh giá
            </Button>
          )} */}
        </Grid>
      </Grid>
    </Box>
  );
}
