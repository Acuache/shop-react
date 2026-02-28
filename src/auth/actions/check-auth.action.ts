import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/Auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("tokenTesloShop");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
    localStorage.setItem("tokenTesloShop", data.token);
    return data;
  } catch (error) {
    localStorage.removeItem("tokenTesloShop");
    throw new Error("Token expired or not valid");
  }
};
