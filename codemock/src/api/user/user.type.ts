import { ROLE } from "@/app/enums/user-role.enum";

export type MentorSkill = {
  detail: string;
  yearStart: number;
  work_space: string;
  url_company: string;
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
  avataUrl?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  skills?: MentorSkill[];
  experiences?: ExperienceDetail[];
  educationBackground?: MentorEducation[];
  averageRating?: number | null;
  totalInterviews?: number | null;
};
