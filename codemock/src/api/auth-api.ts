import { get, post, put } from "./rest-utils";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  position: [];
  skill: [];
  tech: [];
}

const login = async (params: LoginRequest): Promise<any> => {
  return await post("/auth/login", params);
};

const signup = async (params: SignupRequest): Promise<void> => {
  return await post("/auth/register", params);
};

export default {
  login,
  signup,
};
