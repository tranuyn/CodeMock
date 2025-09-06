import { get, patch, post, put } from "@/api/rest-utils";
import { callApiWithRefreshAsync } from "@/store/redux-saga/common-saga";
import {
  CancelSlotPayload,
  CreateSlotPayload,
  InterviewSlotResult,
  Register_CancelSlotPayload,
  SearchInterviewSlotRequest,
  MoMoPaymentRequest,
  MoMoPaymentResponse,
} from "./interview-slot.type";
import { PaginatedResult } from "@/types/paginate";

export const createInterviewSlot = async (payload: CreateSlotPayload) => {
  return await post("/interview-slot", payload);
};

export const getAllInterviewSlots = async () => {
  return await get("/interview-slot");
};

export const getInterviewSlotsByCandidate = async () => {
  return await get(`/interview-slot/my-interview-slots`);
};

export const searchInterviewSlots = async (
  params: SearchInterviewSlotRequest
): Promise<PaginatedResult<InterviewSlotResult>> => {
  return await get("/interview-slot/search", params);
};
export const getInterviewSlotById = async (slotId: string): Promise<InterviewSlotResult> => {
  return await get(`/interview-slot/${slotId}`);
};


export const registerInterviewSlot = async (
  slotId: string,
  payload: Register_CancelSlotPayload
) => {
  return await put(`/interview-slot/${slotId}/register`, payload);
};

export const cancelInterviewSlot = async (
  slotId: string,
  payload: CancelSlotPayload
) => {
  return await patch(`/interview-slot/${slotId}/cancel`, payload);
};

export const getZegoCloudToken = async (
  slotId: string,
  expiredNumber: number
): Promise<{ token: string; roomId: string }> => {
  return await callApiWithRefreshAsync<{ token: string; roomId: string }>(
    get,
    `/interview_sessions/${slotId}/joinMeeting`,
    { expiredNumber }
  );
};

export const createPaymentToRegister = async (
  payload: MoMoPaymentRequest
): Promise<MoMoPaymentResponse> => {
  return await post(`/momo/create-payment`, payload);
};
