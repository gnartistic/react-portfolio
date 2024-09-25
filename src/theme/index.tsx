import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",  // Set the initial color mode
  useSystemColorMode: false,  // Disable system color mode
};

// Define multiple color schemes (light, dark, colorful)
const customTheme = extendTheme({
  config,
  colors: {
    // Light theme colors
    light: {
      background: "#ffffff",
      primary: "#70798c",
      secondary: "#444444",
      accent: "#5F634F",  // Popular trending blue accent
    },

    // Dark theme colors
    dark: {
      background: "#121212",
      primary: "#E0E0E0",
      secondary: "#BBBBBB",
      accent: "#f7f7fc",  // Popular purple accent in dark mode
    },

    // Earth Tone theme
    earth: {
      background: "#fefae0",
      primary: "#606c38",
      secondary: "#3a5a40",
      accent: "#dda15e",
    },

    // Colorful Purple theme
    blueOrange: {
      background: "#f1faee",
      primary: "#219ebc",
      secondary: "#023047",
      accent: "#ffb703",  // Vibrant purple
    },

    // Colorful Red theme
    pastelRainbow: {
      background: "#faf0ca",
      primary: "#f4d35e",
      secondary: "#0d3b66",
      accent: "#f95738",  // Bright red
    },

    // Colorful Green theme
    green: {
      background: "#eff1ed",
      primary: "#bcbd8b",
      secondary: "#373d20",
      accent: "#717744",  // Fresh green
    },
  },


});

export default customTheme;
