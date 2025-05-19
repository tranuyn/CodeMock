import { createReducer } from "typesafe-actions";
import { AuthActions, UserActions } from "../actions";
import { AuthState, LoginResponse } from "../types";
import { error } from "console";
import authAction from "../actions/auth-action";

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
    majors: [],
    levels: [],
    technologies: [],
    experiences: [],
    skill: [],
    educationLevel: "",
    createdAt: new Date().toISOString(),
    warning_count: 0,
    warning_until: null,
    lastLogin: null,
    coinBalance: 0,
    avataUrl: "",
    address: "",
    resumeUrl: "",
    educationBackground: [],
    biography: "",
    average_point: 0,
    current_activity: [],
    specialization_skill: [],
    averageRating: 0,
    totalInterviews: 0,
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
  }))
  .handleAction(
    AuthActions.registerAction.request,
    (state: LoginResponse, action: { payload: boolean }) => ({
      ...state,
      error: null,
      loading: true,
    })
  )
  .handleAction(
    AuthActions.registerAction.success,
    (state: LoginResponse, action: { payload: AuthState }) => ({
      ...state,
      user: action.payload,
      loading: false,
      error: null,
    })
  )
  .handleAction(
    AuthActions.registerAction.failure,
    (state: LoginResponse, action: { payload: string }) => {
      return {
        ...state,
        error: action.payload, // Setting the error message in state
        loading: false,
      };
    }
  )
  .handleAction(
    AuthActions.activeAccountAction.request,
    (state: LoginResponse, action: { payload: boolean }) => ({
      ...state,
      error: null,
      loading: true,
    })
  )
  .handleAction(
    AuthActions.activeAccountAction.success,
    (state: LoginResponse, action: { payload: boolean }) => ({
      ...state,
      user: {
        ...state.user,
        is_active: true,
      },
      loading: false,
      error: null,
    })
  )
  .handleAction(
    AuthActions.activeAccountAction.failure,
    (state: LoginResponse, action: { payload: string }) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
  )
  .handleAction(
    UserActions.updateUserAction.request,
    (state: LoginResponse, action: { payload: boolean }) => ({
      ...state,
      error: null,
      loading: true,
    })
  )
  .handleAction(
    UserActions.updateUserAction.success,
    (state: LoginResponse, action: { payload: AuthState }) => ({
      ...state,
      user: action.payload,
      loading: false,
      error: null,
    })
  )
  .handleAction(
    UserActions.updateUserAction.failure,
    (state: LoginResponse, action: { payload: string }) => {
      return {
        ...state,
        error: action.payload, // Setting the error message in state
        loading: false,
      };
    }
  )
  .handleAction(AuthActions.refreshToken.request, (state: LoginResponse) => ({
    ...state, // giữ nguyên access_token, user, v.v.
    loading: true, // chỉ cập nhật loading
    error: "", // chỉ cập nhật error
  }))
  .handleAction(AuthActions.refreshToken.failure, (state: LoginResponse) => ({
    ...state,
    loading: false,
  }))
  // khi request thành công
  .handleAction(
    AuthActions.refreshToken.success,
    (state: LoginResponse, action: { payload: string }) => ({
      ...state,
      loading: false,
      error: "",
      access_token: action.payload,
    })
  );
export default authReducer;
