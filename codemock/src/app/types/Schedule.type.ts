// types/index.ts
export enum UserRole {
  INTERVIEWER = "INTERVIEWER", // Người phỏng vấn
  INTERVIEWEE = "INTERVIEWEE", // Người được phỏng vấn
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  warningCount?: number;
}

export interface Interview {
  id: string;
  title: string;
  specialization: string;
  position: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  technologies: string[];
  interviewerId: string;
  interviewerName: string;
  intervieweeId?: string;
  intervieweeName?: string;
  status: InterviewStatus;
}

export enum InterviewStatus {
  SCHEDULED = "SCHEDULED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
