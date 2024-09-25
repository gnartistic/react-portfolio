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
      primary: "#444444",
      secondary: "#121212",
      accent: "#74746D",
      accent2: "#444444", // Popular trending blue accent
    },

    // Dark theme colors
    dark: {
      background: "#121212",
      primary: "#f7f7fc",
      secondary: "#74746D",
      accent: "#444444",
      accent2: "#74746D", // Popular purple accent in dark mode
    },

    iphone: {
      background: "#ffffff",
      primary: "#70798c",
      secondary: "#444444",
      accent: "#5F634F",
      accent2: "#444444", // Popular trending blue accent
    },

    // Earth Tone theme
    earth: {
      background: "#FBFBFF",
      primary: "#147efb",
      secondary: "#0B4F6C",
      accent: "#757575",
      accent2: "#1CAE1B"
    },

    // Colorful Purple theme
    blueOrange: {
      background: "#D5DDBC",
      primary: "#A0AD85",
      secondary: "#8A9B68",
      accent: "#937B63",
      accent2: "#2A2C24"
    },

    // Colorful Red theme
    pastelRainbow: {
      background: "#595F72",
      primary: "#E6F14A",
      secondary: "#C3D350",
      accent: "#C3D350",
      accent2: "#84A07C"
    },

    // Colorful Green theme
    green: {
      background: "#e2cfea",
      primary: "#a06cd5",
      secondary: "#6247aa",
      accent: "#102b3f",
      accent2: "#5f758e"
    },
  },


});

export default customTheme;
