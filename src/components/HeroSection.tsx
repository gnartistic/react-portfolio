// src/components/HeroSection.tsx
import { Box, VStack, Heading, Text, Grid, GridItem, Image } from '@chakra-ui/react';
import { Parallax } from 'react-scroll-parallax';
import layer1 from '../../public/assets/images/layer1.png';
import layer2 from '../../public/assets/images/layer2.png';

const HeroSection = () => {
  return (
    <Box position="relative" height="100vh" overflow="hidden" bg="gray.50">
      {/* Background layer (slow movement) */}
      <Parallax translateY={[-20, 20]} shouldAlwaysCompleteAnimation>
        <Image
          src={layer1.src}
          objectFit="cover"
          alt="Background Layer 1"
        />
      </Parallax>

      {/* Midground layer (moderate movement) */}
      <Parallax translateY={[160, 20]} shouldAlwaysCompleteAnimation>
        <Image
          src={layer2.src}
          objectFit="cover"
          alt="Midground Layer 2"
        />

      </Parallax>

      {/* Foreground Content */}
      <VStack height="100%" justifyContent="center" spacing={8} position="relative" zIndex={1} textAlign="center">
        <Heading fontSize="6xl" fontWeight="bold">
          CHARLES HOUSTON
        </Heading>
        <Heading fontSize="4xl">FULLSTACK DEVELOPER ©2K24</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={6} width="100%">
          <GridItem>
            <Text fontSize="lg">Available for exciting collaborations and projects.</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="lg">Solving digital problems since 2K16.</Text>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default HeroSection;