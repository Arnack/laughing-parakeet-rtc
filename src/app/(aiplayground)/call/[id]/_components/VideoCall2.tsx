'use client'

import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { auth } from '@/service/firebase/firebaseConfig';

interface VideoCallProps {
  callId: string;
}

const VideoCall = ({ callId }: VideoCallProps) => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const peerVideo = useRef<HTMLVideoElement | null>(null);

  console.log('auth>>>', auth);
  

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }

      const peer = new Peer(auth.currentUser?.uid as string);

      peer.on('error', (err) => {
        console.error(`Error connecting to Peer.js: ${err}`);
      });

      peer.on('open', () => {
        console.log(`Connected to Peer.js server with id ${peer.id}`);
      });

      peer.on('call', (call) => {
        call.answer(stream);

        call.on('stream', (remoteStream) => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
          }
        });

        call.on('close', () => {
          console.log('Call closed');
          if (peerVideo.current) {
            peerVideo.current.srcObject = null;
          }
        });
      });

      if (callId !== auth.currentUser?.uid) {
        const call = peer.call(callId, stream);

        call.on('stream', (remoteStream) => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
          }
        });

        call.on('close', () => {
          console.log('Call closed');
          if (peerVideo.current) {
            peerVideo.current.srcObject = null;
          }
        });
      }
    })
    .catch((err) => {
      console.error(`Error getting user media: ${err}`);
    });

    // cleanup function
    return () => {
      if (myVideo.current) {
        const stream = myVideo.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        myVideo.current.srcObject = null;
      }
    };
  }, [callId]);

  return (
    <div>
      <video ref={myVideo} autoPlay />
      <video ref={peerVideo} autoPlay />
    </div>
  );
};

export default VideoCall;
