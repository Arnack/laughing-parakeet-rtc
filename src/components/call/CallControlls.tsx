import { Button } from "@chakra-ui/react";

interface CallControlsProps {
  startCall: () => void;
  joinCall: () => void;
  endCall: () => void;
  callActive: boolean;
}

const CallControls = ({ startCall, joinCall, endCall, callActive }: CallControlsProps) => {
  return (
    <>
      {!callActive && (
        <>
          <Button colorScheme="green" onClick={startCall}>
            Start Call
          </Button>
          <Button colorScheme="blue" onClick={joinCall}>
            Join Call
          </Button>
        </>
      )}
      {callActive && (
        <Button colorScheme="red" onClick={endCall}>
          End Call
        </Button>
      )}
    </>
  );
};

export default CallControls;
