'use client'

import { useEffect, useState, useRef } from 'react';
import styles from './VideoCall3.module.scss';
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

  const [videoOrder, setVideoOrder] = useState<boolean>(true);

  const isInitiator = user?.uid === callId;

  useEffect(() => {
    const peer = new Peer(user?.uid as string, config1);
  
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

        call.on('close', () => {
          console.log('Call closed>>>');
          if (peerVideo.current) {
            peerVideo.current.srcObject = null;
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

          call.on('close', () => {
            console.log('Call closed>>>');
            if (peerVideo.current) {
              peerVideo.current.srcObject = null;
            }
          });
        });
      });
    }
    
  }, []);
 
  return (
    <div className={styles.videocallContainer}>
      <video
        className={videoOrder ? styles.smallVideo : styles.largeVideo}
        onClick={() => setVideoOrder(!videoOrder)}
        ref={myVideo}
        autoPlay
        muted
      />
      <video
        className={videoOrder ? styles.largeVideo : styles.smallVideo}
        onClick={() => setVideoOrder(!videoOrder)}
        ref={peerVideo}
        autoPlay
        muted
      />
    </div>
  );
};

export default VideoCall;
