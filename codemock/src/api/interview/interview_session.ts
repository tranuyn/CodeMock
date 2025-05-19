import { get, post, put, patch } from "@/api/rest-utils";

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
  title?: string;
  interviewSlots:  {
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
  mentor: { id: string; username: string };
  description: string;
  sessionPrice: number;
};

export type UpdateInterviewSessionPayload =
  Partial<CreateInterviewSessionPayload>;

// Tạo session
export const createInterviewSession = async (
  payload: CreateInterviewSessionPayload
) => {
  return await post("/interview_sessions", payload);
};

// Lấy tất cả sessions
export const getAllInterviewSessions = async () => {
  return await get(`/interview_sessions`);
};

// Lấy session theo ID
export const getInterviewSessionById = async (id: string) => {
  return await get(`/interview_sessions/${id}`);
};

// Lấy tất cả session của mentor
export const getInterviewSessionsByMentor = async () => {
  return await get(`/interview_sessions/my-interview-sessions`);
};

// Cập nhật session
export const updateInterviewSession = async (
  id: string,
  payload: UpdateInterviewSessionPayload
) => {
  return await put(`/interview_sessions/${id}`, payload);
};

// Xoá session
export const cancelInterviewSession = async (id: string) => {
  return await patch(`/interview_sessions/${id}/cancel`);
};