import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/Auth.response";

interface Options {
  fullName: string;
  email: string;
  password: string;
}

export const registerAction = async (
  options: Options,
): Promise<AuthResponse> => {
  const { fullName, email, password } = options;
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
      fullName,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
