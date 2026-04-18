"use client"

import { create } from "zustand"

interface LoadingStore {
  isLoading: boolean
  progress:  number
  setProgress: (p: number) => void
  done:        () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  progress:  0,
  setProgress: (progress) => set({ progress }),
  done:        () => set({ isLoading: false, progress: 100 }),
}))
