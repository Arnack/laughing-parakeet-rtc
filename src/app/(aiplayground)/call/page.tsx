'use client'

import { Box } from "@chakra-ui/react";
import { useAuth } from "@/authContext";
// import VideoRoomComponent from "@/components/call/components/VideoRoomComponent";
// import VideoRoomComponent from "../../components/call/components/VideoRoomComponent";
import Link from "next/link";

const CallPage = () => {
  const { user } = useAuth();

  console.log('user>>>', user);
  return (
    <Box>
      <Link href={`/call/${user?.uid}`}>
        Call
      </Link>
      {/* <VideoRoomComponent /> */}
    </Box>
  );
};

export default CallPage;
