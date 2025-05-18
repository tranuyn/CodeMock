import { callApiWithoutToken } from "@/api/rest-utils";
import { handleError } from "@/store/redux-saga/common-saga";
import { AuthState } from "@/store/types";
import { call, takeLatest } from "redux-saga/effects";

export interface Level {
  id: string;
  name: string;
  user_count: string;
  users: AuthState[];
}

interface GetAllLevelAction {
  type: string;
  callback?: (data: Level[]) => void;
}

export function* getAllLevel(action: GetAllLevelAction) {
  try {
    const response: { data: Level[] } = yield call(
      callApiWithoutToken.get,
      "/level"
    );
    if (action.callback) {
      yield call(action.callback, response.data);
    }
  } catch (error) {
    yield call(handleError, error, true);
  }
}

function* levelWatcher() {
  yield takeLatest("GET_ALL_LEVEL", getAllLevel);
}

export default levelWatcher;
