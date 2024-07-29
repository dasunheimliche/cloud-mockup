import { create } from "zustand";

interface StoreState {
  update: number;
  increment: () => void;
  isMobileSidebarVisible: boolean;
  toggleMobileSidebar: () => void;
}

const useStore = create<StoreState>((set) => ({
  update: 1,
  increment: () => set((state) => ({ update: state.update + 1 })),
  isMobileSidebarVisible: false,
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileSidebarVisible: !state.isMobileSidebarVisible })),
}));

export default useStore;
