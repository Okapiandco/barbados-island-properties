import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',
        'primary-light': '#51ADF6',
        'panel-grey': '#E6E6E6',
        cream: '#F5F3F0',
        'dark-slate': '#2C3E50',
      },
      fontFamily: {
        heading: ['OptimalTStd Medium', 'Georgia', 'serif'],
        body: ['Avenir', 'Trebuchet MS', 'sans-serif'],
      },
      backgroundImage: {
        'shell-watermark': 'url("/shell-watermark.svg")',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
export default config
