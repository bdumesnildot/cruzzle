/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
      },
      dropShadow: {
        top: "0px -8px 16px rgba(255, 255, 255, 0.90)",
      },
      width: {
        375: "37%",
      },
      colors: {
        primary: {
          50: "#A73FB9", // text color
          70: "#f9f7fa", // idea background hover
          100: "#D1B5E1", // Ring DoghnutAvatar
          800: "#FAF4FB", // Bg TopBar
          900: "#9C27B0", // default
        },
        secondary: {
          600: "#7C7C7C", // text subtext color
        },
        chip: {
          blue: "#2196F3",
          orange: "#ED6C02",
          green: "#AFE2B1",
        },
        status: {
          green: "#AFE2B1",
        },
        user: {
          warningRed: "#D32F2F",
        },
      },
    },
  },
  plugins: [],
};
