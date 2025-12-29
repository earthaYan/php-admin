import { create } from "zustand";

interface UseBaseStore {
  collapsed: boolean;
  updateCollapsed: () => void;
}
export const useBaseStore = create<UseBaseStore>((set) => ({
  collapsed: false,
  updateCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
}));
