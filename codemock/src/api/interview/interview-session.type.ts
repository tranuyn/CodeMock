import { SORT_FIELD } from "@/app/enums/sortField";
import { PublicMentorInfo } from "../user/user.type";
import { SORT_ORDER } from "@/app/enums/sortOrder";

export type InterviewSessionResult = {
  sessionId: string;
  startTime: string;
  endTime?: string;
  totalSlots: number;
  slotDuration: number;
  title: string;
  roomId: string;
  status: string;
  createdAt: string;
  interviewSlots: {
    slotId: string;
    startTime: string;
    endTime: string;
    status: string;
    isPaid: boolean;
    resumeUrl?: string;
    feedback?: string;
  }[];
  requiredTechnologies: { id: string; name: string }[];
  majors: { id: string; name: string }[];
  level: { id: string; name: string };
  meetingLink?: string;
  recordingURL?: string;
  mentor: PublicMentorInfo;
  description: string;
  requirement?: string;
  sessionPrice: number;
};

export type UpdateInterviewSessionPayload =
  Partial<CreateInterviewSessionPayload>;

export type SearchInterviewSessionRequest = {
  search?: string;
  mentorId?: string;
  status?: string;
  levelId?: string;
  majorIds?: string;
  slotDuration?: number;
  isFree?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sortField?: SORT_FIELD;
  sortOrder?: SORT_ORDER;
};

export type CreateInterviewSessionPayload = {
  title: string;
  mentorId: string;
  description: string;
  requirement?: string | null;
  startTime: string; // ISO 8601 format
  slotDuration: number;
  totalSlots: number;
  sessionPrice: number;
  majorIds: string[];
  levelId: string;
  requiredTechnologyIds: string[];
  meetingLink?: string | null;
  recordingURL?: string | null;
};

export type InterviewFormData = Omit<
  CreateInterviewSessionPayload,
  "mentorId" | "startTime" | "requiredTechnologyIds"
> & {
  date: Date;
  time: Date;
  technologyIds: string[];
};