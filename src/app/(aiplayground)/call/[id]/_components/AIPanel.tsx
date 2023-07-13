'use client'

import React, { useEffect, useState } from 'react';
import { Box, VStack, Textarea, HStack, IconButton, Text, Button } from '@chakra-ui/react';
import { IoPaperPlane } from 'react-icons/io5';

interface IAIPanelProps {
  sessionText: string;
}

const AIPanel = ({ sessionText }: IAIPanelProps) => {
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translation, setTranslation] = useState('');

  const getSummary = async () => {
    setSummaryLoading(true);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
      },
      body: JSON.stringify({
        "model": "gpt-4-0314",
        "messages": [{ "role": "user", "content": "summirize the following text: \n" + sessionText }],
        "temperature": 0.8,
        max_tokens: 3800,
      }),
    });
    const data = await response.json();
    setSummary(data?.choices[0]?.message?.content);
    console.log('data>>>>>>', data);

    setSummaryLoading(false);

    const element = document.createElement("a");
    const file = new Blob([data?.choices[0]?.message?.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };


  const getTranslation = async (text: string) => {
    setIsTranslating(true);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
      },
      body: JSON.stringify({
        "model": "gpt-4-0314",
        "messages": [{ "role": "user", "content": "translate the following text into " + language + ": " + sessionText }],
        "temperature": 0.8,
        max_tokens: 3800,
      }),
    });
    const data = await response.json();
    setTranslation(data?.choices[0]?.message?.content);
    console.log('data>>>>>>', data);
    setIsTranslating(false);

    const element = document.createElement("a");
    const file = new Blob([data?.choices[0]?.message?.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "translation.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };



  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }


  return (
    <Box w="100%" h="100%" p="5" overflowY="auto" id="chat">
      <VStack spacing={3} align="stretch">
        <Box color="white" p="2" borderRadius="md">
          {/* <Text>{summary}</Text> */}
          <Button onClick={getSummary} isLoading={summaryLoading}>
            Get Session Summary
          </Button>

          <br />
          <br />
          <hr />
          <br />

          {/* dropdown to select a language */}
          <select onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>


          <Button
            onClick={() => getTranslation(sessionText)}
          >
            Get Session Translation
          </Button>


        </Box>
      </VStack>

    </Box>
  );
};

export default AIPanel;
