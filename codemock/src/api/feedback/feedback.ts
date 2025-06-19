import { get, post, patch, del } from "../rest-utils";
import { Feedback } from "./feedback.type";

export const createFeedback = (data: Partial<Feedback>) => {
  return post(`/feedbacks/create`, data);
};

export const getFeedbackById = (id: string) => {
  return get(`/feedbacks/${id}`);
};

export const updateFeedback = (id: string, data: Partial<Feedback>) => {
  return patch(`/feedbacks/${id}`, data);
};

export const deleteFeedback = (id: string) => {
  return del(`/feedbacks/${id}`);
};
