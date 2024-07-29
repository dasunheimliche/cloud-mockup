import { create } from "zustand";

interface StoreState {
  websocket: string[];
  addWebsocket: (id: string) => void;
  removeWebsocket: (id: string) => void;
  clearWebsockets: () => void;
}

const useWebsocketStore = create<StoreState>((set) => ({
  websocket: [],
  addWebsocket: (id: string) =>
    set((state) => ({
      websocket: [...state.websocket, id],
    })),
  removeWebsocket: (id: string) =>
    set((state) => ({
      websocket: state.websocket.filter((wsId) => wsId !== id),
    })),
  clearWebsockets: () => set({ websocket: [] }),
}));

export default useWebsocketStore;
