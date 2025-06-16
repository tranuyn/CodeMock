import { PublicMentorInfo } from "../user/user.type";

export type Register_CancelSlotPayload = {
  candidateId: string;
  resumeUrl?: string;
};

export type CreateSlotPayload = {
  sessionId: string;
  startTime: string;
  endTime: string;
  candidateId?: string;
  status?: string;
  isPaid?: boolean;
};

export type InterviewSlotResult = {
  slotId: string;
  candidateId?: string;
  startTime: string;
  endTime: string;
  status: string;
  updatedAt?: string;
  feedback?: any;
  resumeUrl?: string;
  isPaid: boolean;
  interviewSession: {
    sessionId: string;
    title: string;
    startTime: string; 
    endTime?: string; 
    totalSlots: number;
    slotDuration: number;
    status: string;
    sessionPrice: number;
    description?: string;
    requirement?: string | null;
    meetingLink?: string;
    recordingURL?: string;
    roomId: string;
    mentor?: PublicMentorInfo;
    requiredTechnologies: { id: string; name: string }[];
    majors: { id: string; name: string }[];
    level: { id: string; name: string };
  };
};
