import { get, post, put } from "./rest-utils";

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
  profession: string;
  educationLevel: string;
  technologies: Array<string>;
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

export default {
  login,
  signup,
  activeAccount,
};
