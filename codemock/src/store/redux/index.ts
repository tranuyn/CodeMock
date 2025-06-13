import { combineReducers } from "redux";
import authReducer from "./auth-state";
import { LoginResponse } from "../types";
import levelReducer from "./level-state";
import majorReducer from "./major-state";
import technologyReducer from "./technology-state";

export interface RootState {
  auth: LoginResponse;
}

const rootReducer = combineReducers({
  auth: authReducer,
  majors: majorReducer,
  levels: levelReducer,
  technology: technologyReducer
  //note: noteReducer
});

export default rootReducer;
