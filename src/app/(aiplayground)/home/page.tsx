'use client';

import { useState } from "react";
import {
  Box, Text, Container,
  AspectRatio, VStack, HStack,
  Heading, Button, Image, Link, Grid, GridItem, useDisclosure, Modal, ModalOverlay, ModalContent, Spinner
} from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

function Index4() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [videoLoading, setVideoLoading] = useState(true);
  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <>
      <Box as="section">
        <Box bgColor="blue.500" p={8}>
          <Grid templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={[12, 12, 7]}>
              <Heading color="white">Advanced way to resolve any issue</Heading>
              <Text color="white" mt={4}>Get an AI-empovered consultation with World-class experts. Anywhere, just on the tips of your fingers</Text>
              <Box mt={8}>
                <NextLink href="/page-about-1" passHref>
                  <Button as={Link} colorScheme="pink" rightIcon={<ChevronRightIcon />}>Get Started</Button>
                </NextLink>
                <NextLink href="/page-contact" passHref>
                  <Button as={Link} colorScheme="teal" ml={3}>Learn More</Button>
                </NextLink>
              </Box>
            </GridItem>
            <GridItem colSpan={[0, 0, 5]} display={{ base: "none", lg: "block" }}>
              <Box onClick={onOpen} cursor="pointer">
                <Image src="/assets/imgs/page/homepage4/banner.png" />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {videoLoading ? (
              <Spinner size="xl" />
            ) : null}
            <iframe
              onLoad={spinner}
              loading="lazy"
              width="800"
              height="500"
              src="https://www.youtube.com/embed/oRI37cOPBQQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </ModalContent>
        </Modal>
      )}

      <Box mt={20}>
        <Container>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
            <Box>
              <Heading as="h3" size="xl" mb={4}>How It Works</Heading>
              <Text></Text> {/* Empty paragraph, add content if needed */}
            </Box>
            <Box>
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">1. Search</Heading>
                <Text>Find a top expert with our smart filters</Text>
              </VStack>
            </Box>
            <Box>
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">2. Booking</Heading>
                <Text>Book a timesloth</Text>
              </VStack>
            </Box>
            <Box>
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">3. Consultation</Heading>
                <Text>Resolve your issue with a top-class expert</Text>
              </VStack>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Another Section */}
      <Box mt={20}>
        <Container>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={6}>
            <Box>
              <Image src="assets/imgs/page/homepage2/img-2.png" objectFit="cover" borderRadius="md" />
            </Box>
            <Box>
              <Text color="orange.500">What You Get</Text>
              <Heading as="h3" size="xl" mt={4}>AI empowered online consultations</Heading>
              {/* Repeat VStack component for the 3 points with icons */}
              <VStack align="start" spacing={4} mt={8}>
                <Box>
                  <Image src="/assets/imgs/page/homepage2/icon-work.svg" boxSize={6} />
                </Box>
                <Heading as="h4" size="md">Personalized Expert Guidance</Heading>
                <Text>AI-powered online consultations offer personalized guidance and solutions across various domains based on individual needs and preference</Text>
              </VStack>
              {/* ... similar VStack for other points ... */}
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Another Section */}
      <Box mt={20} py={20} bg="gray.600" color="white">
        <Container>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={6}>
            <Box>
              <Text bg="white" color="gray.800">Built Exclusively For You</Text>
              <Heading as="h3" size="xl" mt={4}>Do not take our word for it. See what our customers say.</Heading>
              <Text fontSize="xl" mt={4}>Real testimonials</Text>
              <Link href="/page-about-1" colorScheme="teal" variant="outline" mt={4} rightIcon={<ChevronRightIcon />}>
                Learn More
              </Link>
            </Box>
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={6}>
              {/* Repeat the Box for each testimonial */}
              <Box bg="white" color="gray.800" borderRadius="md" p={6} mt={6}>
                <Text fontSize="md">The online consultations provided exceptional personalized guidance. The expert advice and tailored solutions helped me navigate complex issues efficiently</Text>
                <HStack spacing={4} mt={4}>
                  <Box>
                    <Image src="/assets/imgs/page/homepage2/user-1.png" boxSize={12} borderRadius="full" />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Heading as="h4" size="md">Jane Cooper</Heading>
                    <Text fontSize="sm">Biffco Enterprises Ltd.</Text>
                  </VStack>
                </HStack>
              </Box>
              {/* ... similar Box for other testimonials ... */}
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
  )
}

export default Index4;
