import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { login as loginRequest } from "@/api/auth.api";
import type { UserRole } from "@/types/user.types";

type AuthUser = {
  email: string;
  role: UserRole;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const TOKEN_STORAGE_KEY = "accessToken";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const base64 = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");

  return JSON.parse(window.atob(base64));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [loading, setLoading] = useState(false);

  const decodedUser = useMemo(() => {
    if (!token) {
      return null;
    }

    try {
      const payload = decodeJwtPayload(token);

      if (!payload?.email || !payload?.role) {
        return null;
      }

      return {
        email: payload.email,
        role: payload.role as UserRole,
      } as AuthUser;
    } catch {
      return null;
    }
  }, [token]);

  const isAuthenticated = Boolean(token);

  async function login(email: string, password: string) {
    setLoading(true);

    try {
      const response = await loginRequest({ email, password });
      const nextToken = response.access_token;

      if (!nextToken) {
        throw new Error("Backend did not return an access token.");
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
      setToken(nextToken);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
  }

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated,
      user: decodedUser,
      loading,
      login,
      logout,
    }),
    [decodedUser, isAuthenticated, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
