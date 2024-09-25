// src/pages/index.tsx
import { ParallaxProvider } from 'react-scroll-parallax';
import { Box, Button, keyframes, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAtom } from "jotai";
import { themeAtom } from "@/state/themeState";
import Header from '../components/Header';
import HomePage from '@/components/Homepage';
import AboutPage from '@/components/About';
import ProjectsPage from '@/components/Projects';
import ContactPage from '@/components/Contact';
import Footer from '../components/Footer';
import Menu from '@/components/Menu';
import ThemeToggle from '@/components/ThemeToggle';
import theme from "@/theme";


// Keyframes for animations
const dropPage = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

const dropMenu = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

export default function Home() {
  // Menu state and logic
  const [showMenu, setShowMenu] = useState(false);  // State to trigger the menu
  const [menuVisible, setMenuVisible] = useState(false);  // State to control menu rendering after animation

  // Toggle the menu dropdown
  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  const closeMenu = () => {
    setShowMenu(false); // Close the menu
  };

  // Disable body scroll when the menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden"; // Disable scroll
      document.documentElement.style.overflow = "hidden"; // Ensure the entire page is covered
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll when menu is closed
      document.documentElement.style.overflow = "auto"; // Ensure the entire page can scroll
    }
  }, [showMenu]);

  useEffect(() => {
    if (showMenu) {
      // Delay showing the menu until the blank page animation completes (0.5s)
      const timer = setTimeout(() => {
        setMenuVisible(true); // Show the menu after 0.5s
      }, 500);
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setMenuVisible(false); // Hide the menu when the menu is toggled off
    }
  }, [showMenu]);

  // Theme management using Jotai
  const [themeName] = useAtom(themeAtom);  // Get the current theme from Jotai
  const activeTheme = theme.colors[themeName] || theme.colors.light;  // Fallback to 'light' theme

  return (
    <ParallaxProvider>
      <Box as="main" bg={activeTheme.background} color={activeTheme.primary} transition="background-color 1s linear" height="100vh" width="100vw" position="relative">

        {/* Conditionally render the Menu button and Theme Toggle only when the menu is not open */}
        {!showMenu && (
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height={{ base: "85px", lg: "200px" }}
            zIndex={999}  // High z-index to ensure it's always on top
            px={{ base: 6, lg: 14 }}
          >
            {/* Button to trigger menu */}
            <Button
              onClick={toggleMenu}
              px={{ base: 8, lg: 16 }}
              py={{ base: 4, lg: 14 }}
              borderRadius="50vw"
              bg={activeTheme.primary}
              color={activeTheme.background}
              _hover={{ bg: activeTheme.secondary }}
              fontSize={{ base: "34px", lg: "6.63em" }}
              letterSpacing="-.05rem"
              fontWeight="500"
              lineHeight="1"
            >
              Menu
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </Flex>
        )}

        {/* Blank page drop animation */}
        {showMenu && (
          <Box
            position="fixed"  // Ensure the menu is fixed and covers the screen
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            bg={activeTheme.background}
            zIndex={1000}  // High z-index to ensure it covers all content
            animation={`${dropPage} 0.5s ease-in-out`}
          />
        )}

        {/* Menu drop animation after blank page */}
        {menuVisible && (
          <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            zIndex={1001}  // Ensure the menu stays on top
            animation={`${dropMenu} 0.5s ease-in-out`}
          >
            <Menu closeMenu={closeMenu} />
          </Box>
        )}

        {/* Main content */}
        <HomePage />
        <Flex minHeight="100vh" width="100vw">
          <AboutPage activeTheme={activeTheme} />
        </Flex>
        <Flex minHeight="100vh" width="100vw">
          <ProjectsPage activeTheme={activeTheme} />
        </Flex>
        <Flex minHeight="100vh" width="100vw">
          <ContactPage activeTheme={activeTheme} />
        </Flex>
      </Box>
    </ParallaxProvider>
  );
}