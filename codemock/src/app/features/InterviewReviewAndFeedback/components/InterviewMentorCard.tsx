import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

interface Props {
  session: InterviewSessionResult;
}

export default function InterviewMentorCard({ session }: Props) {
  const {
    title,
    startTime,
    endTime,
    sessionPrice,
    mentor,
    interviewSlots,
    requiredTechnologies,
    majors,
    level,
    description,
    meetingLink,
    roomId,
  } = session;

  const formatTime = (iso: string) => dayjs(iso).format("HH:mm");
  const formatDate = (iso: string) => dayjs(iso).format("DD/MM/YYYY");

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 1,
        boxShadow: 1,
        mb: 3,
        p: 2,
      }}
    >
      {/* Header thông tin buổi phỏng vấn */}
      <Typography variant="subtitle1" fontWeight="bold" color="primary">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {/* {formatDate(startTime)} | {formatTime(startTime)} - {formatTime(endTime)} */}
        {formatDate(startTime)} | {formatTime(startTime)} - {formatTime(endTime ?? '')}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Mentor: {mentor.username}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Cấp bậc: {level.name} | Chuyên ngành:{" "}
        {majors.map((m) => m.name).join(", ")}
      </Typography>

      <Typography variant="body2">
        Công nghệ yêu cầu:{" "}
        {requiredTechnologies.map((tech) => (
          <Chip
            key={tech.id}
            label={tech.name}
            size="small"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
        ))}
      </Typography>

      <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }} color={sessionPrice === 0 ? "success.main" : "error.main"}>
        {sessionPrice === 0 ? "Miễn phí" : `${sessionPrice.toLocaleString()} VND`}
      </Typography>

      {/* Accordion: slot phỏng vấn */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Danh sách Slot phỏng vấn ({interviewSlots.length})</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {interviewSlots.map((slot) => (
            <Box
              key={slot.slotId}
              sx={{
                border: "1px solid #eee",
                borderRadius: 1,
                p: 1.5,
                mb: 1.5,
              }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid size={{ xs:12, sm: 5 }}>
                  <Typography>
                    ⏰ {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                  <Chip
                    label={slot.status.toUpperCase()}
                    color={
                      slot.status === "booked"
                        ? "info"
                        : slot.status === "available"
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </Grid>

                <Grid size={{ xs:12, sm:4 }}>
                  {slot.feedback ? (
                    <Tooltip title={slot.feedback}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontStyle: "italic",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        📝 {slot.feedback}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Chưa có feedback
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
