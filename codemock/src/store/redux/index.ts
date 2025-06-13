import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./auth-state";
import persistReducer from "redux-persist/es/persistReducer";
import { LoginResponse } from "../types";
import levelReducer from "./level-state";
import majorReducer from "./major-state";
import technologyReducer from "./technology-state";

export interface RootState {
  auth: LoginResponse;
}
const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  majors: majorReducer,
  levels: levelReducer,
  technology: technologyReducer
  //note: noteReducer
});

export default rootReducer;
