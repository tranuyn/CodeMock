import { get, post, put } from "@/api/rest-utils";
import { callApiWithRefreshAsync } from "@/store/redux-saga/common-saga";
import { CreateSlotPayload, Register_CancelSlotPayload } from "./interview-slot.type";

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
