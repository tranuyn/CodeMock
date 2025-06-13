import { call, put, takeLatest } from "redux-saga/effects";
import { callApiWithoutToken } from "@/api/rest-utils";
import { handleError } from "@/store/redux-saga/common-saga";
import { SET_ALL_LEVEL, GET_ALL_LEVEL } from "@/store/actions/level-action";
import { Level } from "../types/level.type";

function* getAllLevelSaga() {
  try {
    const response: { data: Level[] } = yield call(
      callApiWithoutToken.get,
      "/level"
    );
    yield put({ type: SET_ALL_LEVEL, payload: response.data });
  } catch (error) {
    yield call(handleError, error, true);
  }
}

export default function* levelWatcher() {
  yield takeLatest(GET_ALL_LEVEL, getAllLevelSaga);
}
