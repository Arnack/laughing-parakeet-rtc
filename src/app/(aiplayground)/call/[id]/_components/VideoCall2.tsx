'use client'

import { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { useAuth } from "@/authContext";

interface VideoCallProps {
  callId: string;
}

const configuration = {
    // host: 'http://ec2-34-227-149-124.compute-1.amazonaws.com:8888',
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
    debug: 3,
    iceCandidatePoolSize: 10,
}

const VideoCall = ({ callId }: VideoCallProps) => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const peerVideo = useRef<HTMLVideoElement | null>(null);
  
  console.log('callId>>>', callId);

  let peerId = '';
  
  const { user } = useAuth();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }

      const peer = new Peer(user?.uid as string);

      peer.on('error', (err) => {
        console.error(`Error connecting to Peer.js>>>: ${err}`);
      });

      peer.on('open', () => {
        console.log(`Connected to Peer.js server with id>>> ${peer.id}`);
        peerId = peer.id;
      });

      peer.on('call', (call) => {

        console.log('on call>>>', call);

        call.answer(stream);

        console.log('call.answer>>>');

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

      if (callId !== user?.uid) {
        console.log('calling>>>', peer.id, 'callId>>>', callId);
        
        const call = peer.call(callId, stream);
        // const call = peer.call(peerId, stream);

        console.log('call>>>', call);
        

        call.on('stream', (remoteStream) => {
          console.log('on stream | remoteStream>>>', remoteStream);
          
          if (peerVideo.current) {
            peerVideo.current.srcObject = remoteStream;
          }
        });

        call.on('close', () => {
          console.log('Call closed>>>>');
          if (peerVideo.current) {
            peerVideo.current.srcObject = null;
          }
        });
      }
    })
    .catch((err) => {
      console.error(`Error getting user media:>>>> ${err}`);
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
      <video ref={myVideo} autoPlay muted/>
      <video ref={peerVideo} autoPlay muted/>
    </div>
  );
};

export default VideoCall;
