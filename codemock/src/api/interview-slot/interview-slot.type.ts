import { SORT_FIELD } from "@/app/enums/sortField";
import { InterviewSessionResult } from "../interview/interview-session.type";
import { PublicMentorInfo } from "../user/user.type";
import { SORT_ORDER } from "@/app/enums/sortOrder";
import { Feedback } from "../feedback/feedback.type";
import { Rating } from "../rating/rating.type";

export type Register_CancelSlotPayload = {
  candidateId: string;
  resumeUrl?: string;
};
export type CancelSlotPayload = {
  cancelReason: string;
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
  feedback?: Feedback;
  resumeUrl?: string;
  isPaid: boolean;
  interviewSession: InterviewSessionResult;
  rating?: Rating
};

export type SearchInterviewSlotRequest = {
  search?: string;
  mentorId?: string;
  status?: string;
  levelId?: string;
  majorIds?: string;
  slotDuration?: number;
  isFree?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sortField?: SORT_FIELD;
  sortOrder?: SORT_ORDER;
};