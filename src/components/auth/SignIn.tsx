import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/service/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Icon } from '@chakra-ui/react'
import { IoLogoGoogle } from 'react-icons/io5'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>

      <Button
            colorScheme="blue"
            onClick={signInWithGoogle}
            leftIcon={<IoLogoGoogle />}
            variant="outline"
            width="100%"
        >
            Sign In with Google
        </Button>

        <Box display="flex" alignItems="center" mt={4}>
          <Box flex="1" height="1px" bg="gray.500"
            width="180px"
          />
          <Box as="span" px={2} color="gray.500" fontWeight="semibold">
            or
          </Box>
          <Box flex="1" height="1px" bg="gray.500"
            width="180px"
          />
        </Box>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Sign In
        </Button>

      </VStack>
    </form>
  );
};

export default SignIn;
