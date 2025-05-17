export interface AuthState {
  id: string;
  username: string;
  email: string;
  phone: string;
  account_type: string;
  role: string;
  is_active: boolean;
  experiences: experience_detail[];
  skill: string[];
  educationLevel: string;
  createdAt: string;
  warning_count: number;
  warning_until: Date | null;
  lastLogin: Date | null;
  coinBalance: Number;
  avataUrl: string;
  address: string;
  resumeUrl: string;
  educationBackground: experience_detail[];
  biography: string;
  average_point: number;
  majors: Detail[];
  levels: Detail[];
  technologies: Detail[];
  current_activity: experience_detail[];
  specialization_skill: String[];
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
  yearEnd: number;
  imageUrl: string;
}

export interface LoginResponse {
  access_token: string | null;
  user: AuthState;
  error: string;
  loading: boolean;
}
