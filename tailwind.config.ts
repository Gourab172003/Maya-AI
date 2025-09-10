import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        online: "hsl(var(--online))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        'electric-blue': 'hsl(195, 100%, 50%)',
      },
      backgroundImage: {
        'gradient-main': 'var(--gradient-main)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'soft': 'var(--shadow-soft)',
        'intense': 'var(--shadow-intense)',
      },
      transitionProperty: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'slab': ['Epunda Slab', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "typing": {
          "0%, 60%, 100%": { opacity: "0.4" },
          "30%": { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 10px hsl(325, 58%, 70%, 0.3)" },
          "50%": { boxShadow: "0 0 20px hsl(325, 58%, 70%, 0.6)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "float": {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "33%": { transform: "translateY(-10px) translateX(5px)" },
          "66%": { transform: "translateY(5px) translateX(-5px)" },
          "100%": { transform: "translateY(0px) translateX(0px)" },
        },
        "pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            boxShadow: "var(--shadow-glow)"
          },
          "50%": { 
            transform: "scale(1.05)",
            boxShadow: "var(--shadow-intense)"
          },
        },
        "neon-text": {
          "0%, 100%": { textShadow: "var(--text-glow)" },
          "50%": { textShadow: "0 0 20px hsl(195, 100%, 50%, 1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "typing": "typing 1.5s infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse": "pulse 2s ease-in-out infinite",
        "neon-text": "neon-text 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
