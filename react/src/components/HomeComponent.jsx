import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  useToast,
  Image,
} from "@chakra-ui/react";
import { SearchIcon, LinkIcon, AtSignIcon } from "@chakra-ui/icons";

const HomeComponent = () => {
  const [url, setUrl] = useState("");
  const [backHalf, setBackHalf] = useState("");
  const toast = useToast();

  const handleShortenURL = () => {
    // Logic to shorten URL
    toast({
      title: "Link Shortened",
      description: "Your shortened link is ready!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} maxW="xl" mx="auto">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl">
          Make every connection count
        </Heading>
        <Text>
          Create short links, QR Codes, and Link-in-bio pages. Share them
          anywhere. Track what’s working, and what’s not. All inside the Bitly
          Connections Platform.
        </Text>

        <Box as="section" p={6} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="md">
              Shorten a long link
            </Heading>

            <FormControl>
              <FormLabel>Paste a long URL</FormLabel>
              <Input
                placeholder="Example: http://super-long-link.com/shorten-it"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <Input value="bit.ly" readOnly pr={4} />
              <Input
                placeholder="Enter a back-half (optional)"
                value={backHalf}
                onChange={(e) => setBackHalf(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="blue" onClick={handleShortenURL}>
              Sign up and get your link
            </Button>
          </VStack>
        </Box>

        <HStack spacing={4}>
          <Icon as={SearchIcon} w={6} h={6} />
          <Text>Short link</Text>
          <Icon as={LinkIcon} w={6} h={6} />
          <Text>QR Code</Text>
          <Icon as={AtSignIcon} w={6} h={6} />
          <Text>Link-in-bio</Text>
        </HStack>

        <Text>
          No credit card required. Your free plan includes: Short links, QR
          Codes, Link-in-bio page
        </Text>
      </VStack>
    </Box>
  );
};

export default HomeComponent;
