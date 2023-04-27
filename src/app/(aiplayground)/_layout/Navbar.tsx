import { useAuth } from "@/authContext";
import SignIn from "@/components/auth/SignIn";
import SignOut from "@/components/auth/SignOut";
import styles from "./Navbar.module.css";
import {
  Box,
  Flex,
  Heading,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SignUp from "@/components/auth/SignUp";



const Navbar = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log("user>>>", user);
  

  return (
    <Box bg="teal.400" width="100%" p={4} color="white">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="md">YourAppName</Heading>
        <Flex>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
          <Link className={styles.navLink} href="/about">
            About
          </Link>
          <Link className={styles.navLink} href="/services">
            Services
          </Link>
          <Link className={styles.navLink} href="/contact">
            Contact
          </Link>
          {
            user && (
              <Link className={styles.navLink} href="/#">
                {user.displayName}
              </Link>
            )
          }
          {user ? (
            <SignOut />
          ) : (
            <Button colorScheme="whiteAlpha" onClick={onOpen}>
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
      {!user && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs>
                <TabList>
                  <Tab>Sign In</Tab>
                  <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SignIn />
                  </TabPanel>
                  <TabPanel>
                    <SignUp />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>

            <ModalFooter justifyContent="center">
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Navbar;
