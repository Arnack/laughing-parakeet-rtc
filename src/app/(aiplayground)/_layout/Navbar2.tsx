'use client'

import { useAuth } from "@/authContext"; 
import { Avatar } from '@chakra-ui/react'
import SignIn from "@/components/auth/SignIn";
import SignOut from "@/components/auth/SignOut";
import styles from "./Navbar.module.css";
import {
    Box,
    Flex,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
  } from "@chakra-ui/react";
  import Link from 'next/link';
  import { Icon } from '@chakra-ui/react'
  import { MdLogin } from 'react-icons/md'
  import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
  import SignUp from "@/components/auth/SignUp";


const Navbar = () => {
    const { user } = useAuth();
    
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Box bg="teal.400" width="100%" p={4} color="white">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading size="md">Wisely</Heading>
  
          <Flex justifyContent="center" flex="1">
            <Link className={styles.navLink} href="/home">
              Home
            </Link>
            <Link className={styles.navLink} href="/find">
              Find
            </Link>
            <Link className={styles.navLink} href="/sessions">
              Sessions
            </Link>
            <Link className={styles.navLink} href="/calendar">
              Calendar
            </Link>
            <Link className={styles.navLink} href="/profile">
              Profile
            </Link>
            <Link className={styles.navLink} href="/call">
              Call
            </Link>
          </Flex>
  
          <Flex>
            {
              user && (
                <Link className={styles.navLink} href="/profile">
                  {
                    user.photoURL ? (
                      <Avatar size='xs' name={user.displayName || undefined} src={user.photoURL} />
                    ) : (
                      user.displayName
                    )
  
                  }
                </Link>
              )
            }
            {user ? (
              <SignOut />
            ) : (
              
              <Icon
                onClick={onOpen}
                as={MdLogin}
                h={6}
                cursor="pointer"
                style={{ marginLeft: "8px" }}
              />
            )}
          </Flex>
        </Flex>
        {!user && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
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
            </ModalContent>
          </Modal>
        )}
      </Box>
    );
  };
  
  export default Navbar;
  