import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setIds: (ids: string[]) => void;
  setId: (id: string) => void;
  reset: () => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayerStore;
