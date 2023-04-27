import { auth } from "@/service/firebase/firebaseConfig";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button colorScheme="red" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOut;
