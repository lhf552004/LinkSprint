import { Box, Heading, Text, Flex, Divider } from "@chakra-ui/react";
import { Image, Link, VStack } from "@chakra-ui/react";

export default function About() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between" // Keeps content and footer apart
      minHeight="100vh" // Ensures the Flex container takes at least the full height of the viewport
    >
      <VStack spacing={4} align="stretch">
        {/* Main Content */}
        <Box>
          <Heading as="h1" textTransform="uppercase">
            Link Sprint
          </Heading>

          <Text fontSize="sm">
            Link Sprint, quickly transforms long URLs into short, manageable
            ones, ideal for sharing
          </Text>
        </Box>
        <Divider /> {/* Optional Divider */}
      </VStack>
    </Flex>
  );
}
