import React from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Image,
  Link,
  useClipboard,
  Center,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom"; // make sure to import useLocation

const ShortenedUIComponent = () => {
  const location = useLocation();
  const { shortenedLink } = location.state || {};
  const { hasCopied, onCopy } = useClipboard(shortenedLink);

  // Dummy function to simulate QR code generation (to be implemented)
  const handleCreateQRCode = () => {
    console.log("Create QR Code functionality to be implemented");
  };

  // Dummy function to simulate Link-in-bio creation (to be implemented)
  const handleCreateLinkInBio = () => {
    console.log("Create Link-in-bio functionality to be implemented");
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box p={5} shadow="md" borderWidth="1px">
        <HStack justifyContent="space-between">
          <VStack align="start">
            <Text fontSize="xl" fontWeight="bold">
              Your Shortened Link:
            </Text>
            <Link href={shortenedLink} isExternal color="blue.500">
              {shortenedLink}
            </Link>
          </VStack>
          <Button onClick={onCopy} leftIcon={<CopyIcon />}>
            {hasCopied ? "Copied!" : "Copy"}
          </Button>
        </HStack>
      </Box>

      <HStack justifyContent="space-between">
        <VStack spacing={2}>
          <Text fontSize="md" fontWeight="bold">
            QR Code
          </Text>
          <Button onClick={handleCreateQRCode}>Create QR Code</Button>
        </VStack>
        <VStack spacing={2}>
          <Text fontSize="md" fontWeight="bold">
            Link-in-bio
          </Text>
          <Button onClick={handleCreateLinkInBio}>Create Link-in-bio</Button>
        </VStack>
      </HStack>

      {/* Placeholder for QR Code - to be replaced with actual generated QR Code */}
      <Center p={5}>
        <Image
          src="path_to_generated_qr_code.png"
          alt="QR Code"
          boxSize="100px"
        />
      </Center>
    </VStack>
  );
};

export default ShortenedUIComponent;
