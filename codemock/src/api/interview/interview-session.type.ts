import { PublicMentorInfo } from "../user/user.type";

export type CreateInterviewSessionPayload = {
  mentorId: string;
  startTime: string;
  totalSlots: number;
  slotDuration: number;
  majorIds: string[];
  levelId: string;
  requiredTechnologyIds: string[];
  sessionPrice: number;
  meetingLink?: string;
  recordingURL?: string;
  description: string;
  requirement?: string;
};

export type InterviewSessionResult = {
  sessionId: string;
  startTime: string;
  endTime?: string;
  totalSlots: number;
  slotDuration: number;
  title: string;
  interviewSlots: {
    slotId: string;
    startTime: string;
    endTime: string;
    status: string;
    isPaid: boolean;
  }[];
  requiredTechnologies: { id: string; name: string }[];
  majors: { id: string; name: string }[];
  level: { id: string; name: string };
  meetingLink?: string;
  recordingURL?: string;
  mentor: PublicMentorInfo;
  description: string;
  sessionPrice: number;
};

export type UpdateInterviewSessionPayload =
  Partial<CreateInterviewSessionPayload>;
