"use client";

import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { InterviewSessionResult } from "@/api/interview/interview_session";

export default function InterviewSessionDetail({
  session,
}: {
  session: InterviewSessionResult;
}) {
  const start = new Date(session.startTime);
  const end = new Date(
    session.endTime ||
      start.getTime() + session.totalSlots * session.slotDuration * 60000
  );

  const bookedCount = session.interviewSlots.filter(
    (s: { status: string }) => s.status === "booked"
  ).length;
  const remainingCount = session.totalSlots - bookedCount;

  return (
    <Grid container spacing={2}>
      {/* LEFT MAIN CONTENT */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            [Interview] {session.title || "Full Stack Developer"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }}>
            <Chip
              icon={<CalendarMonthIcon />}
              label={start.toLocaleDateString("vi-VN")}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={`${session.slotDuration} phút`}
            />
            <Chip
              icon={<PlayCircleOutlineIcon />}
              label={`${start.getHours()}:00 - ${end.getHours()}:00`}
            />
          </Box>

          <Typography fontSize={14} mb={2}>
            Số lượng ban đầu: {session.totalSlots} | Số lượng đã đăng ký:{" "}
            {bookedCount} | Số lượng còn lại: {remainingCount}
          </Typography>

          <Button variant="contained" color="primary" fullWidth sx={{ mb: 3 }}>
            Đăng ký ngay
          </Button>

          <Typography variant="h4" gutterBottom sx={{ fontWeight: "semiBold" }}>
            Chi tiết buổi phỏng vấn
          </Typography>
          <Typography paragraph>{session.description}</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Hạn nộp hồ sơ:{" "}
            {new Date(start.getTime() - 86400000).toLocaleDateString("vi-VN")}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Vị trí{" "}
            <span style={{ fontWeight: 400, fontSize: "1rem" }}>
              {session.level.name}
            </span>
          </Typography>
          <Typography variant="h6" gutterBottom>
            Vị trí{" "}
            {session.majors.map((tech: { id: string; name: string }) => (
              <span style={{ fontWeight: 400, fontSize: "1rem" }} key={tech.id}>
                {tech.name}
              </span>
            ))}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Yêu cầu công nghệ
          </Typography>
          <ul>
            {session.requiredTechnologies.map(
              (tech: { id: string; name: string }) => (
                <li key={tech.id}>{tech.name}</li>
              )
            )}
          </ul>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Lợi ích khi tham gia
          </Typography>
          <ul>
            <li>Gặp chuyên gia có kinh nghiệm</li>
            <li>Góp ý chi tiết về CV, portfolio</li>
            <li>Cơ hội nhận offer thực tập/phù hợp</li>
            <li>Mở rộng networking ngành IT</li>
          </ul>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Chuẩn bị cho buổi phỏng vấn
          </Typography>
          <ul>
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
          <Paper sx={{ display: "flex", flexDirection: "row", alignItems: 'center', p: 2, gap: 2 }}>
            <Avatar
              alt={session.mentor.username}
              src="/mentor.png"
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Box>
              <Typography fontWeight="bold">{session.mentor.username}</Typography>
              <Typography fontSize={13}>{session.mentor.username}</Typography>
              <Typography fontSize={13}>Hồ Chí Minh</Typography>
              <Typography fontSize={13}>
                Tốt nghiệp trường Bách Khoa Hà Nội
              </Typography>
            </Box>
          </Paper>

  <Paper variant="outlined" sx={{ p: 2, borderLeft: 4, borderColor: 'primary.light' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        backgroundColor: 'primary.light',
        color: 'primary.dark',
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontWeight: 'bold',
        fontSize: 14,
      }}
    >
      <Box component="span" sx={{ mr: 1 }}>📘</Box>
      Công việc hiện tại
    </Box>
    <List dense sx={{ pl: 1.5 }}>
      <ListItem disablePadding>
        <ListItemText primary="Project Manager tại Công ty ABC Technology" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText primary="Quản lý team phát triển với 20+ thành viên" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText primary="Phụ trách các dự án Enterprise Software" />
      </ListItem>
    </List>
  </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Kinh nghiệm làm việc
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Product Owner - XYZ Software (2017-2019)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tech Lead - DEF Solutions (2019-2022)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Senior Developer - GHI Tech (2015-2017)" />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Chuyên môn & kỹ năng
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Agile/Scrum Management" />
              </ListItem>
              <ListItem>
                <ListItemText primary="System Architecture" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Java, Spring Boot, React" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cloud Services (AWS, Azure)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Team Building & Leadership" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
