import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  apiFetch,
  markSessionExpired,
  setUnauthorizedHandler,
} from "../../api/fetch";
import { AuthContext } from "../../hooks/useAuth";
import type { User } from "../../types/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback((reason?: "expired" | "unauthorized") => {
    if (reason === "expired") {
      markSessionExpired();
    }
    setUser(null);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const response = await apiFetch("/api/auth/me");
      if (!response.ok) {
        clearSession();
        return;
      }
      const data = (await response.json()) as User;
      setUser(data);
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    setUnauthorizedHandler((reason) => {
      clearSession(reason);
    });
    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  const login = useCallback(async (username: string, password: string) => {
    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const data = (await response.json()) as User;
    setUser(data);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } finally {
      clearSession();
    }
  }, [clearSession]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
