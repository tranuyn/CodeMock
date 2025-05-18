import { Interview, InterviewSessionResult } from "./page";
import { InterviewSlotResult } from "./page";
import { format } from "date-fns";

export const mapSlotToInterview = (slot: InterviewSlotResult): Interview => {
  const date = new Date(slot.startTime);
  const localStartTime = new Date(slot.startTime); // Chuyển đổi sang giờ địa phương
  const localEndTime = new Date(slot.endTime); // Chuyển đổi sang giờ địa phương


  return {
    id: slot.slotId,
    title: slot.interviewSession.title || "Buổi phỏng vấn",
    position: "Mentor",
    date,
    startTime: format(localStartTime, 'HH:mm'), // Hiển thị giờ bắt đầu
    endTime: format(localEndTime, 'HH:mm'),
    major: slot.interviewSession.major_id[0] ?? "Unknown",
    technologies: slot.interviewSession.requiredTechnology,
    interviewer: "Mentor",
  };
};
export const mapSessionToInterview = (session: InterviewSessionResult): Interview => {
  const start = new Date(session.startTime);
  const end = session.endTime
    ? new Date(session.endTime)
    : new Date(start.getTime() + session.totalSlots * session.slotDuration * 60000);

  return {
    id: session.sessionId,
    title: session.description ?? "Buổi phỏng vấn",
    position: "Mentor",
    date: start, // cần local để dùng isSameDay
    startTime: format(start, "HH:mm"),
    endTime: format(end, "HH:mm"),
    major: session.majors?.[0]?.name ?? "Unknown",
    technologies: session.requiredTechnologies?.map((t) => t.name) ?? [],
    interviewer: session.mentor?.username ?? "Mentor",
  };
};
