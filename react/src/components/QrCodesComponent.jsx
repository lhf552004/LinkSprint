import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";

const QRCodeComponent = () => {
  const [destinationURL, setDestinationURL] = useState("");
  const [title, setTitle] = useState("");
  const [customBackHalf, setCustomBackHalf] = useState("");
  const [qrCodeImage, setQRCodeImage] = useState(null);
  const toast = useToast();

  const generateQRCode = async () => {
    // Here you would call your backend service to generate the QR code image
    // For demonstration, I'm setting a placeholder image
    // In a real-world scenario, you would replace this with the actual QR code image URL
    const placeholderQRCodeImage = "path_to_your_qr_code_image";
    setQRCodeImage(placeholderQRCodeImage);

    toast({
      title: "QR Code Generated",
      description: "We've generated your QR Code.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="lg">
          Enter your QR Code destination
        </Heading>

        <FormControl id="destination-url" isRequired>
          <FormLabel>Destination URL</FormLabel>
          <Input
            value={destinationURL}
            onChange={(e) => setDestinationURL(e.target.value)}
            placeholder="https://example.com/my-long-url"
          />
        </FormControl>

        <Text>You can create 2 more QR Codes this month.</Text>

        <FormControl id="title">
          <FormLabel>Code details</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
          />
        </FormControl>

        <FormControl id="custom-back-half">
          <FormLabel>Short link</FormLabel>
          <HStack>
            <Input
              value={customBackHalf}
              onChange={(e) => setCustomBackHalf(e.target.value)}
              placeholder="Custom back-half (optional)"
            />
          </HStack>
        </FormControl>

        <Button colorScheme="blue" onClick={generateQRCode}>
          Design your code
        </Button>

        {/* QR Code Preview */}
        {qrCodeImage && (
          <Box>
            <Heading as="h3" size="md" mb={2}>
              Preview
            </Heading>
            <Image src={qrCodeImage} alt="QR Code Preview" />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default QRCodeComponent;
