'use client'

import React, { useEffect, useState } from 'react';
import { Box, VStack, Textarea, HStack, IconButton, Text } from '@chakra-ui/react';
import { IoPaperPlane } from 'react-icons/io5';

interface ChatProps {
  user: any;
  callId: string;
  messages: Array<{ sender: string, message: string }>;
  onSendMessage: (message: string) => void;
}

const Chat = ({ user, callId, messages, onSendMessage }: ChatProps) => {
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Whenever the message list changes, scroll to the bottom of the chat
    const chatDiv = document.getElementById('chat');
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      onSendMessage(messageInput.trim());
      setMessageInput('');
    }
  };

  return (
    <Box w="100%" h="100%" p="5" overflowY="auto" id="chat">
      <VStack spacing={3} align="stretch">
        {messages.map((msg, index) => (
          <Box key={index} bg={msg.sender === user.uid ? "teal.500" : "gray.500"} color="white" p="2" borderRadius="md">
            <Text>{msg.message}</Text>
          </Box>
        ))}
      </VStack>
      <HStack mt="4">
        <Textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <IconButton
          aria-label="Send message"
          icon={<IoPaperPlane />}
          onClick={handleSendMessage}
        />
      </HStack>
    </Box>
  );
};

export default Chat;
