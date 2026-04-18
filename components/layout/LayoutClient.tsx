"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import PageTransition from "./PageTransition"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  )
}
