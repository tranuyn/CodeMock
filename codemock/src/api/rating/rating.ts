import { get, patch, post, del } from "@/api/rest-utils";
import { CreateRatingPayload, Rating } from "./rating.type";

export const createRating = (data: CreateRatingPayload) => {
  return post('/ratings/create', data);
};

export const getRatingById = (id: string) => {
  return get(`/ratings/${id}`);
};

export const updateRating = (id: string, data: Partial<Rating>) => {
  return patch(`/ratings/${id}`, data);
};

export const deleteRating = (id: string) => {
  return del(`/ratings/${id}`);
};

export const getRatingsByMentor = (mentorId: string) => {
  return get(`/ratings/mentor/${mentorId}`);
};

export const getRatingsByCandidate = (candidateId: string) => {
  return get(`/ratings/candidate/${candidateId}`);
};
