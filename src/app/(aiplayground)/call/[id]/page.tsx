'use client'

import VideoCall from "./_components/VideoCall2";
import { Box } from "@chakra-ui/react";
import { auth } from '@/service/firebase/firebaseConfig';

const CallPage = () => {

  const callId = location.pathname.split("/")[2];
  return (
    <Box>
      <VideoCall callId={callId} />
    </Box>
  );
};

export default CallPage;
