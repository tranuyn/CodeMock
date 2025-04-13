import { AuthApi } from "@/api";
import { COOKIE_KEY, setCookie } from "@/api/cookies";
import { put, take, takeLatest, call } from "redux-saga/effects";
import { AuthActions } from "../actions";
import { AuthState, LoginResponse } from "@/store/types";
import callApi, { handleError } from "./common-saga";

function* login(action: ReturnType<typeof AuthActions.loginAction.request>) {
  const { callback, ...params } = action.payload;
  try {
    const response: LoginResponse = yield callApi(AuthApi.login, {
      email: params.email,
      password: params.password,
    });
    if (response.access_token) {
      setCookie(COOKIE_KEY.Token, response.access_token);
    }
    localStorage.setItem("user", JSON.stringify(response.user));
    yield put(AuthActions.loginAction.success(response));
    if (callback) {
      yield callback();
    }
  } catch (error) {
    yield call(handleError, error, true);
    yield put(AuthActions.loginAction.failure(error as Error));
  }
}

function* signup(
  action: ReturnType<typeof AuthActions.registerAction.request>
) {
  const { callback, ...params } = action.payload;
  try {
    const response: AuthState = yield callApi(AuthApi.signup, params);
    yield put(AuthActions.registerAction.success(response));
    if (callback) {
      yield callback();
    }
  } catch (error) {
    yield call(handleError, error, true);
    yield put(AuthActions.registerAction.failure(error as Error));
  }
}

function* activeAcount(
  action: ReturnType<typeof AuthActions.activeAccountAction.request>
) {
  const { callback, ...params } = action.payload;
  try {
    yield callApi(AuthApi.activeAccount, params);
    yield put(AuthActions.activeAccountAction.success());
    if (callback) {
      yield callback();
    }
  } catch (error) {
    yield call(handleError, error, true);
    yield put(AuthActions.activeAccountAction.failure(error as Error));
  }
}
function* authWatcher() {
  yield takeLatest(AuthActions.loginAction.request, login);
  yield takeLatest(AuthActions.registerAction.request, signup);
  yield takeLatest(AuthActions.activeAccountAction.request, activeAcount);
}

export default authWatcher;
