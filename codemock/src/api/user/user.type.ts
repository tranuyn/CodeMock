import { ROLE } from "@/app/enums/user-role.enum";

export type MentorSkill = {
  name: string;
  detail?: string | null;
  proficiency_level?: string | null; // Beginner / Intermediate / Advanced / Expert
  years_of_experience?: number | null; // số năm kinh nghiệm, có thể null
  certified?: boolean | null;
};

export type MentorEducation = {
  yearStart: number;
  yearEnd: number;
  position: string;
  work_space: string;
  url_company: string;
};

export interface ExperienceDetail {
  position: string;
  work_space: string;
  url_company: string; //option
  yearStart: number;
  yearEnd: number;
  imageUrl: string;
}

export type PublicMentorInfo = {
  id: string;
  username: string;
  role: ROLE;
  phone?: string;
  biography?: string;
  avatarUrl?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  skills?: MentorSkill[];
  experiences?: ExperienceDetail[];
  educationBackground?: MentorEducation[];
  averageRating?: number | null;
  totalInterviews?: number | null;
};
