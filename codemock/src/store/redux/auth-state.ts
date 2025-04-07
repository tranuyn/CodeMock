import { createReducer } from "typesafe-actions";
import { AuthActions } from "../actions";
import { AuthState, LoginResponse } from "../types";
import { error } from "console";

const initialState: LoginResponse = {
  error: "",
  loading: false,
  access_token: null,
  user: {
    id: "",
    username: "",
    email: "",
    phone: "",
    account_type: "",
    role: "",
    is_active: false,
  },
};

const authReducer = createReducer(initialState)
  .handleAction(
    AuthActions.loginAction.request,
    (state: LoginResponse, action: { payload: boolean }) => ({
      ...state,
      error: null,
      loading: true,
    })
  )
  .handleAction(
    AuthActions.loginAction.success,
    (state: LoginResponse, action: { payload: LoginResponse }) => ({
      ...state,
      access_token: action.payload.access_token,
      user: action.payload.user,
      loading: false,
      error: null,
    })
  )
  .handleAction(
    AuthActions.loginAction.failure,
    (state: LoginResponse, action: { payload: string }) => {
      return {
        ...state,
        error: action.payload, // Setting the error message in state
        loading: false,
      };
    }
  )
  .handleAction(
    AuthActions.setAuthInfo,
    (state: LoginResponse, action: { payload: LoginResponse }) => ({
      ...state,
      ...action.payload,
    })
  )
  .handleAction(AuthActions.clearAuthInfo, () => initialState)
  .handleAction(AuthActions.clearError, (state: LoginResponse) => ({
    ...state,
    error: null,
  }));

export default authReducer;
