import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";
import { InterviewSessionResult } from "@/api/interview/interview-session.type";

export interface Rating {
  ratingId?: string;
  candidate?: any;
  mentor?: any;
  interviewSession?: InterviewSessionResult| { sessionId: string };
  slot: InterviewSlotResult | { slotId: string }; // linh hoạt cho create
  ratingStar: number;
  comment: string;
}
export interface CreateRatingPayload {
  candidate: { id: string };
  mentor: { id: string };
  interviewSession: { sessionId: string };
  slot: { slotId: string };
  ratingStar: number;
  comment: string;
}
