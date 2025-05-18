import { Level } from "../redux-saga/level-sagas";
import { Major } from "../redux-saga/major-sagas";
import { Technology } from "../redux-saga/technology-sagas";

export interface SkillItem {
  detail: string;
  work_space: string;
  url_company: string;
  yearStart: number;
}

export interface AuthState {
  id: string;
  username: string;
  email: string;
  phone: string;
  account_type: string;
  role: string;
  is_active: boolean;
  experiences: experience_detail[];
  skill: SkillItem[];
  educationLevel: string;
  createdAt: string;
  warning_count: number;
  warning_until: Date | null;
  lastLogin: Date | null;
  coinBalance: number;
  avataUrl: string;
  address: string;
  resumeUrl: string;
  educationBackground: experience_detail[];
  biography: string;
  average_point: number;
  majors: Major[];
  levels: Level[];
  technologies: Technology[];
  current_activity: experience_detail[];
  specialization_skill: string[];
  averageRating: number;
  totalInterviews: number;
  //availabilitySchedule: Schedule
}

export interface Detail {
  id: string;
  name: string;
  user_count: number;
}

export interface experience_detail {
  position: string;
  work_space: string;
  url_company: string; //option
  yearStart: number;
  yearEnd?: number;
  imageUrl?: string;
}

export interface LoginResponse {
  access_token: string | null;
  user: AuthState;
  error: string;
  loading: boolean;
}
