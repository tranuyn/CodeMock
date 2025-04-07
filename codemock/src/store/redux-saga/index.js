import { all, call } from "redux-saga/effects";
import authWatcher from "./auth-sagas";
function* rootSaga() {
  yield all([call(authWatcher)]);
}

export default rootSaga;
