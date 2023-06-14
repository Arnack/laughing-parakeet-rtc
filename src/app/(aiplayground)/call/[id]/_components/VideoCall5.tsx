'use client'

import { useEffect, useState, useRef } from 'react';
import { Box, IconButton, Stack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { IoCall, IoMicOff, IoMic, IoVideocamOff, IoVideocam, IoShare, IoPaperPlane } from 'react-icons/io5';
import Chat from './TextChat'; // import the Chat component
import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';

interface VideoCallProps {
  callId: string;
  user: any;
}

const VideoCall = ({ user, callId }: VideoCallProps) => {
  const OV = new OpenVidu();
  const [session, setSession] = useState<Session | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState<any[]>([]);
  const handleSendMessage = (message: string) => {
    session?.signal({
      data: message,
      type: 'chat'
    });
  };

  const handleToggleAudio = () => {
    const enabled = !audioEnabled;
    publisher?.publishAudio(enabled);
    setAudioEnabled(enabled);
  };

  const handleToggleVideo = () => {
    const enabled = !videoEnabled;
    publisher?.publishVideo(enabled);
    setVideoEnabled(enabled);
  };

  const handleEndCall = () => {
    session?.disconnect();
  };
  
  useEffect(() => {
    const mySession = OV.initSession();
    setSession(mySession);
    const myPublisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: audioEnabled,
      publishVideo: videoEnabled,
    });

    setPublisher(myPublisher);

    mySession.on('streamCreated', (event) => {
      let subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      setSubscribers(prevSubscribers => prevSubscribers.filter(subscriber => subscriber.stream !== event.stream));
    });

    mySession.on('signal:chat', (event) => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    });

    fetch('http://37.218.245.83:5000/getToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionName: callId }),
    })
    .then(response => response.json())
    .then(data => {
      mySession.connect(data.token)
      .then(() => {
        mySession.publish(myPublisher);
      })
      .catch(error => {
        console.error('Error connecting to the session', error);
      });
    })
    .catch(error => {
      console.error('Error getting a token', error);
    });

    return () => {
      mySession.disconnect();
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
          <IconButton
            aria-label="Toggle chat"
            icon={<IoPaperPlane />}
            onClick={onOpen}
          />
        </Stack>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Chat user={user} callId={callId} messages={messages} onSendMessage={handleSendMessage} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default VideoCall;
