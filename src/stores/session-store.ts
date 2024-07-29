"use client";

import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import { User } from "@/lib/types";

interface AuthState {
  token: string | null;
  isConfigured: boolean;
  user: User | null;
  setToken: (token: string | null) => void;
  setIsConfigured: (isConfigured: boolean) => void;
  setUser: (user: User | null) => void;
}

const sessionStore = create(
  persist<AuthState>(
    (set) => ({
      token: "",
      isConfigured: false,
      user: null,
      setToken: (token: string | null) => set({ token }),
      setIsConfigured: (isConfigured: boolean) => set({ isConfigured }),
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "auth-storage", // Nombre único para tu almacenamiento
    } as PersistOptions<AuthState>
  )
);

export default sessionStore;
