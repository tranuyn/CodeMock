import { InterviewInSchedule } from "@/app/features/Schedule/page";

export interface InterviewState {
  interviews: InterviewInSchedule[];
  loading: boolean;
  error: string | null;
}

const initialState: InterviewState = {
  interviews: [],
  loading: false,
  error: null,
};

type Action =
  | { type: "FETCH_INTERVIEWS_REQUEST" }
  | { type: "FETCH_INTERVIEWS_SUCCESS"; payload: InterviewInSchedule[] }
  | { type: "FETCH_INTERVIEWS_FAILURE"; payload: string }
  | { type: "CLEAR_INTERVIEWS" };

const interviewReducer = (state = initialState, action: Action): InterviewState => {
  switch (action.type) {
    case "FETCH_INTERVIEWS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_INTERVIEWS_SUCCESS":
      return { ...state, loading: false, interviews: action.payload };
    case "FETCH_INTERVIEWS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_INTERVIEWS":
      return { ...initialState };
    default:
      return state;
  }
};

export default interviewReducer;
