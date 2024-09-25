// src/components/ProjectsPage.tsx
import { Box, Flex, Text, Link, VStack, HStack, Badge, Icon, useBreakpointValue } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const projects = [
  {
    client: "Shenhav",
    skills: ["UI Design", "BE Dev", "FE Dev"],
    link: "/shenhav",
  },
  {
    client: "ATIMs",
    skills: ["FE Dev", "UI Design"],
    link: "/atims",
  },
  {
    client: "S61C",
    skills: ["UI Design", "IOS Dev", "FE Dev", "BE Dev"],
    link: "/s61c",
  },
  {
    client: "Fetch",
    skills: ["UI Design", "Animation", "3D Design", "FE Dev", "BE Dev"],
    link: "/fetch",
  },
  {
    client: "Raptor Labs",
    skills: ["BE Dev", "UI Design", "FE Dev"],
    link: "/raptor-labs",
  },
];

const ProjectsPage = ({ activeTheme }: { activeTheme: any }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex flexDirection="column" alignItems="center" bg={activeTheme.background} color={activeTheme.primary} minHeight="100vh" width="100%" p={10} pt={{ base: "100px", lg: "200px" }}>
      <Text fontSize="3xl" fontWeight="bold" mb={10}>
        {isMobile ? "PROJECTS" : "CLIENT & DISCIPLINES"}
      </Text>

      {isMobile ? (
        // Mobile Version
        <VStack spacing={6} width="90%">
          {projects.map((project, index) => (
            <Box
              key={index}
              border={`1px solid ${activeTheme.primary}`}
              borderRadius="md"
              p={5}
              width="100%"
              _hover={{ borderColor: activeTheme.accent }}
              transition="border-color 0.3s ease"
            >
              {/* Client Name */}
              <Flex justifyContent="space-between" alignItems="center">
                <Link href={project.link} textDecoration="none" _hover={{ textDecoration: 'none', color: activeTheme.accent }}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {project.client}
                  </Text>
                </Link>
                <Icon as={ArrowForwardIcon} w={6} h={6} color={activeTheme.primary} />
              </Flex>

              {/* Skills */}
              <Flex mt={3} wrap="wrap" gap={3}>
                {project.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    fontSize="lg"
                    px={3}
                    py={1}
                    borderRadius="md"
                    bg="transparent"
                    border={`1px solid ${activeTheme.primary}`}
                  >
                    <Text color={activeTheme.primary}>{skill}</Text>
                  </Badge>
                ))}
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        // Desktop Version
        <VStack align="stretch" spacing={6} width="90%">
          {projects.map((project, index) => (
            <Flex
              key={index}
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${activeTheme.primary}`}
              py={3}
            >
              {/* Client name and project link */}
              <Link href={project.link} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Text fontSize="2xl" _hover={{ color: `${activeTheme.accent}` }}>
                  {project.client}
                </Text>
              </Link>

              {/* Skills/Disciplines used */}
              <HStack spacing={3}>
                {project.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    fontSize="lg"
                    px={3}
                    py={1}
                    borderRadius="md"
                    bg="transparent"
                    border={`1px solid ${activeTheme.primary}`}
                  >
                    <Text color={activeTheme.primary}>{skill}</Text>
                  </Badge>
                ))}
                {/* Arrow icon */}
                <Icon as={ArrowForwardIcon} w={8} h={8} />
              </HStack>
            </Flex>
          ))}
        </VStack>
      )}
    </Flex>
  );
};

export default ProjectsPage;
