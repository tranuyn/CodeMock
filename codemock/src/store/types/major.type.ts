import { AuthState } from ".";

export interface Major {
  id: string;
  name: string;
  user_count: string;
  users: AuthState[];
}