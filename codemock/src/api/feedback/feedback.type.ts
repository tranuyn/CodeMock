export interface Feedback {
  feedbackId?: string;
  strengths: string;
  improvementAreas: string;
  overallPerformance: string;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  createAt?: string;
  slot: {
    slotId: string;
  };
}
