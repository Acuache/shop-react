import type { User } from "@/interfaces/user.interface";

// Para Loginnnn, Register, CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}
