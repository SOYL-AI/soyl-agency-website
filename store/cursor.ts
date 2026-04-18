"use client"

import { create } from "zustand"
import type { CursorVariant } from "@/types"

interface CursorStore {
  position: { x: number; y: number }
  variant: CursorVariant
  label: string | null
  isVisible: boolean
  setPosition: (x: number, y: number) => void
  setVariant: (variant: CursorVariant) => void
  setLabel: (label: string | null) => void
  setVisible: (visible: boolean) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  position:  { x: 0, y: 0 },
  variant:   "default",
  label:     null,
  isVisible: false,
  setPosition: (x, y)  => set({ position: { x, y } }),
  setVariant:  (variant) => set({ variant }),
  setLabel:    (label)   => set({ label }),
  setVisible:  (isVisible) => set({ isVisible }),
}))
