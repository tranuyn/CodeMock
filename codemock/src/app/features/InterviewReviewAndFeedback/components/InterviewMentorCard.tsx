import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Tooltip,
  Button,
  Avatar,
  Card,
  alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';

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
      <Box sx={{display: "flex", mb: 2, alignItems: 'center'}}>
        <Avatar sx={{width: 150, height: 150, position: "relative", flexShrink: 0, borderRadius: 2, overflow: 'hidden'}}
          src={session?.mentor?.avatarUrl || ""}
          alt="Mentor"
          style={{ objectFit: "cover" }} 
          variant="rounded"
        />
        <Box sx={{ ml: 2, flex: 1 }}>
          {/* Header thông tin buổi phỏng vấn */}
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {title}
          </Typography>

          <Typography variant="body2" >
            {/* {formatDate(startTime)} | {formatTime(startTime)} - {formatTime(endTime)} */}
            {formatDate(startTime)} | {formatTime(startTime)} - {formatTime(endTime ?? '')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Mentor: <span style={{color: 'black'}}>{mentor.username}</span>
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
            Cấp bậc: <span style={{color: 'black'}}>{level.name}</span> | Chuyên ngành: <span style={{color: 'black'}}>{majors[0]?.name}</span>
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }} >
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
        </Box>
        
        <Card elevation={0} sx={{ mt: 1, p: 1, maxWidth: 120, textAlign: 'center',
            backgroundColor:
              sessionPrice === 0
                ? alpha("#008000", 0.2)
                : (theme) => alpha(theme.palette.error.main, 0.25),
          }}
        >
          <Typography variant="body2" fontWeight="bold" color={sessionPrice === 0 ? "success.main" : "error.main"}>
            {sessionPrice === 0 ? "Miễn phí" : `${sessionPrice.toLocaleString()} VND`}
          </Typography>
        </Card>
      </Box>
      {/* Accordion: slot phỏng vấn */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight='600'>Danh sách ca phỏng vấn ({interviewSlots?.length})</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {interviewSlots?.map((slot) => (
            <Box
              key={slot.slotId}
              sx={{
                borderBottom: "1px solid #eee",
                borderRadius: 1,
                p: 1,
                mb: 1.5,
              }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid size={{ xs:12, sm: 5 }} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AlarmRoundedIcon color="secondary"/>
                  <Typography>
                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
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
                  <Button 
                    size="small"
                    href={`/interview/feedback/${slot.slotId}`}
                    sx={{ textTransform: "none" }}
                  >
                    {slot.feedback ? 'Xem đánh giá' : 'Gửi đánh giá'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
