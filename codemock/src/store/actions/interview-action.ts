// store/actions/interview-action.ts
import { InterviewInSchedule } from "@/app/features/Schedule/page";

export const fetchInterviewsRequest = (payload: {
  userId: string;
  role: "MENTOR" | "CANDIDATE";
}) => ({
  type: "FETCH_INTERVIEWS_REQUEST",
  payload,
});

export const fetchInterviewsSuccess = (payload: InterviewInSchedule[]) => ({
  type: "FETCH_INTERVIEWS_SUCCESS",
  payload,
});

export const fetchInterviewsFailure = (payload: string) => ({
  type: "FETCH_INTERVIEWS_FAILURE",
  payload,
});

export const clearInterviews = () => ({
  type: "CLEAR_INTERVIEWS",
});
