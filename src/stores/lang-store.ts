import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageType } from "@/lib/types";

interface StoreState {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

const useLangStore = create(
  persist<StoreState>(
    (set) => ({
      language: "uk",
      setLanguage: (lang: LanguageType) => set({ language: lang }),
    }),
    {
      name: "language-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useLangStore;
