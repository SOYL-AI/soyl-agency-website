import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        soyl: {
          bg: "#080808",
          black: "#030709",
          white: "#F8FCFD",
          amber: "#F5A623",
          "amber-dim": "#B37A1A",
          teal: "#AFD0CC",
          "teal-dim": "#7AABA6",
          // #8B8CA5 on #080808 = 5.86:1 contrast — WCAG AA compliant
          gray: "#8B8CA5",
          "gray-light": "#B4B5CC",
          "gray-dim": "#535467",
          "border": "rgba(255,255,255,0.07)",
          "card": "rgba(255,255,255,0.03)",
        },
      },
      fontFamily: {
        heading: ["var(--font-clash)", "Cabinet Grotesk", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "amber-glow": "radial-gradient(ellipse at center, rgba(245,166,35,0.15) 0%, transparent 70%)",
        "teal-glow": "radial-gradient(ellipse at center, rgba(175,208,204,0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        "amber-sm": "0 0 20px rgba(245,166,35,0.1), 0 0 40px rgba(245,166,35,0.05)",
        "amber-md": "0 0 40px rgba(245,166,35,0.15), 0 0 80px rgba(245,166,35,0.07)",
        "amber-lg": "0 0 60px rgba(245,166,35,0.2), 0 0 120px rgba(245,166,35,0.08)",
        "teal-sm": "0 0 20px rgba(175,208,204,0.1), 0 0 40px rgba(175,208,204,0.04)",
        "card": "0 1px 0 0 rgba(255,255,255,0.05), 0 -1px 0 0 rgba(255,255,255,0.02)",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "marquee-left": "marqueeLeft 35s linear infinite",
        "marquee-right": "marqueeRight 35s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
}

export default config
