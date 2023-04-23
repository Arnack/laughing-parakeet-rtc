'use client';

import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
