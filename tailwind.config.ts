import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#FBFBFF",
          "secondary": "#071012",
          "info": "#FF5400",
          "success": "#C2E812",
          "error": "#721817",
          "accent": "#e7e7e7"
        },
        dark: {
          "primary": "#1E1B18",
          "secondary": "#FCF7F8",
          "info": "#DACC3E",
          "success": "#C2E812",
          "error": "#A31621",
          "accent": "#08090A"  
        }
      },
    ],
    base: false,
  }
}
export default config
