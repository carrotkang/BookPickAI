/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

export type UserRole = "member" | "admin";

export type DemoUser = {
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: DemoUser | null;
  login: (role?: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  updateName: (name: string) => void;
};

const STORAGE_KEY = "bookpickai-demo-user";
const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): DemoUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(readStoredUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (role = "member", name, email) => {
        const nextUser: DemoUser = {
          name: name || (role === "admin" ? "BookPick 관리자" : "김북픽"),
          email: email || (role === "admin" ? "admin@bookpick.ai" : "reader@bookpick.ai"),
          role,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
      updateName: (name) => {
        if (!user) return;
        const nextUser = { ...user, name };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  return context;
}
