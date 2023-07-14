'use client'

import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Peer, { DataConnection, PeerJSOption } from 'peerjs';
import { Box, IconButton, Stack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { IoCall, IoMicOff, IoMic, IoVideocamOff, IoVideocam, IoShare, IoPaperPlane, IoApps, IoCreate, IoLanguage, IoText, IoRecording } from 'react-icons/io5';
import Chat from './TextChat'; // import the Chat component
import AIPanel from './AIPanel';

// @ts-ignore
var SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAI, onOpen: onOpenAI, onClose: onCloseAI } = useDisclosure();
  const dataConnectionRef = useRef<DataConnection | null>(null);

  const [currentTranscript, setCurrentTranscript] = useState("");
  const [currentTranslated, setCurrentTranslated] = useState("");

  const [showCurrentTranscript, setShowCurrentTranscript] = useState(false);
  const [showCurrentTranslated, setShowCurrentTranslated] = useState(false);

  const [finalText, setFinalText] = useState("");


  const [messages, setMessages] = useState<any[]>([]);
  const handleSendMessage = (message: string) => {
    dataConnectionRef.current?.send(message);
  };

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


    recognition.onstart = function () {
      // console.log('Voice recognition started.>>>>>');
    }

    recognition.onspeechend = function () {
      // console.log('You were quiet for a while so voice recognition turned itself off.>>>>');
    }

    recognition.onerror = function (event: any) {
      if (event.error == 'no-speech') {
        // console.log('No speech was detected. Try again.>>>>');
      }
    }

    recognition.onsoundend = function () {
      // console.log('>>>>>Sound has ended.');
    }

    let finalTranscript = '';
    let interimTranscript = '';
    let lastResultIndex = 0;

    recognition.onresult = async function (event: any) {
      interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          lastResultIndex = event.resultIndex + 1;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // console.log('Final: ', finalTranscript);

      setFinalText(finalTranscript);

      // console.log('Interim: ', interimTranscript);

      if (showCurrentTranslated || true) {
        // Sending a request to Google Translate API
        const response = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_API_KEY}`,
          {
            q: interimTranscript,
            source: 'en',
            target: 'ru',
          }
        );
        const translation = response.data.data.translations[0].translatedText;
        // console.log(`Translation: ${translation}`);
        setCurrentTranslated(prevTranslation => translation && translation.length > 0 ? translation : prevTranslation);
      }

      setCurrentTranscript(prevTranscript => interimTranscript && interimTranscript.length > 0 ? interimTranscript : prevTranscript);

    }

    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        streamRef.current = stream; // <-- update the ref
        recognition.start(); // <-- start speech recognition after stream is available
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

        // peerjs data connection
        const conn = peer.connect(callId);
        dataConnectionRef.current = conn;

        conn.on("open", () => {
          conn.send("hi! world of connections>>>>");
        });

      } else {
        // Handle error: unable to acquire user media
        console.error('Unable to acquire user media');
      }
    };

    // Set up data connection
    peer.on('connection', (conn) => {
      dataConnectionRef.current = conn;
      
      console.log('Data connection established on recieved >>>>');
      

      conn.on('data', (data) => {
        setMessages(prevMessages => [...prevMessages, data]);
      });

      conn.on('open', () => {
        // The data connection is now open, we can start the chat
        console.log('Data connection opened');
      });
    });

    const handleCall = (call: any) => {
      callRef = call; // keep a reference to the call
      console.log('Call handleCall>>>', call);
      
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
      console.error('Peer error:>>> ', err);
      if (err?.type === 'network') {
        console.log('Network error, reconnecting...');
        peer.reconnect();
      }
    });

    // Cleanup function
    return () => {
      recognition.stop();
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      dataConnectionRef.current?.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      peer.destroy();
    };

  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTranscript("");
    }, 2400); // Clear after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [currentTranscript]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTranslated("");
    }, 2400); // Clear after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [currentTranslated]);

  return (
    <div>
      <video style={{ width: '48%', float: 'left', margin: '4px' }}
        ref={myVideo} autoPlay
        muted
      />
      <video style={{ width: '48%', float: 'left', margin: '4px' }}
        ref={peerVideo} autoPlay
      />
      {showCurrentTranscript && currentTranscript?.length &&
      <Box position="fixed" bottom={showCurrentTranslated ? "160px" : "80px"}
          width="100%" p="4" bg="gray.800" color="white" textAlign="center">
        <p>{currentTranscript}</p>
      </Box>}

      {showCurrentTranslated && currentTranslated?.length &&
      <Box position="fixed" bottom="80px"
      width="100%" p="4" bg="gray.800" color="white" textAlign="center">
        <p>{currentTranslated}</p>
      </Box>}

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
            aria-label="Toggle recording"
            icon={<IoRecording />}
            // onClick={handleToggleVideo}
          />
          <IconButton
            aria-label="Toggle screen sharing"
            icon={screenSharingActive ? <IoShare /> : <IoShare />}
            onClick={handleToggleScreenSharing}
          />
          <IconButton
            aria-label="Toggle screen sharing"
            icon={<IoApps />}
            onClick={onOpenAI}
          />
          <IconButton
            aria-label="Toggle screen sharing"
            icon={<IoCreate />}
            onClick={handleToggleScreenSharing}
          />
          <IconButton
            aria-label="Toggle caption"
            icon={<IoText />}
            onClick={() => setShowCurrentTranscript(!showCurrentTranscript)}
            colorScheme={showCurrentTranscript ? "teal" : "gray"}
          />
          <IconButton
            aria-label="Toggle translation"
            icon={<IoLanguage />}
            onClick={() => setShowCurrentTranslated(!showCurrentTranslated)}
            colorScheme={showCurrentTranslated ? "teal" : "gray"}
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

      <Drawer isOpen={isOpenAI} placement="right" onClose={onCloseAI}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <AIPanel sessionText={finalText} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default VideoCall;
