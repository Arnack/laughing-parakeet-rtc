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
  const localVideoRef = useRef<Peer | null | HTMLVideoElement>(null);
  const remoteVideoRef = useRef<Peer | null | HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null | HTMLVideoElement>(null);

  // Handle joining and leaving a call
  useEffect(() => {
    if (!user) {
      return;
    }

    const db = realtimeDB;
    const callRef = ref(db, `calls/${callId}`);
    const userRef = ref(db, `calls/${callId}/users/${user.uid}`);

    // Create a new Peer
    peerRef.current = new Peer(user.uid, {config: {
      host: '0.peerjs.com',
      'iceServers': [
          {
              urls: [
                  'stun:stun1.l.google.com:19302',
                  'stun:stun2.l.google.com:19302',
                  'stun:stun.services.mozilla.com'
              ],
          },
          // { urls: 'turn:numb.viagenie.ca','credential': 'hmprettyplease','username': 'gri-go-riy@mail.ru' }
        ],
      }}
    );

    console.log('peerRef.current>>>');
    

    peerRef.current.on('open', () => {
      // Join the call
      set(userRef, true);
    });

    peerRef.current.on('call', (incomingCall) => {
      if (stream)
        incomingCall.answer(stream);

      console.log('call>>>');
      

      incomingCall.on('stream', (incomingStream) => {
        if (remoteVideoRef.current) {
          // @ts-ignore
          remoteVideoRef.current.srcObject = incomingStream;
        }
      });

      console.log('stream>>>');
      
    });

    // Listen for changes in the call
    onValue(callRef, (snapshot) => {
      setCall(snapshot.val());
      console.log('snapshot.val()>>>', snapshot.val());
    });

    return () => {
      // Leave the call and destroy the Peer
      remove(userRef);
      // @ts-ignore
      peerRef?.current?.destroy();

      console.log('destroy>>>');
      
    };
  }, [callId, user, stream]);

  // Handle user video stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        // @ts-ignore
        setStream(stream);
        
        if (localVideoRef.current) {

          // @ts-ignore
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error(err));
    
    return () => {
      // @ts-ignore
      stream?.getTracks()?.forEach(track => track.stop());
    };
  }, []);

  // Handle call initiation
  useEffect(() => {

    console.log('call>>>', call);
    console.log('stream>>>', stream);
    

    // @ts-ignore
    if (call && Object.keys(call.users).length === 2) {
      // @ts-ignore
      const otherUserId = Object.keys(call.users).find(id => id !== user.uid);
      
      if (otherUserId) {
        // @ts-ignore
        const outgoingCall = peerRef.current.call(otherUserId, stream);
        
        outgoingCall.on('stream', (incomingStream: any) => {
          if (remoteVideoRef.current) {
            // @ts-ignore
            remoteVideoRef.current.srcObject = incomingStream;
          }
        });
      }
    }
  }, [call, user, stream]);

  if (!call) {
    return <div>
      <Text>Loading...</Text>
      {/* @ts-ignore */}
      <video ref={localVideoRef} autoPlay playsInline muted />
      </div>;
  }

  // @ts-ignore
  if (Object.keys(call?.users).length >= 2 && !call.users[user.uid]) {
    return <Text>Call is already in progress</Text>;
  }

  return (
    <VStack>
      <Box>
        <Text>Local Stream</Text>
        {/* @ts-ignore */}
        <video ref={localVideoRef} autoPlay playsInline muted />
      </Box>
      <Box>
        <Text>Remote Stream</Text>
        {/* @ts-ignore */}
        <video ref={remoteVideoRef} autoPlay playsInline />
      </Box>
    </VStack>
  );
};

export default VideoCall;
