import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      // screens: {
      //   'sm': '640px', // Default breakpoint
      //   'md': '768px', // Medium devices (tablets,  768px and up)
      //   'custom': '900px', // Custom breakpoint for  3 columns
      //   'lg': '1400px', // Large devices (desktops,  1200px and up)
      //   'xl': '1280px', // Extra large devices
      //   '2xl': '1536px', //  2xl devices
      // },
      colors: {
        primary: "#022533",
        secondary: "#3A4E55",
        accent: "#25F299",
        "primary-50": "#182237",
        "secondary-50": "#b7bac1",
        "white-50": "#F5F5F5"
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
export default config;
