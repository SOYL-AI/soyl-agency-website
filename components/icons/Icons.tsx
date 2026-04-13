// All SVG icons used across the site — clean, 24×24 viewBox, stroke-based

interface IconProps {
  className?: string
  size?: number
}

const defaults = (p: IconProps) => ({
  width:   p.size ?? 20,
  height:  p.size ?? 20,
  viewBox: "0 0 24 24",
  fill:    "none" as const,
  stroke:  "currentColor",
  strokeWidth: 1.5,
  strokeLinecap:  "round" as const,
  strokeLinejoin: "round" as const,
  className: p.className,
})

// ── Service Icons ────────────────────────────────────────────────────

export function IconWebsite(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M2 7h20" />
    </svg>
  )
}

export function IconAutomation(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

export function IconBranding(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function IconMarketing(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

export function IconCRM(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function IconOperations(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  )
}

export function IconSupport(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

export function IconAnalytics(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  )
}

export function IconContent(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

export function IconSEO(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  )
}

export function IconIntegrations(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="2" y="2" width="8" height="8" rx="1.5" />
      <rect x="14" y="2" width="8" height="8" rx="1.5" />
      <rect x="2" y="14" width="8" height="8" rx="1.5" />
      <rect x="14" y="14" width="8" height="8" rx="1.5" />
    </svg>
  )
}

export function IconAIAgents(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  )
}

// ── Process Step Icons ────────────────────────────────────────────────

export function IconBrief(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

export function IconBuild(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

export function IconDeploy(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

export function IconMonitor(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

export function IconExpand(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

// ── General UI Icons ──────────────────────────────────────────────────

export function IconArrow(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function IconChevronDown(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function IconMail(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function IconLinkedIn(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function IconTwitter(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  )
}

export function IconInstagram(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function IconPhone(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function IconMapPin(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function IconCalendar(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  )
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <line x1="3"  y1="6"  x2="21" y2="6" />
      <line x1="3"  y1="12" x2="21" y2="12" />
      <line x1="3"  y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function IconX(p: IconProps) {
  return (
    <svg {...defaults(p)}>
      <line x1="18" y1="6" x2="6"  y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  )
}
