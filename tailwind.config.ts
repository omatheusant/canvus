import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#FBFBFF",
          "secondary": "#07101",
          "info": "#FF5400",
          "success": "#C2E812",
          "error": "#721817",
        },
      },
    ],
    base: false,
  }
}
export default config
