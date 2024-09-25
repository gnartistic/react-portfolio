// src/components/HomePage.tsx
import { Flex, Grid, keyframes, Text, Button, Box, useBreakpointValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import AboutPage from '@/components/About';
import { themeAtom } from "@/state/themeState";
import theme from "@/theme";
import TypewriterText from "./TypeWritterText";

const HomePage = () => {
  const [themeName] = useAtom(themeAtom);  // Get the current theme from Jotai
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // Get the active theme's colors from the custom theme
  const activeTheme = theme.colors[themeName] || theme.colors.light;  // Fallback to 'light' theme

  return (
    <Flex
      flexDirection="column"
      width="100vw"
      minHeight="100vh"
      overflow="hidden"
      pt={{ base: "90px", lg: "200px" }}
      bg={activeTheme.background}
    >
      {/* Main Content */}
      <Flex width={{ base: "100%", lg: "90%" }} alignItems="flex-end" justifyContent="flex-end">
        <Flex justifyContent="space-between" width={{ base: "95%", lg: "70%" }} flexDirection={{ base: "column", lg: "row" }} gap={{ base: 4, lg: 0 }}>
          <Box width="200px" flexWrap="nowrap" display="flex" flexDirection="column" gap={{ base: 1, lg: 2 }}>
            <Text fontSize={{ base: "10px", lg: "14px" }}>
              2k20 - 2k24
            </Text>
            <Text fontSize={{ base: "14px", lg: "20px" }} casing="uppercase">
              Available
              <br />
              for exciting
              <br />
              collaborations
              <br />
              and projects
            </Text>
          </Box>

          <Box width="200px" flexWrap="nowrap" display="flex" flexDirection="column" gap={2}>
            <Text fontSize={{ base: "12px", lg: "14px" }}>
              485 &gt; 0394.0
            </Text>
            <Text fontSize={{ base: "12px", lg: "14px" }} casing="uppercase">
              Solving digital
              <br />
              problems since 2k20
            </Text>
          </Box>
        </Flex>
      </Flex>

      <Flex width={{ base: "95%", lg: "90%" }} alignItems="flex-end" justifyContent="flex-end">
        <Flex justifyContent={{ base: "center", lg: "space-between" }} width={{ base: "95%", lg: "70%" }} flexDirection={{ base: "column-reverse", lg: "row" }} alignItems={{ base: "flex-end", lg: "flex-start" }}>
          <Box width={{ base: "100%", lg: "auto" }} height={{ base: "220px", lg: "420px" }} alignItems={{ base: "flex-end", lg: "flex-start" }} justifyContent="flex-end" flexWrap="nowrap" display="flex" flexDirection="column" gap={2}>
            <Text fontSize={{ base: "12px", lg: "16px" }} casing="uppercase">
              I'll make sure your website/shop
              <br />
              is keeping your customers
              <br />
              engaged with your business.
              <br />
              Frontend, backend and hosting.
              <br />
              I'll take care of your digital
              <br />
              representation and problems
              <br />
              through code.
            </Text>
          </Box>
          <Flex alignItems="flex-start" justifyContent="flex-end" width={{ base: "200px", lg: "250px" }} height={{ base: "80px", lg: "420px" }}>
            <TypewriterText baseText={`>Charles Houston Fullstack Developer ©2024`} />
          </Flex>
        </Flex>
      </Flex>

      <Flex justifyContent={{ base: "center", lg: "space-between" }} mt="auto" width="100%" alignItems="center" p={5}>
          <Text fontSize={{ base: "10px", lg: "16px" }} casing="uppercase">
            design • Animation • code
          </Text>
          {!isMobile && (
            <Text fontSize={{ base: "10px", lg: "16px" }}>
              DO I HAVE TO TELL YOU TO SCROLL?
            </Text>
          )}
        </Flex>
    </Flex>
  );
};

export default HomePage;