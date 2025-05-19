import { UserApi } from "@/api";
import { put, takeLatest, call } from "redux-saga/effects";
import { UserActions } from "../actions";
import { callApiWithRefresh, handleError } from "./common-saga";
import { SagaIterator } from "redux-saga";

function* update(
  action: ReturnType<typeof UserActions.updateUserAction.request>
): SagaIterator {
  try {
    const response = yield call(
      callApiWithRefresh,
      UserApi.updateUser,
      action.payload
    );
    localStorage.setItem("user", JSON.stringify(response));
    yield put(UserActions.updateUserAction.success(response));
  } catch (error) {
    yield call(handleError, error, true);
    yield put(UserActions.updateUserAction.failure(error as Error));
  }
}

function* userWatcher() {
  yield takeLatest(UserActions.updateUserAction.request, update);
}

export default userWatcher;
