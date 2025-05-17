import { AuthApi, UserApi } from "@/api";
import { COOKIE_KEY, setCookie } from "@/api/cookies";
import { put, take, takeLatest, call } from "redux-saga/effects";
import { AuthActions, UserActions } from "../actions";
import { AuthState, LoginResponse } from "@/store/types";
import callApi, { handleError } from "./common-saga";

function* update(
  action: ReturnType<typeof UserActions.updateUserAction.request>
) {
  try {
    const response: AuthState = yield call(UserApi.updateUser, action.payload);
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
