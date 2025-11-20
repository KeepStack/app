import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/user";

export interface UserContextType {
  user: User | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: UserPreferences) => void;
}

interface UserPreferences {
  theme: "light" | "dark";
  language: string;
}

interface UserProviderProps {
  children: ReactNode;
}

const defaultPreferences: UserPreferences = {
  theme: "light",
  language: "en",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedPreferences = localStorage.getItem("userPreferences"); //replace with token validation, then fetching user

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedPreferences) {
          setPreferences(JSON.parse(storedPreferences));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    //username: string, password: string
  ) => {
    /* setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error("Login failed");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    } */
  };

  const logout = () => {
    /* setUser(null);
    setPreferences(defaultPreferences);
    localStorage.removeItem("user");
    localStorage.removeItem("userPreferences"); */
  };

  const updatePreferences = (newPreferences: UserPreferences) => {
    const updates = { ...preferences, ...newPreferences };
    setPreferences(updates);
    localStorage.setItem("userPreferences", JSON.stringify(updates));

    /* const response = fetch("/api/user/preferences", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }); */
  };

  const value: UserContextType = {
    user,
    preferences,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updatePreferences,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext };