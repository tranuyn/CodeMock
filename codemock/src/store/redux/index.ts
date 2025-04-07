import { combineReducers } from "redux";

import authReducer from "./auth-state";
import { LoginResponse } from "../types";

export interface RootState {
  auth: LoginResponse;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
