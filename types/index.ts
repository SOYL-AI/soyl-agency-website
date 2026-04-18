export type CursorVariant = "default" | "hover" | "link" | "drag" | "crosshair" | "cta" | "text"

export interface WorkProject {
  slug: string
  title: string
  category: string
  year: string
  tags: string[]
  gridRow: number
  gridSize: "full" | "60" | "40" | "55-right"
  imagePrompt: string
  imageSrc?: string
  aspectRatio: string
  stats?: Array<{ label: string; value: string }>
}

export interface ServiceItem {
  id: string
  name: string
  tagline: string
  description: string
  capabilities: string[]
  videoPrompt: string
  videoSrc?: string
  accent: "amber" | "teal"
  aspectRatio: "16:9" | "9:16"
}

export interface StatItem {
  value: number
  suffix: string
  label: string
  sub: string
}

export interface PhilosophyPanel {
  letter: string
  title: string
  body: string
  color: string
}

export interface NavItem {
  label: string
  href: string
}
