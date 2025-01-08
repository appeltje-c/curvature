import { create } from "zustand"

type StoreState = {
    count: number
}

export const useStore = create<StoreState>((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 }))
}))
