import { get, post, put, del } from "@/api/rest-utils";

export type CreateInterviewSessionPayload = {
  mentorId: string;
  scheduleDateTime: string;
  duration: number;
  slotDuration: number;
  status: string;
  major_id: string[];
  level_id: string;
  requiredTechnology: string[];
  sessionPrice: number;
  meetingLink?: string;
  recordingURL?: string;
};

export type UpdateInterviewSessionPayload =
  Partial<CreateInterviewSessionPayload>;

// Tạo session
export const createInterviewSession = async (
  payload: CreateInterviewSessionPayload
) => {
  return await post("/interview_sessions", payload);
};

// Lấy session theo ID
export const getInterviewSessionById = async (id: string) => {
  return await get(`/interview_sessions/${id}`);
};

// Lấy tất cả session của mentor
export const getInterviewSessionsByMentor = async (mentorId: string) => {
  return await get(`/interview_sessions/mentor/${mentorId}`);
};

// Cập nhật session
export const updateInterviewSession = async (
  id: string,
  payload: UpdateInterviewSessionPayload
) => {
  return await put(`/interview_sessions/${id}`, payload);
};

// Xoá session
export const deleteInterviewSession = async (id: string) => {
  return await del(`/interview_sessions/${id}`);
};
