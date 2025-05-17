import { get, post, put } from "@/api/rest-utils";

export type RegisterSlotPayload = {
  candidateId: string;
};

export type CancelSlotPayload = {
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

export const createInterviewSlot = async (payload: CreateSlotPayload) => {
  return await post("/interview-slot", payload);
};

export const getAllInterviewSlots = async () => {
  return await get("/interview-slot");
};

export const getInterviewSlotsByUser = async (userId: string) => {
  return await get(`/interview-slot/user/${userId}`);
};

export const registerInterviewSlot = async (
  slotId: string,
  payload: RegisterSlotPayload
) => {
  return await put(`/interview-slot/${slotId}/register`, payload);
};

export const cancelInterviewSlot = async (
  slotId: string,
  payload: CancelSlotPayload
) => {
  return await put(`/interview-slot/${slotId}/cancel`, payload);
};
