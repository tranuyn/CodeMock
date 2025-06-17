import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";
import { PublicMentorInfo } from "@/api/user/user.type";
import { ROLE } from "../enums/user-role.enum";

export function groupCandidateSlotsToSessions(
  slots: InterviewSlotResult[]
): InterviewSessionResult[] {
  const sessionMap: Record<string, InterviewSessionResult> = {};

  slots.forEach((slot) => {
    const session = slot.interviewSession;

    if (!sessionMap[session.sessionId]) {
      // Tạo object session ban đầu (nếu chưa có)
      sessionMap[session.sessionId] = {
        sessionId: session.sessionId,
        title: session.title,
        startTime: session.startTime,
        endTime: session.endTime,
        totalSlots: session.totalSlots,
        slotDuration: session.slotDuration,
        status: session.status,
        sessionPrice: session.sessionPrice,
        description: session.description ?? "",
        requirement: session.requirement ?? "",
        meetingLink: session.meetingLink ?? "",
        recordingURL: session.recordingURL ?? "",
        roomId: session.roomId,

        level: session.level,
        majors: session.majors,
        requiredTechnologies: session.requiredTechnologies,

        interviewSlots: [],
        mentor: session.mentor ?? getDefaultMentor(),
      };
    }

    // Push slot đã đăng ký vào session tương ứng
    sessionMap[session.sessionId].interviewSlots.push({
      slotId: slot.slotId,
      status: slot.status,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isPaid: slot.isPaid,
      resumeUrl: slot.resumeUrl,
      feedback: slot.feedback,
    });
  });

  return Object.values(sessionMap);
}

// Helper mặc định nếu thiếu mentor
function getDefaultMentor(): PublicMentorInfo {
  return {
    id: "unknown",
    username: "Mentor",
    role: ROLE.MENTOR,
    avatarUrl: "",
    phone: "",
    biography: "",
    address: "",
    createdAt: "",
    updatedAt: "",
    skills: [],
    experiences: [],
    educationBackground: [],
    averageRating: null,
    totalInterviews: null,
  };
}
