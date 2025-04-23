// WeeklyCalendar.tsx
import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from '../Schedule.module.css';
import { Interview } from '../page';

interface WeeklyCalendarProps {
  currentWeekStart: Date;
  selectedDate: Date;
  handleDateSelect: (date: Date) => void;
  getInterviewsByDate: (date: Date) => Interview[];
  handleInterviewClick: (interview: Interview) => void;
  selectedInterview: Interview | null;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  currentWeekStart,
  selectedDate,
  handleDateSelect,
  getInterviewsByDate,
  handleInterviewClick,
  selectedInterview
}) => {
  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startDate, i));
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);
  // Các giờ trong ngày
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9:00 đến 18:00

  return (
    <>
      <div className={styles.weekHeader}>
        <div className={styles.weekLabel}>Tuần</div>
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`${styles.dayColumn} ${isSameDay(day, selectedDate) ? styles.selectedDayColumn : ''}`}
            onClick={() => handleDateSelect(day)}
          >
            <div className={styles.dayNumber}>
              {format(day, 'dd', { locale: vi })}
            </div>
            <div className={styles.dayName}>
              {format(day, 'EEE', { locale: vi })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.timeGrid}>
        {hours.map((hour) => (
          <div key={hour} className={styles.hourRow}>
            <div className={styles.hourLabel}>
              {`${hour}:00`}
            </div>
            
            {weekDays.map((day, dayIndex) => (
              <div 
                key={dayIndex} 
                className={`${styles.dayCell} ${isSameDay(day, selectedDate) ? styles.selectedDayCell : ''}`}
              >
                {getInterviewsByDate(day).map((interview) => {
                  const [startHour, startMinute] = interview.startTime.split(':').map(Number);
                  const [endHour, endMinute] = interview.endTime.split(':').map(Number);
                  
                  if (startHour === hour) {
                    const durationMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
                    const heightPercent = (durationMinutes / 60) * 100;
                    
                    const isSelected = selectedInterview && selectedInterview.id === interview.id;
                    
                    return (
                      <div
                        key={interview.id}
                        className={`${styles.interviewItem} ${isSelected ? styles.selectedInterviewItem : ''}`}
                        style={{
                          top: `${(startMinute / 60) * 100}%`,
                          height: `${heightPercent}%`
                        }}
                        onClick={() => handleInterviewClick(interview)}
                      >
                        <div className={styles.interviewTitle}>{interview.title}</div>
                        <div className={styles.interviewType}>{interview.type}</div>
                        <div className={styles.interviewTime}>{`${interview.startTime} - ${interview.endTime}`}</div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default WeeklyCalendar;