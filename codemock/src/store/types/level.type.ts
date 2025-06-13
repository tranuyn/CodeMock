import { AuthState } from ".";

export interface Level {
  id: string;
  name: string;
  user_count: string;
  users: AuthState[];
}