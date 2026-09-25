import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // shadcn-compatible semantic aliases reuse the existing brand palette.
        background: "#ffffff",
        foreground: "#172623",
        card: { DEFAULT: "#ffffff", foreground: "#172623" },
        border: "rgba(16, 34, 56, 0.12)",
        "muted-foreground": "#59665e",
        // Midnight blue with a subtle desert-teal undertone.
        navy: {
          950: "#102238",
          900: "#173047",
          800: "#224158",
          700: "#31576d",
          600: "#477187",
          500: "#6090a0",
        },
        // Restrained champagne accent — warmer and less saturated than yellow gold.
        gold: {
          50: "#fcf8ef",
          100: "#f7eedc",
          200: "#ead6ac",
          300: "#dec084",
          400: "#c9a56a",
          500: "#ae864c",
          600: "#8c6637",
        },
        // Sage is reserved for reassuring, local-detail cues: maps and successful actions.
        sage: {
          50: "#f2f6ee",
          100: "#e2ebda",
          200: "#c4d5b7",
          300: "#9fba8d",
          400: "#789c67",
          500: "#597c4f",
          600: "#43643f",
        },
        // Legacy surface names stay compatible; all light surfaces are white.
        cream: "#ffffff",
        paper: "#ffffff",
        ink: "#172623",
        muted: "#59665e",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.5rem",
      },
      boxShadow: {
        soft: "0 18px 50px -20px rgba(16, 34, 56, 0.25)",
        gold: "0 14px 40px -14px rgba(201, 165, 106, 0.45)",
        inset1: "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      letterSpacing: {
        wider2: "0.22em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
