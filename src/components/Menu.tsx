import { VStack, HStack, Text, Box, Link, IconButton, keyframes, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/state/themeState";
import theme from "@/theme";
import { ArrowRightIcon } from "@chakra-ui/icons";

// Keyframes for sliding arrow and reappearing it from the left
const slideArrow = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  50% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(-20px);
  }
`;

// Keyframes for closing animation (sliding out)
const slideOut = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const Menu = ({ closeMenu }: { closeMenu: () => void }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      closeMenu();
    }, 500);  // Adjust this timing to match the animation duration
  };

  const [themeName] = useAtom(themeAtom);  // Get the current theme from Jotai
  const activeTheme = theme.colors[themeName] || theme.colors.light;  // Fallback to 'light' theme

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bg={activeTheme.accent}
      color="white"
      position="relative"
      animation={closing ? `${slideOut} 0.5s ease-in-out` : undefined}  // Only apply animation when closing
    >
      <Flex flexDirection="column" justifyContent="space-between" height="95%" p={"60px"}>
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close menu"
          onClick={handleClose}
          position="absolute"
          top={10}
          right={10}
          fontSize="5.5em"
          bg="transparent"
          color={activeTheme.background}
          _hover={{}}
          _active={{}}
          mt={4}
        />

        <VStack align="flex-start">
          {["home", "about", "projects", "contact"].map((menuItem, index) => (
            <HStack key={index} _hover={{ transform: "translateX(10px)", transition: "transform 0.3s ease" }}>
              <Link href={`/${menuItem}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Flex alignItems="flex-end">
                  <Text
                    fontSize="9.3em"
                    lineHeight=".8"
                    letterSpacing="-.03em"
                    fontWeight="bold"
                    fontFamily="'IBM Plex Mono', monospace"
                    color={activeTheme.background}
                    casing="uppercase"
                  >
                    {menuItem}
                  </Text>
                  <ArrowRightIcon
                    mb={1}
                    ml={8}
                    color={activeTheme.background}
                    fontSize="5em"
                    animation={`${slideArrow} 0.6s ease forwards`}  // Animate the arrow
                    _groupHover={{
                      animation: `${slideArrow} 0.6s ease forwards`,
                    }}
                  />
                </Flex>
              </Link>
            </HStack>
          ))}
        </VStack>

        <Box display="flex" justifyContent="space-between" width="100%">
          <Link href="https://www.linkedin.com" isExternal>
            <Text fontSize="xl" fontFamily="'IBM Plex Mono', monospace" color={activeTheme.background}>LINKEDIN</Text>
          </Link>
          <Link href="https://www.instagram.com" isExternal>
            <Text fontSize="xl" fontFamily="'IBM Plex Mono', monospace" color={activeTheme.background}>INSTAGRAM</Text>
          </Link>
          <Text fontSize="xl" align="right" fontFamily="'IBM Plex Mono', monospace" color={activeTheme.background}>
            ©2023
          </Text>
        </Box>

      </Flex>
    </Box>
  );
};

export default Menu;