"use client";

const VERSION = "v1";

function key(name: string) {
  return `bilyfit_${VERSION}_${name}`;
}

export function readJSON<T>(name: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key(name));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(name: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key(name), JSON.stringify(value));
  } catch {
    // ignore quota errors silently
  }
}

export function clearAll() {
  if (typeof window === "undefined") return;
  Object.keys(localStorage)
    .filter((k) => k.startsWith(`bilyfit_${VERSION}_`))
    .forEach((k) => localStorage.removeItem(k));
}
