import { call, put, takeLatest } from "redux-saga/effects";
import { callApiWithoutToken } from "@/api/rest-utils";
import { handleError } from "@/store/redux-saga/common-saga";
import { GET_ALL_MAJOR, setAllMajor } from "@/store/actions/major-action";
import { Major } from "../types/major.type";

function* getAllMajorSaga() {
  try {
    const response: { data: Major[] } = yield call(callApiWithoutToken.get, "/major");
    yield put(setAllMajor(response.data));
  } catch (error) {
    yield call(handleError, error, true);
  }
}

export default function* majorWatcher() {
  yield takeLatest(GET_ALL_MAJOR, getAllMajorSaga);
}
