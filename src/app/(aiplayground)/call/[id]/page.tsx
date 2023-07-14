'use client'

// import VideoCall from "./_components/VideoCall3";
import VideoCall from "./_components/VideoCall4";
import { Box } from "@chakra-ui/react";
import { useAuth } from "@/authContext";

const CallPage = () => {

  const callId = location.pathname.split("/")[2];
  let { user } = useAuth();

  if (!user || !user.uid) { // TODO remove it. It was added only for sesting purpuses
    // @ts-ignore
    user = {
      uid: 'anonymousguestusver',
    }
  }
  
  return (
    <Box>
      {
        user?.uid ? <VideoCall user={user} callId={callId} /> :
        <Box>Please log in</Box>
      }
    </Box>
  );
};

export default CallPage;
