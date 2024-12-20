/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Use Poppins for sans-serif
        mono: ['Anonymous Pro', 'monospace'], // Use Anonymous Pro for monospaced text
      },
      backgroundImage: {
        'custom-image': "url('https://www.pwc.com/mt/en/services/cyber-security/cyber-attack-.gif')",
      },

    },
  },
  plugins: [],
}

