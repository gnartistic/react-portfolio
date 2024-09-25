import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import AboutPic from '@/assets/images/007-QhfKTpKsu4o copy.png';

const AboutPage = ({activeTheme}: {activeTheme: any}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const element = aboutRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress based on how much of the element is visible
        const visiblePart = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const progress = Math.max(0, Math.min(1, visiblePart / rect.height));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex
      ref={aboutRef}
      minHeight="100vh"
      flexDirection={{ base: "column-reverse", xl: "row" }}
      bg={activeTheme.accent}
      justifyContent={{ base: "center", xl: "space-around" }}
      alignItems="center"
      gap={{base: 10, xl: 0}}
      p={{ base: 4, lg: 10 }}
      position="relative"
    >
      <Box width={{ base: "95%", xl: "40%" }}>
        {/* Left Section: About Text */}
        <Text
          fontSize={{ base: "16px", lg: "2.78em" }}
          lineHeight="1.2"
          color={activeTheme.background}
          transition="opacity 0.5s ease"
          className="about-text"
        >
          Hi, I'm Charles, a high-tech explorer with a passion for uncovering digital treasures. My expertise spans UI/UX, coding, animation, and graphic design, along with a knack for solving problems creatively. Based in San Antonio, I blend these skills to craft innovative, functional, and visually engaging digital experiences.
        </Text>
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        width={{ base: "280px", lg: "40%" }}
        height="auto"
        position="relative"
        overflow="hidden"
        bg={activeTheme.primary}
      >
        {/* Profile Image */}
        <Image src={AboutPic.src} objectFit="cover" borderRadius="full" width="100%" height="100%" />
      </Flex>
    </Flex>
  );
};

export default AboutPage;