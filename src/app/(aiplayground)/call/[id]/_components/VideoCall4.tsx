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

    console.log('peer>>>', peer);
    
    const handleStream = (remoteStream: any) => {
        console.log('remoteStream>>>', remoteStream);
        
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
          return stream;
        } catch (error) {
          // Handle the error appropriately
          console.error('Error setting up stream: ', error);
          return undefined;
        }
      };
      

    const setupCall = async () => {
        const stream = await setupStream();

        console.log('stream>>> 3 ', stream);
        

        if (stream) {
          const call = peer.call(callId, stream);
          if (call) {
            if (myVideo.current) {
              myVideo.current.srcObject = stream;
            }
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
      setupStream().then((stream) => {
        if (stream) {
          call.answer(stream);
          if (myVideo.current) {
            myVideo.current.srcObject = stream;
          }
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

    // Cleanup function
    return () => {
      peer.destroy();
    };

  }, []);

  console.log('videoOrder>>>>>>>>>>>>>', videoOrder);
  

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
