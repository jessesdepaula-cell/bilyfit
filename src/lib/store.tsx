"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CHECKINS, STUDENTS, type Checkin, type Student } from "./mock-data";
import { readJSON, writeJSON } from "./storage";

interface GymDataState {
  students: Student[];
  checkins: Checkin[];
  hydrated: boolean;
  addStudent: (input: Omit<Student, "id" | "totalCheckins" | "lastCheckin" | "joinedAt"> & Partial<Pick<Student, "joinedAt">>) => Student;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  addCheckin: (input: Omit<Checkin, "id" | "timestamp" | "studentName"> & { timestamp?: string }) => Checkin | null;
  registerExit: (checkinId: string) => void;
  getStudent: (id: string) => Student | undefined;
  resetAll: () => void;
}

const GymDataContext = createContext<GymDataState | null>(null);

const STUDENTS_KEY = "students";
const CHECKINS_KEY = "checkins";

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function GymDataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [checkins, setCheckins] = useState<Checkin[]>(CHECKINS);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    const persistedStudents = readJSON<Student[] | null>(STUDENTS_KEY, null);
    const persistedCheckins = readJSON<Checkin[] | null>(CHECKINS_KEY, null);
    if (persistedStudents && persistedStudents.length) setStudents(persistedStudents);
    if (persistedCheckins) setCheckins(persistedCheckins);
    setHydrated(true);
  }, []);

  // Persist on change (only after hydration to avoid wiping with mock)
  useEffect(() => {
    if (hydrated) writeJSON(STUDENTS_KEY, students);
  }, [students, hydrated]);

  useEffect(() => {
    if (hydrated) writeJSON(CHECKINS_KEY, checkins);
  }, [checkins, hydrated]);

  const addStudent: GymDataState["addStudent"] = useCallback((input) => {
    const newStudent: Student = {
      ...input,
      id: makeId("s"),
      totalCheckins: 0,
      lastCheckin: null,
      joinedAt: input.joinedAt ?? new Date().toISOString().slice(0, 10),
    } as Student;
    setStudents((prev) => [newStudent, ...prev]);
    return newStudent;
  }, []);

  const updateStudent = useCallback((id: string, patch: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const removeStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addCheckin: GymDataState["addCheckin"] = useCallback((input) => {
    const ts = input.timestamp ?? new Date().toISOString();
    let created: Checkin | null = null;
    setStudents((prev) => {
      const student = prev.find((s) => s.id === input.studentId);
      if (!student) return prev;
      created = {
        ...input,
        id: makeId("c"),
        timestamp: ts,
        studentName: student.name,
      } as Checkin;
      return prev.map((s) =>
        s.id === input.studentId
          ? { ...s, lastCheckin: ts, totalCheckins: s.totalCheckins + 1 }
          : s
      );
    });
    if (created) setCheckins((prev) => [created as Checkin, ...prev]);
    return created;
  }, []);

  const registerExit = useCallback((checkinId: string) => {
    setCheckins((prev) =>
      prev.map((c) => (c.id === checkinId ? { ...c, exitAt: new Date().toISOString() } : c))
    );
  }, []);

  const getStudent = useCallback((id: string) => students.find((s) => s.id === id), [students]);

  const resetAll = useCallback(() => {
    setStudents(STUDENTS);
    setCheckins(CHECKINS);
    writeJSON(STUDENTS_KEY, STUDENTS);
    writeJSON(CHECKINS_KEY, CHECKINS);
  }, []);

  const value = useMemo<GymDataState>(
    () => ({ students, checkins, hydrated, addStudent, updateStudent, removeStudent, addCheckin, registerExit, getStudent, resetAll }),
    [students, checkins, hydrated, addStudent, updateStudent, removeStudent, addCheckin, registerExit, getStudent, resetAll]
  );

  return <GymDataContext.Provider value={value}>{children}</GymDataContext.Provider>;
}

export function useGymData() {
  const ctx = useContext(GymDataContext);
  if (!ctx) throw new Error("useGymData must be used inside <GymDataProvider>");
  return ctx;
}

// Resolve the "current student" for the /portal experience.
// Matches by email first, then by name. Falls back to the first student so the demo always renders.
export function useCurrentStudent(identityEmailOrName?: string): Student | null {
  const { students } = useGymData();
  if (!identityEmailOrName) return students[0] ?? null;
  const term = identityEmailOrName.toLowerCase();
  return (
    students.find((s) => s.email.toLowerCase() === term) ??
    students.find((s) => s.name.toLowerCase() === term) ??
    students[0] ??
    null
  );
}
