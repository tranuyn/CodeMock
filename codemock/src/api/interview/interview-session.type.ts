import { PublicMentorInfo } from "../user/user.type";

// export type CreateInterviewSessionPayload = {
//   mentorId: string;
//   startTime: string;
//   totalSlots: number;
//   slotDuration: number;
//   majorIds: string[];
//   levelId: string;
//   requiredTechnologyIds: string[];
//   sessionPrice: number;
//   meetingLink?: string;
//   recordingURL?: string;
//   description: string;
//   requirement?: string;
// };

export type InterviewSessionResult = {
  sessionId: string;
  startTime: string;
  endTime?: string;
  totalSlots: number;
  slotDuration: number;
  title: string;
  roomId: string;
  interviewSlots: {
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
  mentor: PublicMentorInfo;
  description: string;
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
  pageNumber?: number;
  pageSize?: number;
  sortField?: 'title' | 'createdAt' | 'updatedAt' | 'level' | 'major';
  sortOrder?: 'ASC' | 'DESC';
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