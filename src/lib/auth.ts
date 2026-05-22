"use client";

import { USERS, type User } from "./mock-data";

const STORAGE_KEY = "bilyfit_session";

export function login(email: string, password: string): User | null {
  const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return null;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId: user.id }));
  }
  return user;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const { userId } = JSON.parse(raw);
    return USERS.find((u) => u.id === userId) ?? null;
  } catch {
    return null;
  }
}

export function dashboardPath(user: User) {
  if (user.role === "ceo") return "/admin";
  if (user.role === "student") return "/portal";
  return "/gym";
}
