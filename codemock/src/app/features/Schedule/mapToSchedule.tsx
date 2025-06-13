import { InterviewSlotResult } from "@/api/interview-slot/interview-slot";
import { format } from "date-fns";
import { InterviewInSchedule } from "./page";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";
export const mapSlotToInterview = (
  slot: InterviewSlotResult
): InterviewInSchedule => {
  const start = new Date(slot.startTime);
  const end = new Date(slot.endTime);
  return {
    type: "SLOT",
    raw: slot,
    display: {
      id: slot.slotId,
      title: slot.interviewSession.title || "Buổi phỏng vấn",
      date: start,
      startTime: format(start, "HH:mm"),
      endTime: format(end, "HH:mm"),
      majors: slot.interviewSession.majors ?? [],
      requiredTechnologies: slot.interviewSession.requiredTechnologies ?? [],
      interviewer: "Mentor",
      level: slot.interviewSession.level,
      roomId: slot.interviewSession.roomId,
      sessionId: slot.interviewSession.sessionId,
    },
  };
};

export const mapSessionToInterview = (
  session: InterviewSessionResult
): InterviewInSchedule => {
  const start = new Date(session.startTime);
  const end = session.endTime
    ? new Date(session.endTime)
    : new Date(
        start.getTime() + session.totalSlots * session.slotDuration * 60000
      );

  return {
    type: "SESSION",
    raw: session,
    display: {
      id: session.sessionId,
      title: session.description ?? "Buổi phỏng vấn",
      date: start,
      startTime: format(start, "HH:mm"),
      endTime: format(end, "HH:mm"),
      majors: session.majors ?? [],
      requiredTechnologies: session.requiredTechnologies ?? [],
      interviewer: session.mentor?.username ?? "Mentor",
      level: session.level,
      roomId: session.roomId,
      sessionId: session.sessionId,
    },
  };
};
