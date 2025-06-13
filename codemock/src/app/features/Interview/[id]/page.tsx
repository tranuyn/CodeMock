"use client";

import { getInterviewSessionById } from "@/api/interview/interview-session";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";
import InfoCard from "./Components/InfoCard";
import RegisterSlotForm from "@/app/components/RegisterSlotForm";

export default function InterviewSection({
  params,
}: {
  params: { id: string };
}) {
  const [interview, setInterview] = useState<InterviewSessionResult>();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const session = (await getInterviewSessionById(
          params.id
        )) as InterviewSessionResult; 
        setInterview(session);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };
    fetchInterviews();
  }, [params.id]);

  const start = new Date(interview?.startTime ?? 0);
  const end = new Date(
    interview?.endTime ||
      start.getTime() +
        (interview?.totalSlots ?? 0) * (interview?.slotDuration ?? 0) * 60000
  );

  const bookedCount =
    interview?.interviewSlots?.filter(
      (s: { status: string }) => s.status === "booked"
    ).length ?? 0;
  const remainingCount = (interview?.totalSlots ?? 0) - bookedCount;

  return (
    <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
      {interview ? (
        <Grid container spacing={2}>
          {/* LEFT MAIN CONTENT */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                [Interview] {interview.title || "Full Stack Developer"}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
                <Chip
                  icon={<CalendarMonthIcon />}
                  label={start.toLocaleDateString("vi-VN")}
                />
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${interview.slotDuration} phút`}
                />
                <Chip
                  icon={<PlayCircleOutlineIcon />}
                  label={`${start.getHours()}:00 - ${end.getHours()}:00`}
                />
              </Box>
              <Divider orientation="vertical" variant="middle" />
              <Typography fontSize={14} mb={2}>
                Số lượng ban đầu: {interview.totalSlots} | Số lượng đã đăng ký:{" "}
                {bookedCount} | Số lượng còn lại: {remainingCount}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 3 }}
                onClick={() => setIsRegisterOpen(true)}
              >
                Đăng ký ngay
              </Button>
            </Paper>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "semiBold" }}
              >
                Chi tiết buổi phỏng vấn
              </Typography>
              <Typography component={'div'} dangerouslySetInnerHTML={{ __html: interview.description }}/>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Hạn nộp hồ sơ:{" "}
                {new Date(start.getTime() - 86400000).toLocaleDateString(
                  "vi-VN"
                )}
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                <CodeRoundedIcon color="secondary" /> Vị trí{" "}
                <span style={{ fontWeight: 400, fontSize: "1rem" }}>
                  {interview.level.name}
                </span>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <CodeRoundedIcon color="secondary" /> Chuyên ngành{" "}
                {interview.majors.map((tech: { id: string; name: string }) => (
                  <span
                    style={{ fontWeight: 400, fontSize: "1rem" }}
                    key={tech.id}
                  >
                    {tech.name}
                  </span>
                ))}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <CodeRoundedIcon color="secondary" /> Yêu cầu công nghệ
              </Typography>
              <ul
                style={{
                  listStylePosition: "inside",
                  listStyleType: "disc",
                  paddingLeft: 20,
                }}
              >
                {interview.requiredTechnologies.map(
                  (tech: { id: string; name: string }) => (
                    <li key={tech.id}>{tech.name}</li>
                  )
                )}
              </ul>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                <CodeRoundedIcon color="secondary" /> Lợi ích khi tham gia
              </Typography>
              <ul
                style={{
                  listStylePosition: "inside",
                  listStyleType: "disc",
                  paddingLeft: 20,
                }}
              >
                <li>Gặp chuyên gia có kinh nghiệm</li>
                <li>Góp ý chi tiết về CV, portfolio</li>
                <li>Cơ hội nhận offer thực tập/phù hợp</li>
                <li>Mở rộng networking ngành IT</li>
              </ul>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                <CodeRoundedIcon color="secondary" /> Chuẩn bị cho buổi phỏng
                vấn
              </Typography>
              <ul
                style={{
                  listStylePosition: "inside",
                  listStyleType: "disc",
                  paddingLeft: 20,
                }}
              >
                <li>CV đã cập nhật</li>
                <li>Portfolio các project đã làm</li>
                <li>Laptop để demo nếu có</li>
                <li>Câu hỏi cho chuyên gia</li>
              </ul>

              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Địa điểm phỏng vấn:</strong> Microsoft Teams
              </Typography>

              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Cách thức tham gia:</strong> Bấm Đăng ký
              </Typography>
            </Paper>
          </Grid>

          {/* RIGHT SIDEBAR */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  p: 2,
                  gap: 2,
                }}
              >
                <Avatar
                  alt={interview.mentor.username}
                  src={interview.mentor.avatarUrl}
                  sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Box>
                  <Typography fontWeight="bold">
                    {interview.mentor.username}
                  </Typography>
                  <Typography fontSize={13}>
                    {interview.mentor.address}
                  </Typography>
                  {interview.mentor.educationBackground?.map((edu, index) => (
                    <Typography key={index} fontSize={13}>
                      {edu.yearStart} - {edu.yearEnd} • {edu.position} tại{" "}
                      {edu.work_space}
                    </Typography>
                  ))}
                </Box>
              </Paper>

              <InfoCard
                title="Công việc hiện tại"
                icon="📘"
                items={[
                  { text: "Project Manager tại Công ty ABC Technology" },
                  { text: "Quản lý team phát triển với 20+ thành viên" },
                  { text: "Phụ trách các dự án Enterprise Software" },
                ]}
              />
              <InfoCard
                title="Kinh nghiệm làm việc"
                icon="💼"
                items={
                  interview.mentor.experiences?.map((exp) => ({
                    text: `${exp.yearStart} - ${exp.yearEnd} • ${exp.position} tại ${exp.work_space}`,
                    imageUrl: exp.imageUrl,
                  })) || []
                }
                lightTheme={false}
              />
              <InfoCard
                title="Chuyên môn & kỹ năng"
                icon="🛠️"
                items={
                  interview.mentor.skills?.map((skill) => ({
                    text: `${skill.name} (${skill.proficiency_level ?? "Unknown"} - ${skill.years_of_experience ?? 0} yrs): ${skill.detail ?? ""}`,
                  })) || []
                }
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <RegisterSlotForm
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        slots={interview?.interviewSlots || []}
        interviewId={interview?.sessionId || ""}
      />
    </Box>
  );
}
