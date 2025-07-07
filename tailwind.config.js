/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enables dark mode with a 'class' strategy
  content: [
    "./*.html", // Includes HTML files in the root directory
    "./pages/**/*.{ts,tsx}", // Includes TypeScript and TSX files in 'pages' directory
    "./components/**/*.{ts,tsx}", // Includes TypeScript and TSX files in 'components' directory
    "./app/**/*.{ts,tsx}", // Includes TypeScript and TSX files in 'app' directory
    "./src/**/*.{ts,tsx}", // Includes TypeScript and TSX files in 'src' directory
    "./custom-componets/**/*.{ts,tsx}", // Includes TypeScript and TSX files in 'custom-componets' directory
    "./index/**/*.html", // Includes HTML files in 'index' directory
  ],
  prefix: "", // No prefix for Tailwind classes
  theme: {
    container: {
      center: true, // Centers the container
      padding: "2rem", // Adds padding to the container
      screens: {
        "2xl": "1400px", // Sets the breakpoint for '2xl' screen size
      },
    },
    extend: {
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 3px)" },
          "40%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, 3px)" },
          "80%": { transform: "translate(3px, -3px)" },
          "100%": { transform: "translate(0)" },
        },
        shift: {
          "0%": { transform: "skewX(0deg)" },
          "40%": { transform: "skewX(0deg)" },
          "41%": { transform: "skewX(10deg)" },
          "42%": { transform: "skewX(-10deg)" },
          "58%": { transform: "skewX(0deg)" },
          "59%": { transform: "skewX(40deg) skewY(10deg)" },
          "60%": { transform: "skewX(-40deg) skewY(-10deg)" },
          "61%": { transform: "skewX(0deg)" },
          "63%": { transform: "skewX(10deg) skewY(-5deg)" },
          "65%": { transform: "skewX(0deg)" },
          "69%": { transform: "skewX(0deg)" },
          "70%": { transform: "skewX(-50deg) skewY(-20deg)" },
          "71%": { transform: "skewX(10deg) skewY(-10deg)" },
          "73%": { transform: "skewX(0deg)" },
          "100%": { transform: "skewX(0deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        slideUp: "slideUp 0.1s ease-out",
        fadeIn: "fadeIn 0.1s ease-in-out",
        glitch: "glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
        shift: "shift 1s ease-in-out infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "custom-gradient": "", // Placeholder for custom gradients
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Includes the tailwindcss-animate plugin
};
