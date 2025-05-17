import { Interview } from "./page";
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
