import { InterviewSessionResult } from "../interview/interview-session.type";
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
  interviewSession: InterviewSessionResult;
};
