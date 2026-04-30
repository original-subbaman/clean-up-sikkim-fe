"use client";

import "@/lib/amplify";
import { getCurrentUser, type AuthUser } from "@/lib/auth-helpers";
import { Hub } from "aws-amplify/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { signOut as amplifySignOut } from "aws-amplify/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<AuthUser | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  const signOut = useCallback(async () => {
    await amplifySignOut();
    setUser(null);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const currentUser = await getCurrentUser();

      if (!isMounted) return;

      setUser(currentUser);
      setIsLoading(false);
    }

    loadUser();

    const stopListening = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
        case "tokenRefresh":
          void refreshAuth();
          break;
        case "signedOut":
        case "tokenRefresh_failure":
          setUser(null);
          break;
      }
    });

    return () => {
      isMounted = false;
      stopListening();
    };
  }, [refreshAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      refreshAuth,
      signOut,
    }),
    [isLoading, refreshAuth, signOut, user],
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
