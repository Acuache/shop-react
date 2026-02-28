import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

interface AuthState {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getter
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;

  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  user: null,
  token: null,
  authStatus: "checking",

  // Getter
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },

  // Actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("tokenTesloShop", data.token);
      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      localStorage.removeItem("tokenTesloShop");
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("tokenTesloShop");
    set({
      user: null,
      token: null,
      authStatus: "not-authenticated",
    });
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      console.log("Error en checkAuthStatus : ", error);
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
  register: async (fullName: string, email: string, password: string) => {
    try {
      const { user, token } = await registerAction({
        fullName,
        email,
        password,
      });
      localStorage.setItem("tokenTesloShop", token);
      set({
        user,
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      console.log("Error en registerAction : ", error);
      set({
        user: null,
        token: null,
        authStatus: "authenticated",
      });
      return false;
    }
  },
}));
