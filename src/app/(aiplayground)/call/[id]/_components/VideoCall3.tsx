'use client'

import { useEffect, useRef } from 'react';
import Peer from 'peerjs';

interface VideoCallProps {
  callId: string;
  user: any;
}

const config1 = {
    host: "0.peerjs.com",
    port: 443,
    path: "/",
    pingInterval: 5000,
  }

const VideoCall = ({ user, callId }: VideoCallProps) => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const peerVideo = useRef<HTMLVideoElement | null>(null);

  const isInitiator = user?.uid === callId;

  useEffect(() => {
    const peer = new Peer(user?.uid as string, config1);

    // if (!isInitiator) {
      const conn = peer.connect(callId);
      conn.on("open", () => {
        conn.send("Hello World!");
      });
      conn.on("data", (data) => {
        console.log("Received data>>>>", data);
      });
    // }
  

    if (!isInitiator) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }

        const call = peer.call(callId, stream);

        call.on('stream', (remoteStream) => {
          console.log('on stream | remoteStream>>>', remoteStream);
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
          }
        });
      });

      peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (myVideo.current) {
            myVideo.current.srcObject = stream;
          }
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            console.log('on stream | remoteStream>>>', remoteStream);
            if (peerVideo.current) {
              peerVideo.current.srcObject = remoteStream;
            }
          });
        });
      });
    }
    
  }, []);
 
  return (
    <div>
      <video ref={myVideo} autoPlay muted/>
      <video ref={peerVideo} autoPlay muted/>
    </div>
  );
};

export default VideoCall;
