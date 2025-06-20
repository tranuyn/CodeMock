import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";
import { InterviewInSchedule } from "./page";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

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
    data: session,
  };
};

export const mapSlotToInterview = (
  session: InterviewSessionResult,
  slot?: InterviewSlotResult
): InterviewInSchedule => {
  const start = new Date(session.startTime);
  const end = session.endTime
    ? new Date(session.endTime)
    : new Date(
        start.getTime() + session.totalSlots * session.slotDuration * 60000
      );

  return {
    type: "SLOT",
    data: session,
    slotData: slot || undefined
  };
};
