import { Feedback } from "@/api/feedback/feedback.type";
import { mapStatusToColor } from "@/app/constants/color";
import { Box, Typography } from "@mui/material";

export default function FeedbackDisplay({ feedback }: { feedback?: Feedback }) {
  if (!feedback) return null;

  const getScoreColor = (score: number | null, isText = false): string => {
    if (score === null || score === undefined) return "#f5f5f5";
    return mapStatusToColor(score, isText);
  };
  const overallScore =
    (feedback.technicalScore +
      feedback.communicationScore +
      feedback.problemSolvingScore) /
    3;

  return (
    <Box>
      <Box>
        Điểm trung bình:
        <Box
          sx={{
            bgcolor: getScoreColor(overallScore),
            color: getScoreColor(overallScore, true),
            py: 0.5,
            px: 1.5,
            borderRadius: 1,
            fontWeight: "bold",
            mb: 2,
            ml: 1,
            display: "inline-block",
          }}
        >
          {overallScore.toFixed(1)} / 10
        </Box>
      </Box>
      <Typography fontWeight="bold">Điểm từng phần</Typography>
      <ul style={{ marginTop: 2 }}>
        <li>Kỹ thuật: {feedback.technicalScore}</li>
        <li>Giao tiếp: {feedback.communicationScore}</li>
        <li>Giải quyết vấn đề: {feedback.problemSolvingScore}</li>
      </ul>

      <Typography fontWeight="bold" mt={2}>
        Nhận xét
      </Typography>
      <Typography>
        <strong>Chung:</strong> {feedback.overallPerformance}
      </Typography>
      <Typography>
        <strong>Điểm mạnh:</strong> {feedback.strengths}
      </Typography>
      <Typography>
        <strong>Cần cải thiện:</strong> {feedback.improvementAreas}
      </Typography>
    </Box>
  );
}
