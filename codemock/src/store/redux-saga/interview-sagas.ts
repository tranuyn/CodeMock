// store/redux-saga/interview-sagas.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getInterviewSessionsByMentor,
} from "@/api/interview/interview-session";
import {
  getInterviewSlotsByCandidate,
} from "@/api/interview-slot/interview-slot";
import { mapSessionToInterview } from "@/app/features/Schedule/mapToSchedule";

import { groupCandidateSlotsToSessions } from "@/app/utils/groupCandidateSlotsToSessions";

function* handleFetchInterviews(action: any): Generator<any, void, any> {
  try {
    const { userId, role } = action.payload;
    let result = [];

    if (role === "MENTOR") {
      const sessions = yield call(getInterviewSessionsByMentor);
      result = sessions.map(mapSessionToInterview); // raw là SESSION
    } else {
      const slots = yield call(getInterviewSlotsByCandidate);
      const groupedSessions = groupCandidateSlotsToSessions(slots);
      result = groupedSessions.map(mapSessionToInterview); // raw là SESSION
    }

    yield put({
      type: "FETCH_INTERVIEWS_SUCCESS",
      payload: result, // InterviewInSchedule[]
    });
  } catch (error: any) {
    yield put({
      type: "FETCH_INTERVIEWS_FAILURE",
      payload: error.message,
    });
  }
}


export default function* interviewSagas() {
  yield takeLatest("FETCH_INTERVIEWS_REQUEST", handleFetchInterviews);
}
