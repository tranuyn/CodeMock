import { Technology } from "./../redux-saga/technology-sagas";
import { createAsyncAction } from "typesafe-actions";
import { AuthState } from "../types/auth-type";

const PREFIX = "USER_ACTION/";

interface UpdateUserParams extends Partial<AuthState> {
  majorIds?: string[];
  levelIds?: string[];
  technologyIds?: string[];
}

const updateUserAction = createAsyncAction(
  `${PREFIX}UPDATE_USER_REQUEST`,
  `${PREFIX}UPDATE_USER_SUCCESS`,
  `${PREFIX}UPDATE_USER_FAILURE`,
  `${PREFIX}UPDATE_USER_CANCEL`
)<UpdateUserParams, AuthState, Error, void>();

export default { updateUserAction };
