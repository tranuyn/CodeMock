import { SORT_FIELD } from "@/app/enums/sortField";
import { InterviewSessionResult } from "../interview/interview-session.type";
import { PublicMentorInfo } from "../user/user.type";
import { SORT_ORDER } from "@/app/enums/sortOrder";

export type Register_CancelSlotPayload = {
  candidateId: string;
  resumeUrl?: string;
  payByCodemockCoin?: boolean;
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
  feedback?: any;
  resumeUrl?: string;
  isPaid: boolean;
  interviewSession: InterviewSessionResult;
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

export interface MoMoPaymentRequest {
  amount: string;
  orderInfo?: string;
  redirectUrl?: string;
  ipnUrl?: string;
  extraData?: string;
}

export interface MoMoPaymentResponse {
  partnerCode: string;
  requestId: string;
  orderId: string;
  amount: string;
  responseTime: number;
  message: string;
  payUrl?: string;
  shortLink?: string;
}
