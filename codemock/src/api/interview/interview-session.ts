import { get, post, put, patch } from "@/api/rest-utils";
import {
  CreateInterviewSessionPayload,
  InterviewSessionResult,
  SearchInterviewSessionRequest,
  UpdateInterviewSessionPayload,
} from "./interview-session.type";
import { PaginatedResult } from "@/types/paginate";
import { callApiWithRefreshAsync } from "@/store/redux-saga/common-saga";

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

//Search session
export const searchInterviewSessions = async (
  params: SearchInterviewSessionRequest
): Promise<PaginatedResult<InterviewSessionResult>> => {
  return await get("/interview_sessions/search", params);
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
