// types/index.ts

import { ROLE } from "../enums/user-role.enum";

export interface User {
  id: string;
  name: string;
  email: string;
  role: ROLE;
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
