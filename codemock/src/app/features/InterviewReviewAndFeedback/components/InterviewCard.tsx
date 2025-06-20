import { Box, Grid, Typography, Button, Rating, Avatar, Chip, Card, alpha, Modal } from "@mui/material";
import { mapStatusToColor } from "@/app/constants/color";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";
import dayjs from "dayjs";
import HotelClassRoundedIcon from '@mui/icons-material/HotelClassRounded';
import { useState } from "react";
import FeedbackTabs from "./Feedback_Rating/FeedbackTabs";
interface InterviewCardProps {
  interview: InterviewSlotResult;
  reloadData?: () => void;
}

export default function InterviewCard({ interview, reloadData }: InterviewCardProps) {
  const [showFeedback, setShowFeedback] = useState<boolean>(false)

  const getScoreColor = (score: number | null, isText = false): string => {
    if (score === null || score === undefined) return "#f5f5f5";
    return mapStatusToColor(score, isText);
  };

  const formatTime = (iso: string) => dayjs(iso).format("HH:mm");
  const formatDate = (iso: string) => dayjs(iso).format("DD/MM/YYYY");

  const overallScore = interview.feedback
    ? Number(
        (
          (interview.feedback.technicalScore +
            interview.feedback.communicationScore +
            interview.feedback.problemSolvingScore) /
          3
        ).toFixed(1)
      )
    : null;

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
      <Avatar sx={{width: 150, height: 150, position: "relative", flexShrink: 0, borderRadius: 2, overflow: 'hidden'}}
        src={interview?.interviewSession?.mentor?.avatarUrl|| ""}
        alt="Mentor"
        style={{ objectFit: "cover" }} 
        variant="rounded"
      />

      {/* Content section */}
      <Grid container sx={{ flex: 1, p: 2 }}>
        <Grid size={{ xs:12, md:8, lg: 10 }} >
        {/* sx={{ backgroundColor: "red"}}> */}
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: "bold", color: "#1976d2", mb: 1 }}
          >
            {interview.interviewSession?.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {formatDate(interview.startTime)} | 
            {interview.startTime ? formatTime(interview.startTime) : "Chưa xác định"} -
            {interview.endTime ? formatTime(interview.endTime) : "Chưa xác định"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Vị trí: <span style={{color: 'black'}}>{interview.interviewSession?.level?.name}</span> | Chuyên ngành: <span style={{color: 'black'}}>{interview.interviewSession?.majors?.[0]?.name}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Người phỏng vấn: <span style={{color: 'black'}}>{interview.interviewSession?.mentor?.username}</span>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }} >
            Công nghệ yêu cầu:{" "}
            {interview.interviewSession?.requiredTechnologies.map((tech) => (
              <Chip
                key={tech.id}
                label={tech.name}
                size="small"
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
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
        <Grid size={{ xs:12, md: 4, lg: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Card elevation={0} sx={{ p: 1, textAlign: 'center', width: '100%',
            backgroundColor:
              interview.interviewSession?.sessionPrice === 0
                ? alpha("#008000", 0.2)
                : (theme) => alpha(theme.palette.error.main, 0.25),
            }}
          >
            <Typography variant="body2" fontWeight="bold" color={interview.interviewSession?.sessionPrice === 0 ? "success.main" : "error.main"}>
              {interview.interviewSession?.sessionPrice === 0 ? "Miễn phí" : `${interview.interviewSession?.sessionPrice.toLocaleString()} VND`}
            </Typography>
          </Card>
          {/* Score pill */}
          {interview.feedback && (
            <Box
              sx={{
                bgcolor: getScoreColor(overallScore),
                color: getScoreColor(overallScore, true),
                py: 0.5,
                px: 2,
                borderRadius: 1,
                fontWeight: "bold",
                my: 1,
              }}
            >
              {overallScore}
            </Box>
          )}

          {/* Action button */}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<HotelClassRoundedIcon />}
            sx={{ mt: 1 }}
            onClick={() => setShowFeedback(true)}
          >
            Đánh giá
          </Button>
          <Modal open={showFeedback} onClose={() => setShowFeedback(false)} >
            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, width: "100%", maxWidth: 600, m: "auto", marginTop: '100px' }}>
              <FeedbackTabs userRole={'CANDIDATE'} slot={interview} onSubmitted={() => {
                  reloadData?.();           // gọi lại API từ cha
                  setShowFeedback(false);   // đóng modal
                }} />
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}
