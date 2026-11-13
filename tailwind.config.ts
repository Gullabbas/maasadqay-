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
        brand: {
          50: "#FAF3F0",
          100: "#F3E4DD",
          200: "#E7C9BC",
          300: "#DBAD9A",
          400: "#C9886F",
          500: "#B36648", // Core Logo Terracotta
          600: "#9E5336",
          700: "#844128",
          800: "#6B331F",
          900: "#462012",
        },
        sage: {
          50: "#F2F5F3",
          100: "#E1E8E3",
          200: "#C3D2C7",
          500: "#698070",
          700: "#49594E",
          800: "#38463D",
        },
        ochre: {
          100: "#FBF3E7",
          300: "#E6B87D",
          500: "#D4A373",
          700: "#A87645",
        },
        ink: {
          primary: "#261D1A",
          secondary: "#6B5E57",
          muted: "#9E8F87",
          inverted: "#FFFFFF",
        },
        surface: {
          pure: "#FFFFFF",
          warm: "#FDFBF9",
          cream: "#F7EDE5",
          muted: "#F4EFEB",
          subtle: "#EFE8E2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        urdu: ["var(--font-urdu)", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(179, 102, 72, 0.08)",
        hover: "0 12px 32px -4px rgba(179, 102, 72, 0.16)",
        modal: "0 24px 64px -12px rgba(38, 29, 26, 0.22)",
        glow: "0 0 25px rgba(179, 102, 72, 0.25)",
      },
      borderRadius: {
        card: "18px",
        pill: "9999px",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        pulseGentle: "pulseGentle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGentle: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.04)", opacity: "0.9" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
