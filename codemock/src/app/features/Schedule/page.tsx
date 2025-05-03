"use client";
import React, { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
//import { vi } from 'date-fns/locale';
import styles from "./Schedule.module.css";
import WeeklyCalendar from "./components/WeeklyCalendar";
import MonthlyCalendar from "./components/MonthlyCalendar";
import InterviewDetails from "./components/InterviewDetails";
import { Box, Button } from "@mui/material";
import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { Color } from "@/assets/Color";

interface Interview {
  id: number;
  title: string;
  position: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  technologies?: string[];
  interviewer?: string;
}

const mockInterviews: Interview[] = [
  {
    id: 1,
    title: "Intern Front-end Dev",
    position: "Front-end",
    date: new Date(2025, 2, 3),
    startTime: "09:00",
    endTime: "10:20",
    type: "Dev",
    technologies: ["ReactJS", "JavaScript", "CSS", "HTML"],
    interviewer: "Jessica",
  },
  {
    id: 2,
    title: "Intern Front-end Dev",
    position: "Front-end",
    date: new Date(2025, 2, 4),
    startTime: "10:30",
    endTime: "11:50",
    type: "Dev",
    technologies: ["JavaScript", "Vue.js", "CSS"],
    interviewer: "Michael",
  },
  {
    id: 3,
    title: "Intern Front-end React Native",
    position: "Front-end",
    date: new Date(2025, 2, 5),
    startTime: "13:00",
    endTime: "14:30",
    type: "React Native",
    technologies: ["React Native", "TypeScript", "Redux"],
    interviewer: "Anna",
  },
];

// Export the Interview interface for use in other components
export type { Interview };
export { mockInterviews };

const InterviewCalendar: NextPageWithLayout = () => {
  const today = new Date(2025, 2, 3);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(today, { weekStartsOn: 1 })
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 2, 1));

  // Lọc phỏng vấn theo ngày
  const getInterviewsByDate = (date: Date) => {
    return mockInterviews.filter((interview) =>
      isSameDay(interview.date, date)
    );
  };

  // Xử lý khi click vào một cuộc phỏng vấn
  const handleInterviewClick = (interview: Interview) => {
    setSelectedInterview(interview);
  };

  // Xử lý khi chọn ngày từ lịch tháng
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Nếu ngày được chọn không nằm trong tuần hiện tại, cập nhật tuần
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    if (weekStart.getTime() !== currentWeekStart.getTime()) {
      setCurrentWeekStart(weekStart);
    }
  };

  // Chuyển tuần trước
  const handlePrevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  // Chuyển tuần sau
  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  // Chuyển tháng trước
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Chuyển tháng sau
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <ProtectedLayout allowedRoles={["CANDIDATE", "MENTOR"]}>
      <div className={styles.container}>
        <div className={styles.calendarWrapper}>
          <Box sx={{ mb: 2 }} className={styles.headerWithNav}>
            <Box sx={{ mb: 2 }}>
              <h1 className={styles.title}>Lịch phỏng vấn</h1>
              <p className={styles.subtitle}>
                {format(currentWeekStart, "dd/MM")} -{" "}
                {format(addDays(currentWeekStart, 6), "dd/MM/yyyy")}
              </p>
            </Box>
            <Box className={styles.weekNavigation}>
              <button className={styles.navButton} onClick={handlePrevWeek}>
                Tuần trước
              </button>
              <button className={styles.navButton} onClick={handleNextWeek}>
                Tuần sau
              </button>
            </Box>
          </Box>

          <WeeklyCalendar
            currentWeekStart={currentWeekStart}
            selectedDate={selectedDate}
            handleDateSelect={handleDateSelect}
            getInterviewsByDate={getInterviewsByDate}
            handleInterviewClick={handleInterviewClick}
            selectedInterview={selectedInterview}
          />
        </div>

        <div className={styles.sidebarWrapper}>
          <Button
            sx={{
              width: "100%",
              background: Color.gradient,
              fontSize: "100%",
              marginBottom: "10px",
            }}
            variant="contained"
            href="features/Interview/create-interview"
          >
            Tạo phỏng vấn
          </Button>
          <MonthlyCalendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            handleDateSelect={handleDateSelect}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            getInterviewsByDate={getInterviewsByDate}
          />

          {selectedInterview && (
            <InterviewDetails interview={selectedInterview} />
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default InterviewCalendar;
