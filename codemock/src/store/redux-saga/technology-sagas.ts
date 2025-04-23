import { callApiWithoutToken } from "@/api/rest-utils";
import { handleError } from "@/store/redux-saga/common-saga";
import { AuthState } from "@/store/types";
import axios from "axios";
import { call, takeLatest } from "redux-saga/effects";

export interface Technology {
  id: string;
  name: string;
  user_count: string;
  users: AuthState[];
}

interface GetAllTechnologyAction {
  type: string;
  callback?: (data: Technology[]) => void;
}

export function* getAllTechnology(action: GetAllTechnologyAction) {
  try {
    const response: { data: Technology[] } = yield call(
      callApiWithoutToken.get,
      "/technology"
    );
    if (action.callback) {
      yield call(action.callback, response.data);
    }
  } catch (error) {
    yield call(handleError, error, true);
  }
}

function* technologyWatcher() {
  yield takeLatest("GET_ALL_TECHNOLOGY", getAllTechnology);
}

export default technologyWatcher;
