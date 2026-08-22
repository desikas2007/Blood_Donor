import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        dark: "#111111",
        muted: "#666666",
        border: "#E5E5E5",
        surface: "#F8F8F8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "page-title": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "section-title": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "card-title": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["15px", { lineHeight: "24px", fontWeight: "400" }],
        small: ["13px", { lineHeight: "20px", fontWeight: "400" }],
        tiny: ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)",
        sidebar: "1px 0 0 #E5E5E5",
      },
    },
  },
  plugins: [],
};

export default config;
