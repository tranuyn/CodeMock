// MonthlyCalendar.tsx
import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from '../Schedule.module.css';
import { Interview } from '../page';

interface MonthlyCalendarProps {
  currentMonth: Date;
  selectedDate: Date;
  handleDateSelect: (date: Date) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  getInterviewsByDate: (date: Date) => Interview[];
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  currentMonth,
  selectedDate,
  handleDateSelect,
  handlePrevMonth,
  handleNextMonth,
  getInterviewsByDate
}) => {
  // Tạo lịch tháng
  const renderMonthCalendar = () => {
    // Lấy ngày đầu tiên của tháng
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    // Lấy ngày đầu tiên của tuần chứa ngày đầu tiên của tháng
    const firstDayOfCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
    
    // Tạo mảng chứa tất cả các ngày cần hiển thị (42 ô cho 6 tuần)
    const days = [];
    let day = firstDayOfCalendar;
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(day));
      day = addDays(day, 1);
    }
    
    // Chia thành các tuần
    const weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(days.slice(i * 7, (i + 1) * 7));
    }
    
    return (
      <div className={styles.monthCalendar}>
        <div className={styles.monthHeader}>
          <button className={styles.monthNavButton} onClick={handlePrevMonth}>‹</button>
          <h2 className={styles.monthTitle}>
            {capitalizeFirstLetter(format(currentMonth, 'MMMM yyyy', { locale: vi }))}
          </h2>
          <button className={styles.monthNavButton} onClick={handleNextMonth}>›</button>
        </div>

        <div className={styles.weekdayLabels}>
          <div className={styles.weekdayLabel}>Mon</div>
          <div className={styles.weekdayLabel}>Tu</div>
          <div className={styles.weekdayLabel}>We</div>
          <div className={styles.weekdayLabel}>Th</div>
          <div className={styles.weekdayLabel}>Fr</div>
          <div className={styles.weekdayLabel}>Sa</div>
          <div className={styles.weekdayLabel}>Su</div>
        </div>

        <div className={styles.monthDaysGrid}>
          {weeks.map((week, weekIndex) => (
            week.map((day, dayIndex) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelected = isSameDay(day, selectedDate);
              const hasInterviews = getInterviewsByDate(day).length > 0;
              
              let dayClassName = styles.emptyDay;
              if (isCurrentMonth) {
                dayClassName = isSelected ? styles.selectedDay : styles.monthDay;
                if (hasInterviews && !isSelected) {
                  dayClassName = styles.interviewDay;
                }
              }
              
              return (
                <div 
                  key={`day-${weekIndex}-${dayIndex}`} 
                  className={dayClassName}
                  onClick={() => isCurrentMonth && handleDateSelect(day)}
                >
                  {day.getDate()}
                </div>
              );
            })
          ))}
        </div>
      </div>
    );
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return renderMonthCalendar();
};

export default MonthlyCalendar;