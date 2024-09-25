// src/components/Header.tsx
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex justify="space-between" align="center" px={10} py={4}>
      {/* Left-aligned link */}
      <Box>
        <Text>
          Drop me a line
        </Text>
        <Text>
          <Link href="mailto:davideperozzi@studio" textDecoration="none">
            charliehouston@gmail.com
          </Link>
        </Text>
      </Box>

      {/* Right-aligned link */}
      <Box>
        <Flex>
          <Text mr={6}>
            <Link href="#" textDecoration="none">
              MY BLOG
            </Link>
          </Text>
          <Text>
            <Link href="#" textDecoration="none">
              CONTACT
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;