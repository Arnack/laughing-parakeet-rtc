'use client'

import VideoCall from "./_components/VideoCall3";
import { Box } from "@chakra-ui/react";

const CallPage = () => {

  const callId = location.pathname.split("/")[2];
  
  return (
    <Box>
      <VideoCall callId={callId} />
    </Box>
  );
};

export default CallPage;
