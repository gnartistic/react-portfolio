// src/components/ProjectsPage.tsx
import { Box, Flex, Text, Link, VStack, HStack, Badge, Icon, useBreakpointValue } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const projects = [
  {
    client: "Shenhav",
    skills: ["UI Design", "BE Dev", "FE Dev"],
    link: "https://shenhav.vercel.app/",
  },
  {
    client: "Groove Queue",
    skills: ["BE Dev", "UI Design", "FE Dev"],
    link: "https://groove-queued.vercel.app/",
  },
  {
    client: "VirtuAI Chatbot",
    skills: ["BE Dev", "UI Design", "FE Dev"],
    link: "https://virtuai-chatbot.vercel.app/",
  },
  {
    client: "ATIMs",
    skills: ["FE Dev", "UI Design"],
    link: "https://mx.atimsaviation.com/#/login",
  },
  {
    client: "S61C",
    skills: ["UI Design", "IOS Dev", "FE Dev", "BE Dev"],
    link: "https://apps.apple.com/us/app/s61c/id1508988735",
  },
  {
    client: "Fetch",
    skills: ["UI Design", "Animation", "3D Design", "FE Dev", "BE Dev"],
    link: "https://fetch-alpha.vercel.app/",
  },
  {
    client: "Raptor Labs",
    skills: ["UI Design", "FE Dev"],
    link: "https://gnartistic.github.io/this/",
  },
];

const ProjectsPage = ({ activeTheme }: { activeTheme: any }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex flexDirection="column" alignItems="center" bg={activeTheme.background} color={activeTheme.primary} minHeight="100vh" width="100%" p={10} pt={{ base: "100px", lg: "200px" }}>
      <Text fontSize="3xl" fontWeight="bold" mb={10}>
        {isMobile ? "PROJECTS" : "PROJECTS & DISCIPLINES"}
      </Text>

      {isMobile ? (
        // Mobile Version
        <VStack spacing={6} width="90%">
          {projects.map((project, index) => (

            <Link href={project.link} cursor="crosshair" textDecoration="none" target="_blank" _hover={{ textDecoration: 'none', color: activeTheme.accent }}>
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
                  <Text fontSize="2xl" fontWeight="bold">
                    {project.client}
                  </Text>
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
            </Link>
          ))}
        </VStack>
      ) : (
        // Desktop Version
        <VStack align="stretch" spacing={6} width="90%">
          {projects.map((project, index) => (

            <Link href={project.link} cursor="crosshair" target="_blank" textDecoration="none" _hover={{ textDecoration: 'none', }}>
              <Flex
                key={index}
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${activeTheme.primary}`}
                py={3}
              >
                {/* Client name and project link */}
                <Text fontSize="2xl" _hover={{ color: `${activeTheme.accent}` }}>
                  {project.client}
                </Text>

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
            </Link>
          ))}
        </VStack>
      )}
    </Flex>
  );
};

export default ProjectsPage;
