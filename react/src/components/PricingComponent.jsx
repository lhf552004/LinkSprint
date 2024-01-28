import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Stack,
  Switch,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const PricingCard = ({ title, price, features, isPopular }) => {
  const bg = useColorModeValue("white", "gray.700");
  const borderColor = isPopular ? "blue.300" : "transparent";
  const boxShadow = isPopular ? "lg" : "";

  return (
    <VStack
      p={4}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      boxShadow={boxShadow}
      borderRadius="lg"
      width="full" // Make sure all cards have the same width
      alignItems="start"
      role="group"
      _hover={{
        boxShadow: "xl",
      }}
    >
      <Heading size="lg" fontWeight="bold">
        {title}
      </Heading>
      <Text fontSize="2xl" fontWeight="bold">
        ${price}
        <Text as="span" fontSize="md" fontWeight="normal">
          {" "}
          /month
        </Text>
      </Text>
      <Stack direction="column" alignItems="start" spacing={2}>
        {features.map((feature, index) => (
          <Text key={index}>{feature}</Text>
        ))}
      </Stack>
      <Button
        size="md"
        colorScheme={isPopular ? "blue" : "gray"}
        variant={isPopular ? "solid" : "outline"}
        width="full"
      >
        Get Started
      </Button>
    </VStack>
  );
};

const PricingComponent = () => {
  const pricingPlans = [
    {
      title: "FREE",
      price: "0",
      features: [
        "2 QR Codes/month",
        "10 links/month",
        "1 Link-in-bio page",
        "5 custom back-halves",
        "PNG & JPEG QR Code download formats",
        "QR Code customizations",
      ],
      isPopular: false,
    },
    {
      title: "CORE",
      price: "8",
      features: [
        "Everything in Free, plus:",
        "5 QR Codes/month",
        "100 links/month",
        "1 Link-in-bio page",
        "30 days of click & scan data",
        "UTM Builder",
        "Advanced QR Code customizations",
        "Link & QR Code redirects",
      ],
      isPopular: true,
    },
    // ... add more plans as needed
  ];

  return (
    <Container maxW="container.xl" py={12}>
      {/* Header Section */}
      <VStack spacing={4}>
        <Heading as="h1" size="xl" textAlign="center">
          Pricing for brands and businesses of all sizes
        </Heading>
        <Text textAlign="center">
          Connect to your audience with branded links, QR Codes, and a
          Link-in-bio that will get their attention.
        </Text>
        <HStack justify="center" align="center" spacing={4}>
          <FormLabel htmlFor="toggle-pricing">
            Save up to 34% when you pay annually
          </FormLabel>
          <Switch id="toggle-pricing" colorScheme="blue" />
          <Text>Pay annually</Text>
          <Text>Pay monthly</Text>
        </HStack>
      </VStack>

      {/* Pricing Plans Section */}
      <Container maxW="container.xl" py={12}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="center"
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </Stack>
      </Container>

      {/* Enterprise Section */}
      <VStack spacing={4} mt={10}>
        <Heading as="h2" size="lg">
          BITLY FOR ENTERPRISE
        </Heading>
        <Text textAlign="center">
          The trusted, unrivaled enterprise-grade solution. One platform for all
          your link and QR Code needs.
        </Text>
        <Button variant="outline" colorScheme="blue">
          Get a Quote
        </Button>
      </VStack>
    </Container>
  );
};

export default PricingComponent;
