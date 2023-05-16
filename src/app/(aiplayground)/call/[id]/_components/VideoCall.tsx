'use client'

import React, { useEffect, useRef, useState } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useAuth } from "@/authContext";
import { realtimeDB } from "@/service/firebase/firebaseConfig";
import Peer from 'peerjs';

interface VideoCallProps {
  callId: string;
}

const VideoCall = ({ callId }: VideoCallProps) => {
  const { user } = useAuth();
  const [call, setCall] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const peerRef = useRef(null);

  // Handle joining and leaving a call
  useEffect(() => {
    if (!user) {
      return;
    }

    const db = realtimeDB;
    const callRef = ref(db, `calls/${callId}`);
    const userRef = ref(db, `calls/${callId}/users/${user.uid}`);
  
    // Create a new Peer
    // @ts-ignore
    peerRef.current = new Peer(user.uid, {
      host: 'peerjs-server.herokuapp.com',
      secure: true,
      config: {
        iceServers: [
          { url: 'stun:stun1.l.google.com:19302' },
          { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
        ]
      }
    });
  
    // @ts-ignore
    peerRef.current.on('open', () => {
      // Join the call
      set(userRef, true);
    });
  
    // @ts-ignore
    peerRef.current.on('call', (incomingCall) => {
      incomingCall.answer(stream);
  
    // @ts-ignore
      incomingCall.on('stream', (incomingStream) => {
        if (videoRef.current) {
          // @ts-ignore
          videoRef.current.srcObject = incomingStream;
        }
      });
    });
  
    // Listen for changes in the call
    onValue(callRef, (snapshot) => {
      setCall(snapshot.val());
    });
  
    return () => {
      // Leave the call and destroy the Peer
      remove(userRef);
      // @ts-ignore
      peerRef.current.destroy();
    };
  }, [callId, user, stream]);
  

  // Handle user video stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        // @ts-ignore
        setStream(stream);
        
        if (videoRef.current) {
          // @ts-ignore
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error(err));
    
    return () => {
      // @ts-ignore
      stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Handle call initiation
  useEffect(() => {
    // @ts-ignore
    if (call && Object.keys(call.users).length === 2) {
      // @ts-ignore
      const otherUserId = Object.keys(call.users).find(id => id !== user.uid);
      
      if (otherUserId) {
        // @ts-ignore
        const outgoingCall = peerRef.current.call(otherUserId, stream);
        
    // @ts-ignore
        outgoingCall.on('stream', (incomingStream) => {
          if (videoRef.current) {
            // @ts-ignore
            videoRef.current.srcObject = incomingStream;
          }
        });
      }
    }
  }, [call, user, stream]);

  if (!call) {
    return <Text>Loading......</Text>;
  }

    // @ts-ignore
  if (Object.keys(call.users).length >= 2 && !call.users[user.uid]) {
    return <Text>Call is already in progress</Text>;
  }

  return (
    <VStack>
      <Text>%Call ID: {callId}</Text>
      <Box>
        <video ref={videoRef} autoPlay playsInline />
      </Box>
    </VStack>
  );
};

export default VideoCall;

