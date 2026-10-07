import type { Config } from "tailwindcss";

/**
 * SKILLORA design tokens.
 * Colors are CSS variables (space-separated RGB) declared in src/styles/globals.css,
 * so the whole palette can be re-themed from one place and still support
 * Tailwind opacity modifiers such as `bg-skillora-primary/20`.
 */
const token = (name: string) => `rgb(var(--sk-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skillora: {
          ink: token("ink"),
          "ink-light": token("ink-light"),
          "ink-card": token("ink-card"),
          border: token("border"),
          primary: token("primary"),
          "primary-dim": token("primary-dim"),
          accent: token("accent"),
          muted: token("muted"),
          success: token("success"),
          warning: token("warning"),
          danger: token("danger"),
        },
        // Neutral, slightly warm graphite scale (replaces Tailwind's blue-tinted slate)
        slate: {
          50: "#F6F5F4", 100: "#ECEAE8", 200: "#D8D5D2", 300: "#BCB8B4",
          400: "#9A958F", 500: "#767169", 600: "#585550", 700: "#403E3B",
          800: "#2C2B29", 900: "#1D1C1B", 950: "#121211",
        },
      },
      fontFamily: {
        heading: ["Syne", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, rgb(var(--sk-primary)), rgb(var(--sk-accent)))",
        "radial-glow":
          "radial-gradient(ellipse at top, rgb(var(--sk-primary) / 0.14), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 24px rgb(var(--sk-primary) / 0.18)",
        "glow-lg": "0 0 48px rgb(var(--sk-primary) / 0.25)",
        card: "0 4px 24px rgb(0 0 0 / 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
        },
      },
      animation: {
        rise: "rise 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        sheen: "sheen 2.8s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
