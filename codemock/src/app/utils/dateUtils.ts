import { InterviewSessionResult } from "@/api/interview/interview-session.type";

export function parseSessionTime(session: InterviewSessionResult) {
  const start = new Date(session.startTime);
  const end = session.endTime
    ? new Date(session.endTime)
    : new Date(start.getTime() + session.slotDuration * 60000 * session.totalSlots);
  return { start, end };
}
