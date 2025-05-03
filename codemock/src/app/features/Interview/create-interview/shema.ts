import { Level } from "@/store/redux-saga/level-sagas";
import { Major } from "@/store/redux-saga/major-sagas";
import { Technology } from "@/store/redux-saga/technology-sagas";

export interface InterviewFormData {
  title: string;
  majors: string[]; // Select multiple
  levels: string[]; // Select multiple
  technologies: string[]; // Select multiple
  cost: number;
  day: Date;
  duration: number;
  slot_count: number;
  start_time: TimeRanges;
}
