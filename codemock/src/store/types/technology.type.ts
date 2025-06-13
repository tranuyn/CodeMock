import { AuthState } from "@/store/types";

export interface Technology {
  id: string;
  name: string;
  user_count: string;
  users: AuthState[];
}
