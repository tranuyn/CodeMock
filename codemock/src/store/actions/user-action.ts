import { createAsyncAction } from "typesafe-actions";
import { AuthState } from "../types/auth-type";

const PREFIX = "USER_ACTION/";

const updateUserAction = createAsyncAction(
  `${PREFIX}UPDATE_USER_REQUEST`,
  `${PREFIX}UPDATE_USER_SUCCESS`,
  `${PREFIX}UPDATE_USER_FAILURE`,
  `${PREFIX}UPDATE_USER_CANCEL`
)<Partial<AuthState>, AuthState, Error, void>();

export default { updateUserAction };
