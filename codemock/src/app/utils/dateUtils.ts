// utils/dateUtils.ts

// Lấy ngày đầu tiên của tuần (Thứ Hai)
export function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Điều chỉnh cho Chủ nhật
  return new Date(date.setDate(diff));
}

// Lấy thứ trong tiếng Việt
export function getVietnameseDayOfWeek(day: number): string {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return days[day];
}

// Định dạng ngày tháng thành chuỗi
export function formatDate(date: Date): string {
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

// Định dạng giờ thành chuỗi
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Lấy danh sách các ngày trong tuần từ ngày bắt đầu tuần
export function getWeekDays(startOfWeek: Date): Date[] {
  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }
  return weekDays;
}

// Lấy danh sách các ngày trong tháng
export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Thêm các ngày từ đầu tháng đến cuối tháng
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

// Lấy danh sách ngày cho lịch tháng (bao gồm cả ngày cuối tháng trước và đầu tháng sau)
export function getCalendarDays(year: number, month: number): Date[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = daysInMonth[0];
  const lastDayOfMonth = daysInMonth[daysInMonth.length - 1];

  const result: Date[] = [];

  // Lấy ngày đầu tuần của ngày đầu tiên trong tháng
  const startOfFirstWeek = getStartOfWeek(new Date(firstDayOfMonth));

  // Thêm các ngày từ tháng trước nếu cần
  let currentDay = new Date(startOfFirstWeek);
  while (currentDay < firstDayOfMonth) {
    result.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Thêm các ngày trong tháng
  result.push(...daysInMonth);

  // Thêm các ngày còn lại trong tuần cuối cùng
  const lastDayOfWeekOfLastDay = new Date(lastDayOfMonth);
  lastDayOfWeekOfLastDay.setDate(
    lastDayOfMonth.getDate() + ((7 - lastDayOfMonth.getDay()) % 7)
  );

  currentDay = new Date(lastDayOfMonth);
  currentDay.setDate(currentDay.getDate() + 1);

  while (currentDay <= lastDayOfWeekOfLastDay) {
    result.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return result;
}

// Kiểm tra xem một ngày có phải là ngày hiện tại không
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
