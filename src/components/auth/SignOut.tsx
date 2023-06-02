import { auth } from "@/service/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Icon } from '@chakra-ui/react'
import { MdLogout } from 'react-icons/md'

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Icon
      onClick={handleSignOut}
      as={MdLogout}
      // w={6}
      h={6}
      cursor="pointer"
      style={{ marginLeft: "8px" }}
    />
  );
};

export default SignOut;
