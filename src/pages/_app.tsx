// src/pages/_app.tsx
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider, useAtom } from "jotai";
import { themeAtom } from "@/state/themeState";
import { useEffect, useState } from "react";
import '../styles/globals.scss';
import theme from "../theme";

const MyAppWithTheme = ({ Component, pageProps }: AppProps) => {
  const [themeName] = useAtom(themeAtom); // Get the current theme from Jotai
  const [customTheme, setCustomTheme] = useState(theme); // State to hold the current theme

  useEffect(() => {
    // Track the theme change and update the Chakra theme
    const selectedTheme = theme.colors[themeName] || theme.colors.light; // Fallback to light theme
    const updatedTheme = extendTheme({
      ...theme,
      colors: {
        ...theme.colors,
        ...selectedTheme, // Overwrite with the selected theme's colors
      },
    });
    setCustomTheme(updatedTheme); // Update the theme state
    console.log("theme updated:", updatedTheme);
  }, [themeName]); // Rerun the effect whenever the themeName changes

  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

// Wrap with Jotai's Provider to make the atom globally accessible
const MyApp = (props: AppProps) => (
  <Provider>
    <MyAppWithTheme {...props} />
  </Provider>
);

export default MyApp;