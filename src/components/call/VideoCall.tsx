'use client';

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { getDatabase, ref, set, onValue, off, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import CallControls from "./CallControlls";

const VideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callActive, setCallActive] = useState(false);
  const router = useRouter();

  // Определите свои переменные для WebRTC здесь
  let localConnection: RTCPeerConnection;
  let remoteConnection: RTCPeerConnection;

  const configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  const startCall = async () => {
    if (localStream) {
      localConnection = new RTCPeerConnection(configuration);
      localConnection.addStream(localStream);

      localConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          const candidateId = uuidv4();
          await set(ref(getDatabase(), `calls/${router.query.id}/candidates/${candidateId}`), {
            candidate: e.candidate,
          });
        }
      };

      localConnection.onaddstream = (e) => {
        setRemoteStream(e.stream);
      };

      const offer = await localConnection.createOffer();
      await localConnection.setLocalDescription(offer);

      await set(ref(getDatabase(), `calls/${router.query.id}`), {
        offer: localConnection.localDescription,
      });

      onValue(ref(getDatabase(), `calls/${router.query.id}/answer`), async (snapshot) => {
        if (snapshot.exists() && localConnection.localDescription) {
          await localConnection.setRemoteDescription(new RTCSessionDescription(snapshot.val()));
        }
      });

      onValue(ref(getDatabase(), `calls/${router.query.id}/candidates`), async (snapshot) => {
        if (snapshot.exists()) {
          const candidates = snapshot.val();
          for (const candidate of Object.values(candidates)) {
            await localConnection.addIceCandidate(new RTCIceCandidate(candidate));
          }
        }
      });

      setCallActive(true);
    }
  };

  const joinCall = async () => {
    if (localStream) {
      remoteConnection = new RTCPeerConnection(configuration);
      remoteConnection.addStream(localStream);
  
      remoteConnection.onicecandidate = async (e) => {
        if (e.candidate) {
          const candidateId = uuidv4();
          await set(ref(getDatabase(), `calls/${router.query.id}/candidates/${candidateId}`), {
            candidate: e.candidate,
          });
        }
      };
  
      remoteConnection.onaddstream = (e) => {
        setRemoteStream(e.stream);
      };
  
      const snapshot = await get(ref(getDatabase(), `calls/${router.query.id}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.offer) {
          await remoteConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await remoteConnection.createAnswer();
          await remoteConnection.setLocalDescription(answer);
  
          await set(ref(getDatabase(), `calls/${router.query.id}/answer`), {
            answer: remoteConnection.localDescription,
          });
        }
      }
  
      onValue(ref(getDatabase(), `calls/${router.query.id}/candidates`), async (snapshot) => {
        if (snapshot.exists()) {
          const candidates = snapshot.val();
          for (const candidate of Object.values(candidates)) {
            await remoteConnection.addIceCandidate(new RTCIceCandidate(candidate));
          }
        }
      });
  
      setCallActive(true);
    }
  };
  
  const endCall = async () => {
    if (localConnection) {
      localConnection.close();
      localConnection = null;
    }
    if (remoteConnection) {
      remoteConnection.close();
      remoteConnection = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(null);
    setRemoteStream(null);
    setCallActive(false);
    await remove(ref(getDatabase(), `calls/${router.query.id}`));
  };
  

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setLocalStream(stream);
    })();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <Box>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <CallControls startCall={startCall} joinCall={joinCall} endCall={endCall} callActive={callActive} />
    </Box>
  );
};

export default VideoCall;
