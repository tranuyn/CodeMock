import { createAction, createAsyncAction } from "typesafe-actions";
import { AuthState, LoginResponse } from "../types/auth-type";
import { SignupRequest } from "@/api/auth-api";

const PREFIX = "AUTH_ACTION/";

const loginAction = createAsyncAction(
  `${PREFIX}LOGIN_REQUEST`,
  `${PREFIX}LOGIN_SUCCESS`,
  `${PREFIX}LOGIN_FAILURE`,
  `${PREFIX}LOGIN_CANCEL`
)<
  {
    email: string;
    password: string;
    callback?: () => void;
  },
  LoginResponse,
  Error,
  void
>();

const signupAction = createAsyncAction(
  `${PREFIX}SIGNUP_REQUEST`,
  `${PREFIX}SIGNUP_SUCCESS`,
  `${PREFIX}SIGNUP_FAILURE`,
  `${PREFIX}SIGNUP_CANCEL`
)<
  {
    email: string;
    password: string;
    username: string;
    position: [];
    skill: [];
    tech: [];
    callback: () => void;
  },
  AuthState,
  Error,
  void
>();

const activeAccountAction = createAsyncAction(
  `${PREFIX}ACTIVE_ACCOUNT_REQUEST`,
  `${PREFIX}ACTIVE_ACCOUNT_SUCCESS`,
  `${PREFIX}ACTIVE_ACCOUNT_FAILURE`
)<
  {
    code_id: string;
    email: string;
    callback: () => void;
  },
  void,
  Error
>();

const setAuthInfo = createAction(`${PREFIX}SET_AUTH_INFO`)<
  Partial<AuthState>
>();

const clearAuthInfo = createAction(`${PREFIX}CLEAR_AUTH_INFO`)<void>();

const clearError = createAction(`${PREFIX}CLEAR_ERROR`)<void>();

export default {
  loginAction,
  signupAction,
  activeAccountAction,
  setAuthInfo,
  clearAuthInfo,
  clearError,
};
