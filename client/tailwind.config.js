/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  screens: {
    xl: { max: "1250px" },
    lg: { max: "1050px" },
    md: { max: "780px" },
    sm: { max: "520px" },
  },
  colors: {
    white: "#fff",
    black: "#000",
    blue: "#0050fd",
    bluesecond: "#2d6ffd",
    bluethird: "#3b82f6",
    lightBlue: "#10b4e6",
    green: "#01DF01",
    gray: "#f3f3f3",
    red: "#ff3232",
    F7F7F7: "#F7F7F7",
    facebookColor: "#4267b2",
    instagramColor: {
      yellow: "#fdf497",
      orange: "#fd5949",
      purple: "#d6249f",
      blue: "#285aeb",
    },
  },
  keyframes: {
    countdown: {
      "100%": {
        width: "0",
      },
    },
  },
};
export const plugins = [];
