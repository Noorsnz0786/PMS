// src/utils/auth.ts

export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null; // Return null on the server side
  }
  return localStorage.getItem("token") || null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false; // Return false on the server side
  }
  const token = localStorage.getItem("token");
  return !!token; // Return true if token exists, false otherwise
};

export const clearToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
