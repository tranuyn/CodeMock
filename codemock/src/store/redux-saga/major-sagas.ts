import { callApiWithoutToken } from "@/api/rest-utils";
import { handleError } from "@/store/redux-saga/common-saga";
import { AuthState } from "@/store/types";
import axios from "axios";
import { call, takeLatest } from "redux-saga/effects";

export interface Major {
  id: string;
  name: string;
  user_count: string;
  users: AuthState[];
}

interface GetAllMajorAction {
  type: string;
  callback?: (data: Major[]) => void;
}

export function* getAllMajor(action: GetAllMajorAction) {
  try {
    const response: { data: Major[] } = yield call(
      callApiWithoutToken.get,
      "/major"
    );
    if (action.callback) {
      yield call(action.callback, response.data);
    }
  } catch (error) {
    yield call(handleError, error, true);
  }
}

function* majorWatcher() {
  yield takeLatest("GET_ALL_MAJOR", getAllMajor);
}

export default majorWatcher;
