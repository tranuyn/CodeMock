import { get, post, put } from "@/api/rest-utils";

export type Register_CancelSlotPayload = {
  candidateId: string;
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
  interviewSession: {
    title?: string;
    sessionId: string;
    requiredTechnologies: { id: string; name: string }[];
    majors: { id: string; name: string }[];
    level: { id: string; name: string };
    mentorId: string;
    slotDuration: number;
    status: string;
    sessionPrice: number;
    description?: string;
    requirement?: string | null;
    meetingLink?: string;
    recordingURL?: string;
  };
};

export const createInterviewSlot = async (payload: CreateSlotPayload) => {
  return await post("/interview-slot", payload);
};

export const getAllInterviewSlots = async () => {
  return await get("/interview-slot");
};

export const getInterviewSlotsByCandidate = async () => {
  return await get(`/interview-slot/my-interview-slots`);
};

export const registerInterviewSlot = async (
  slotId: string,
  payload: Register_CancelSlotPayload
) => {
  return await put(`/interview-slot/${slotId}/register`, payload);
};

export const cancelInterviewSlot = async (
  slotId: string,
  payload: Register_CancelSlotPayload
) => {
  return await put(`/interview-slot/${slotId}/cancel`, payload);
};
