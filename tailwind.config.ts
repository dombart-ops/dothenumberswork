import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF7F1",
          50: "#FDFCF8",
          100: "#FAF7F1",
          200: "#F1EBDD",
          300: "#E5DCC6",
        },
        ink: {
          DEFAULT: "#0E1420",
          50: "#F5F6F8",
          100: "#E6E8ED",
          200: "#C9CED9",
          300: "#9AA2B3",
          400: "#5E6677",
          500: "#3B4252",
          600: "#222837",
          700: "#161B27",
          800: "#0E1420",
          900: "#070A12",
        },
        navy: {
          DEFAULT: "#0A1F3D",
          50: "#EAEEF5",
          100: "#C8D3E5",
          200: "#8FA1C2",
          300: "#5772A3",
          400: "#2A4774",
          500: "#0A1F3D",
          600: "#08172E",
          700: "#06111F",
          800: "#040A14",
        },
        gold: {
          DEFAULT: "#B08D57",
          50: "#FBF6EE",
          100: "#F2E6D0",
          200: "#E2CBA0",
          300: "#CFAD75",
          400: "#B08D57",
          500: "#8E6F40",
          600: "#6B5430",
        },
        sage: {
          DEFAULT: "#5A7A6F",
          50: "#EEF2F0",
          100: "#D2DDD8",
          200: "#A4B9B0",
          300: "#7A968B",
          400: "#5A7A6F",
          500: "#445C53",
        },
        rust: {
          DEFAULT: "#8C3A28",
          50: "#F4E4DF",
          100: "#E5BFB4",
          200: "#C77E68",
          300: "#A85540",
          400: "#8C3A28",
        },
        line: "#E5DCC6",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6.5vw, 5.25rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.022em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
        eyebrow: ["0.78rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        prose: "68ch",
        editorial: "76rem",
      },
      letterSpacing: {
        "ultra-wide": "0.22em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(14,20,32,0.04), 0 8px 24px -12px rgba(14,20,32,0.10)",
        inset: "inset 0 -1px 0 rgba(14,20,32,0.06)",
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "1px",
        md: "3px",
        lg: "4px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
