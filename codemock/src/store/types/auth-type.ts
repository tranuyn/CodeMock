export interface AuthState {
  id: string;
  username: string;
  email: string;
  phone: string;
  account_type: string;
  role: string;
  is_active: boolean;
  profession: string;
  educationLevel: string;
  technologies: Array<string>;
}

export interface LoginResponse {
  access_token: string | null;
  user: AuthState;
  error: string;
  loading: boolean;
}
