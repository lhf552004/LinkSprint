import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Button,
  Stack,
  AspectRatio,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const resources = [
  // This array would contain objects with details about each resource
  // For example:
  {
    title: "Top 10 Recommended Bitly Features from Power Users Webinar Recap",
    type: "Webinar",
    image: "path_to_resource_image", // Replace with path to your images
  },
  // Add more resource objects here
];

const ResourcesComponent = () => {
  return (
    <Box padding={8}>
      <Flex direction={{ base: "column", md: "row" }} mb={10}>
        <AspectRatio ratio={16 / 9} width={{ base: "full", md: "50%" }}>
          <Image src="path_to_featured_video_image" alt="Featured video" />
        </AspectRatio>
        <Box pl={{ md: 8 }} mt={{ base: 4, md: 0 }}>
          <Heading size="lg">Bitly Works Anywhere You Do</Heading>
          <Text mt={2}>
            Watch this webinar for a step-by-step instruction on the different
            ways you can save time and be more productive by shortening,
            branding, sharing and tracking your links from the various places
            and ways you work.
          </Text>
          <Button mt={4} rightIcon={<ChevronRightIcon />} colorScheme="blue">
            Watch Now
          </Button>
        </Box>
      </Flex>

      <Heading size="lg" mb={4}>
        All Resources
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {resources.map((resource, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={resource.image} alt={resource.title} />
            <Box p={5}>
              <Text
                fontWeight="bold"
                textTransform="uppercase"
                fontSize="sm"
                letterSpacing="wide"
                color="teal.600"
              >
                {resource.type}
              </Text>
              <Text
                mt={2}
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {resource.title}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ResourcesComponent;
