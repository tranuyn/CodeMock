// store/redux-saga/interview-sagas.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getInterviewSessionsByMentor,
} from "@/api/interview/interview-session";
import {
  getInterviewSlotsByCandidate,
} from "@/api/interview-slot/interview-slot";
import { mapSessionToInterview, mapSlotToInterview } from "@/app/features/Schedule/mapToSchedule";

// import { groupCandidateSlotsToSessions } from "@/app/utils/groupCandidateSlotsToSessions";
import { InterviewSlotResult } from "@/api/interview-slot/interview-slot.type";

function* handleFetchInterviews(action: any): Generator<any, void, any> {
  try {
    const { role } = action.payload;
    let result = [];

    if (role === "MENTOR") {
      const sessions = yield call(getInterviewSessionsByMentor);
      result = sessions.map(mapSessionToInterview);
    } else {
      const slots = yield call(getInterviewSlotsByCandidate);
      result = slots.map((slot: InterviewSlotResult) =>
        mapSlotToInterview(slot.interviewSession, slot)
      ); // mỗi slot riêng biệt
    }

    yield put({
      type: "FETCH_INTERVIEWS_SUCCESS",
      payload: result,
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
