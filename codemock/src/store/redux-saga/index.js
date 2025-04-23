import { all, call } from "redux-saga/effects";
import authWatcher from "./auth-sagas";
import majorWatcher from "./major-sagas";
import levelWatcher from "./level-sagas";
import technologyWatcher from "./technology-sagas";
function* rootSaga() {
  yield all([
    call(authWatcher),
    call(majorWatcher),
    call(levelWatcher),
    call(technologyWatcher),
  ]);
}

export default rootSaga;
