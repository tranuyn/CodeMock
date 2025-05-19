import { get, post, put, patch } from "./rest-utils";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  phone: string;
  account_type: string;
  role: string;
  majors: string[];
  levels: string[];
  technologies: string[];
}

export interface VerifyCode {
  code_id: string;
  email: string;
}

const login = async (params: LoginRequest): Promise<any> => {
  return await post("/auth/login", params);
};

const signup = async (params: SignupRequest): Promise<void> => {
  return await post("/auth/register", params);
};

const activeAccount = async (params: VerifyCode): Promise<void> => {
  return await post("/auth/verify-code", params);
};

const refreshToken = async (): Promise<void> => {
  return await patch("/auth/refresh-token");
};

export default {
  login,
  signup,
  activeAccount,
  refreshToken,
};
