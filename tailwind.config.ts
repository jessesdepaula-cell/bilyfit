import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        background: "#070707",
        surface: "#0F0F10",
        elevated: "#161618",
        border: "#1F1F22",
        muted: "#2A2A2E",
        foreground: "#F5F5F7",
        subtle: "#A1A1AA",
        dim: "#71717A",
        brand: {
          DEFAULT: "#F5D90A",
          50: "#FFFCE5",
          100: "#FFF6B5",
          200: "#FFED80",
          300: "#FFE24D",
          400: "#FFD61F",
          500: "#F5D90A",
          600: "#D4B900",
          700: "#A38F00",
          800: "#736400",
          900: "#3D3500",
        },
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#38BDF8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,217,10,0.25), 0 0 24px rgba(245,217,10,0.35)",
        "glow-lg": "0 0 0 1px rgba(245,217,10,0.3), 0 0 64px rgba(245,217,10,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -8px rgba(0,0,0,0.6)",
        "card-hover": "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 24px 48px -16px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,217,10,0.2)",
        "3d": "0 30px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
      },
      backgroundImage: {
        "grid-dim": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-brand": "radial-gradient(circle at 50% 0%, rgba(245,217,10,0.15), transparent 60%)",
        "gradient-brand": "linear-gradient(135deg, #FFE24D 0%, #F5D90A 50%, #D4B900 100%)",
      },
      keyframes: {
        "fade-in-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "float": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        "pulse-glow": { "0%,100%": { boxShadow: "0 0 0 0 rgba(245,217,10,0.4)" }, "50%": { boxShadow: "0 0 0 16px rgba(245,217,10,0)" } },
        "shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
