import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Select,
  Flex,
  Container,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // make sure to import useNavigate

export default function UrlShortnerComponent() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleShortenURL = async () => {
    try {
      // Make sure to replace YOUR_CLOUD_FUNCTION_URL with the actual endpoint URL
      const response = await fetch(
        "https://us-central1-linksprint.cloudfunctions.net/shortenURL",
        {
          method: "POST",
          body: JSON.stringify({ originalURL: url }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Shortened URL:", data.shortCode);
      if (data.shortCode) {
        navigate("/shortened-link", {
          state: {
            shortenedLink:
              "https://us-central1-linksprint.cloudfunctions.net/redirect/" +
              data.shortCode,
          },
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} alignItems="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Shorten a long link
        </Heading>

        <FormControl id="url">
          <FormLabel>Paste a long URL</FormLabel>
          <Input
            placeholder="https://example.com"
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormControl>

        <FormControl id="domain">
          <FormLabel>Domain</FormLabel>
          <Select placeholder="Select domain">
            <option value="bit.ly">bit.ly</option>
            {/* ...other domain options */}
          </Select>
        </FormControl>

        <FormControl id="back-half">
          <FormLabel>Enter a back-half (optional)</FormLabel>
          <Input placeholder="example: favorite-link" />
        </FormControl>

        <Text color="blue.500" fontSize="sm">
          ✨ End your link with words that will make it unique
        </Text>

        <Button size="lg" colorScheme="blue" onClick={handleShortenURL}>
          Shorten URL
        </Button>

        <Box>
          <Flex align="center" justify="space-between">
            <Text>No credit card required. Your free plan includes:</Text>
            <Checkbox defaultIsChecked>Short links</Checkbox>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text></Text>
            <Checkbox defaultIsChecked>QR Codes</Checkbox>
          </Flex>
          <Flex align="center" justify="space-between">
            <Text></Text>
            <Checkbox defaultIsChecked>Link-in-bio page</Checkbox>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
}
