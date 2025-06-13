import { call, put, takeLatest } from "redux-saga/effects";
import { callApiWithoutToken } from "@/api/rest-utils";
import { handleError } from "@/store/redux-saga/common-saga";
import { setAllTechnology } from "@/store/actions/technology-action";
import { GET_ALL_TECHNOLOGY } from "@/store/actions/technology-action";
import { Technology } from "@/store/types/technology.type";

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

    yield put(setAllTechnology(response.data));

    if (action.callback) {
      yield call(action.callback, response.data);
    }
  } catch (error) {
    yield call(handleError, error, true);
  }
}

function* technologyWatcher() {
  yield takeLatest(GET_ALL_TECHNOLOGY, getAllTechnology);
}

export default technologyWatcher;
