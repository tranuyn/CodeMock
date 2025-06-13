import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./auth-state";
import persistReducer from "redux-persist/es/persistReducer";
import { LoginResponse } from "../types";

export interface RootState {
  auth: LoginResponse;
}

const authPersistConfig = {
  key: "auth",
  storage,
};

const selectedInterviewSlotPersistConfig = {
  key: "selectedInterviewSlot",
  storage,
};

// Bọc đúng slice bằng persistReducer
export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;
