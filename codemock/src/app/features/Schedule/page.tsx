"use client";
import React, { useEffect, useState } from "react";
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
import { mapSessionToInterview, mapSlotToInterview } from "./mapToSchedule";
import {
  getInterviewSlotsByCandidate,
  InterviewSlotResult,
} from "@/api/interview-slot/interview-slot";
import { RootState } from "@/store/redux";
import { useSelector } from "react-redux";
import { getInterviewSessionsByMentor } from "@/api/interview/interview-session";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

export type InterviewInSchedule = {
  type: "SLOT" | "SESSION";
  raw: InterviewSlotResult | InterviewSessionResult;
  display: {
    id: string;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    requiredTechnologies: { id: string; name: string }[];
    majors: { id: string; name: string }[];
    level: { id: string; name: string };
    interviewer: string;
    roomId: string;
    sessionId: string;
  };
};

const InterviewCalendar: NextPageWithLayout = () => {
  const today = new Date(2025, 2, 3);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedInterview, setSelectedInterview] =
    useState<InterviewInSchedule | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(today, { weekStartsOn: 1 })
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 2, 1));
  const role = useSelector((state: RootState) => state.auth.user.role);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [interviews, setInterviews] = useState<InterviewInSchedule[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        if (role === "CANDIDATE") {
          const slots =
            (await getInterviewSlotsByCandidate()) as InterviewSlotResult[];
          const mapped = slots.map(mapSlotToInterview);
          setInterviews(mapped);
        } else if (role === "MENTOR") {
          const sessions =
            (await getInterviewSessionsByMentor()) as InterviewSessionResult[];
          const mapped = sessions.map(mapSessionToInterview);
          setInterviews(mapped);
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu phỏng vấn:", err);
      }
    };

    if (userId) {
      fetchInterviews();
    }
  }, [userId]);
  // Lọc phỏng vấn theo ngày
  const getInterviewsByDate = (date: Date) => {
    return interviews.filter(
      (interview) => isSameDay(new Date(interview.display.date), date) // So sánh ngày chính xác
    );
  };

  // Xử lý khi click vào một cuộc phỏng vấn
  const handleInterviewClick = (interview: InterviewInSchedule) => {
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
            userRole={role}
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
