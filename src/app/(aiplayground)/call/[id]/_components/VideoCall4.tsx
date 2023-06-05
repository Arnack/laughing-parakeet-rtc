'use client'

import { useEffect, useState, useRef } from 'react';
import Peer, { PeerJSOption } from 'peerjs';
import { Box, IconButton, Stack } from '@chakra-ui/react';
import { IoCall, IoMicOff, IoMic, IoVideocamOff, IoVideocam, IoShare } from 'react-icons/io5';


interface VideoCallProps {
  callId: string;
  user: any;
}

const config1: PeerJSOption = {
  host: "0.peerjs.com",
  port: 443,
  path: "/",
};

interface PeerJSError extends Error {
  type?: string;
}

const VideoCall = ({ user, callId }: VideoCallProps) => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const peerVideo = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isInitiator = user?.uid === callId;

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharingActive, setScreenSharingActive] = useState(false);
  const screenStreamRef = useRef<MediaStream | null>(null);
  let callRef: any = useRef();

  const handleToggleAudio = () => {
    const enabled = !audioEnabled;
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });
    setAudioEnabled(enabled);
  };

  const handleToggleVideo = () => {
    const enabled = !videoEnabled;
    streamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = enabled;
    });
    setVideoEnabled(enabled);
  };

  const handleToggleScreenSharing = async () => {
    if (!screenSharingActive) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        screenStreamRef.current = screenStream;

        // Answer the call with screen stream
        callRef.answer(screenStream);

        setScreenSharingActive(true);
      } catch (err) {
        console.error('Error occurred when trying to get screen sharing stream', err);
      }
    } else {
      // Switch back to initial user media stream
      callRef.answer(streamRef.current);
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
        screenStreamRef.current = null;
      }
      setScreenSharingActive(false);
    }
  };

  const handleEndCall = () => {
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    //... (other actions you need to perform when ending the call)
  };

  useEffect(() => {
    const peer = new Peer(user?.uid as string, config1);

    const handleStream = (remoteStream: any) => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = remoteStream;
      }
    };

    const handleClose = () => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = null;
      }
    };

    const setupCallEvents = (call: any) => {
      call.on('stream', handleStream);
      call.on('close', handleClose);
    }

    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        streamRef.current = stream; // <-- update the ref
        return stream;
      } catch (error) {
        console.error('Error setting up stream: ', error);
        return undefined;
      }
    };

    const setupCall = async () => {
      const stream = await setupStream();

      if (stream) {
        const call = peer.call(callId, stream);
        if (call) {
          setupCallEvents(call);
        } else {
          // Handle error: unable to establish call
          console.error('Unable to establish call');
        }
      } else {
        // Handle error: unable to acquire user media
        console.error('Unable to acquire user media');
      }
    };

    const handleCall = (call: any) => {
      callRef = call; // keep a reference to the call
      setupStream().then((stream) => {
        if (stream) {
          call.answer(stream);
          setupCallEvents(call);
        } else {
          // Handle error: unable to acquire user media
          console.error('Unable to acquire user media');
        }
      });
    };

    if (!isInitiator) {
      setupCall();
      peer.on('call', handleCall);
    }

    const handlePopstate = () => {
      const stream = streamRef.current;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    const handleBeforeUnload = (ev: BeforeUnloadEvent) => {
      ev.preventDefault();
      // Close the Peer connection
      peer.destroy();
    };

    window.addEventListener('popstate', handlePopstate);
    window.addEventListener('beforeunload', handleBeforeUnload);

    peer.on('disconnected', () => {
      console.log('Peer disconnected, reconnecting...');
      peer.reconnect();
    });

    peer.on('error', (err: PeerJSError) => {
      console.error('Peer error: ', err);
      if (err?.type === 'network') {
        console.log('Network error, reconnecting...');
        peer.reconnect();
      }
    });

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      peer.destroy();
    };

  }, []);

  

  return (
    <div>
      <video ref={myVideo} autoPlay muted />
      <video ref={peerVideo} autoPlay />
      <Box position="fixed" bottom="0" width="100%" p="4" bg="gray.800" color="white">
        <Stack direction="row" spacing="4" justify="center">
          <IconButton
            aria-label="Toggle audio"
            icon={audioEnabled ? <IoMic /> : <IoMicOff />}
            onClick={handleToggleAudio}
          />
          <IconButton
            aria-label="Toggle video"
            icon={videoEnabled ? <IoVideocam /> : <IoVideocamOff />}
            onClick={handleToggleVideo}
          />
          <IconButton
            aria-label="Toggle screen sharing"
            icon={screenSharingActive ? <IoShare /> : <IoShare />}
            onClick={handleToggleScreenSharing}
          />
          <IconButton
            aria-label="End call"
            icon={<IoCall />}
            colorScheme="red"
            onClick={handleEndCall}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default VideoCall;
