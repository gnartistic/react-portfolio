import { useState } from "react";
import { IconButton, keyframes, Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { themeAtom } from "@/state/themeState";
import theme from "@/theme";

const ThemeToggle = () => {
  const [themeName, setThemeName] = useAtom(themeAtom);
  const themes = ["light", "dark", "earth", "blueOrange", "pastelRainbow", "green"];

  const [isAnimating, setIsAnimating] = useState(false); 

  const toggleTheme = () => {
    setIsAnimating(true);

    // Wait for the animation to finish before changing the theme
    setTimeout(() => {
      const nextThemeIndex = (themes.indexOf(themeName) + 1) % themes.length;
      setThemeName(themes[nextThemeIndex]);
      setIsAnimating(false);
    }, 1000);  // This timeout should match the duration of your animation (2s here)
  };


  function hexToRgba(hex: string, opacity: number): string {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }


  const activeTheme = theme.colors[themeName] || theme.colors.light;
  const popEffect = keyframes`
  0% { 
    transform: scale(1); 
    box-shadow: 0 0 0 0 ${hexToRgba(theme.colors[themeName].primary, 0.5)};  
  }
  80% { 
    transform: scale(1.3);  /* Slower, larger peak growth */
    box-shadow: 0 0 0 8px ${hexToRgba(theme.colors[themeName].primary, 0.5)};
    ease-out;
  }
    90% {
    transform: scale(1.3);  /* Slower, larger peak growth */
    box-shadow: 0 0 0 10px ${hexToRgba(theme.colors[themeName].primary, 0.5)};
    ease-out;
  }
  100% { 
    transform: scale(1); 
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);  /* Quick snap-back */
    ease-in;
  }
`;


  return (
    <Box borderRadius="full">
      <IconButton
        aria-label="Toggle theme"
        borderRadius="50%"
        onClick={toggleTheme}
        bg="transparent"
        color={activeTheme.primary}
        border="10px solid"
        borderColor={activeTheme.primary}
        _hover={{}}
        _active={{}}
        _focus={{ boxShadow: "none" }}
        width={{ base: "44px", lg: "6.12em" }}
        height={{ base: "44px", lg: "6.12em" }}
        animation={isAnimating ? `${popEffect} 1s ease` : "none"}
      />
    </Box>

  );
};

export default ThemeToggle;