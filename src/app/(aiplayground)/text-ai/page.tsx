'use client';

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Textarea,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    UnorderedList,
    ListItem,
    IconButton,
    Container,
    Collapse,
  } from "@chakra-ui/react";
  import { DeleteIcon } from "@chakra-ui/icons";
import localForage from "localforage";

interface IMessage {
    message: string;
    response: any;
};

const Test = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [temperature, setTemperature] = useState(0.9);
  const [history, setHistory] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState<Array<boolean>>([]);

  const toggleContent = (index: number) => {
    const newShowContent = [...showContent];
    newShowContent[index] = !newShowContent[index];
    setShowContent(newShowContent);
  };

   // Используйте useDisclosure для управления видимостью модального окна
   const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function loadHistory() {
      const storedHistory: any = await localForage.getItem("history");
      if (storedHistory) {
        setHistory(storedHistory);
      }
    }

    loadHistory();
  }, []);

  const saveToHistory = async (item: { message: string; response: any; }) => {
    const newHistory = [...history, item];
    await localForage.setItem("history", newHistory);
    setHistory(newHistory);
  };

  const removeFromHistory = async (index: number) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    await localForage.setItem("history", updatedHistory);
  };

    const handleSentMessegeToOpenAI = async () => {
        setLoading(true);
        const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 2000,
                temperature: temperature,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                // model: "text-davinci-003",
                // stop: ["\n", " Human:", " AI:"],
            }),
        });
        const data = await response.json();
        console.log('data>>>>', data);
        setResponse(data?.choices[0]?.text);
        setLoading(false);

        // сохранение запроса в истории
        saveToHistory({ message, response: data?.choices[0]?.text });
    };


    const handleSentMessageToChatGPT = async () => {
        setLoading(true);
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": message}],
                "temperature": temperature,
                max_tokens: 3800,
            }),
        });
        const data = await response.json();
        console.log('data>>>>', data);
        setResponse(data?.choices[0]?.message?.content);
        setLoading(false);

        // сохранение запроса в истории
        saveToHistory({ message, response: data?.choices[0]?.message?.content });
    };

    const handleSentMessageToChatGPT4 = async () => {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
            },
            body: JSON.stringify({
                "model": "gpt-4-0314",
                "messages": [{"role": "user", "content": message}],
                "temperature": temperature,
                max_tokens: 4000,
            }),
        });
        const data = await response.json();
        console.log('data>>>>', data);
        setResponse(data?.choices[0]?.message?.content);


        // сохранение запроса в истории
        saveToHistory({ message, response: data?.choices[0]?.message?.content });
    };

    const handleStreamingChatCompletion = async () => {
        setLoading(true);
        setResponse("");
        let stringResponse = "";
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_KEY,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            temperature: temperature,
            stream: true,
          }),
        });
      
        const reader = response?.body?.getReader();
        const decoder = new TextDecoder("utf-8");
      
        let jsonBuffer = "";
        while (true) {
          // @ts-ignore
          const { value, done } = await reader?.read();
          if (done) {
            break;
          }
          const chunk = decoder.decode(value, { stream: true });
          
          const dataStartIndex = chunk.indexOf("data:");
          if (dataStartIndex !== -1) {
            jsonBuffer += chunk.slice(dataStartIndex + 5);
            const lastNewLineIndex = jsonBuffer.lastIndexOf("\n");
      
            if (lastNewLineIndex !== -1) {
              const completeJsonData = jsonBuffer.slice(0, lastNewLineIndex);
              jsonBuffer = jsonBuffer.slice(lastNewLineIndex + 1);
      
              try {
                const parsedData = JSON.parse(completeJsonData);
                const usefulContent = parsedData?.choices[0]?.delta?.content;

                setResponse((prev) => prev + usefulContent);
                stringResponse += usefulContent;

              } catch (error) {
                console.error("Error parsing JSON data:", error);

                const contentRegex = /"delta":{.*?"content":"(.*?)"}/;
                const contentMatch = contentRegex.exec(completeJsonData);
                if (contentMatch) {
                    const usefulContent = contentMatch[1];
                    console.log("usefulContent>>>", usefulContent);
                    
                    setResponse((prev) => prev + usefulContent);
                    stringResponse += usefulContent;
                } else {
                    console.error("Unable to extract content using regex");
                }
              }
            }
          }
        }
      
        setLoading(false);
        saveToHistory({ message, response: stringResponse });
      };
      
      
    
    return (
        <Container>
        <Box>
            <Heading as="h1" mb={4}>
                Try open AI text model
            </Heading>

            <HStack spacing={4}>
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите ваше сообщение"
                    size="md"
                    resize="none"
                    minH="80px"
                    mb={4}
                />
                
                <VStack alignItems="center">
                    <Slider
                        orientation="vertical"
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={temperature}
                        onChange={(val) => setTemperature(val)}
                        size="md"
                        height={18}
                        mt={-6}
                    >
                        <SliderTrack>
                        <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <span style={{width: '25px'}}>{temperature}</span>
                </VStack>
            </HStack>


          <VStack spacing={4}>
            <HStack spacing={4}>
              <Button isDisabled={loading} onClick={handleSentMessegeToOpenAI}>Send to Davinci</Button>
              {/* <Button isDisabled={loading} onClick={handleSentMessageToChatGPT}>Send to ChatGPT</Button> */}
              <Button isDisabled={loading} onClick={handleStreamingChatCompletion}>Ask ChatGPT</Button>

              {/* <Button onClick={handleSentMessageToChatGPT4} disabled={true}>Send to ChatGPT4</Button> */}
            </HStack>
            <Box borderTop="1px solid" borderColor="gray.300" pt={4} width="100%">
              <Text
                style={{ maxHeight: "300px", overflow: "auto" }}
              >
                {response}
                </Text>
            </Box>

            <HStack spacing={4}>
                <Button onClick={onOpen}>Просмотр истории</Button>
                <Button isDisabled={!response.length} onClick={() => setResponse('')}>Очистить</Button>
            </HStack>


            {/* Код модального окна */}
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>История запросов</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <UnorderedList spacing={4}>
                        {history.map((item, index) => (
                        <ListItem key={"hist" + index}>
                            <Box fontWeight="bold"
                                style={{ display: showContent[index] ? "block" : "none", cursor: "pointer" }}
                                onClick={() => toggleContent(index)}
                            >
                                Запрос:
                            </Box>
                            <Box
                                onClick={() => toggleContent(index)}
                                style={{ cursor: "pointer" }}
                            >
                                <Text>{item.message} </Text>
                                <IconButton
                                    aria-label="Удалить из истории"
                                    icon={<DeleteIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromHistory(index);
                                    }}
                                    variant="ghost"
                                    style={{ float: "right" }}
                                    size="xs"
                                    ml={2}
                                    mt={-6}
                                />
                            </Box>
                            
                            <Collapse in={showContent[index]}>
                                <Box fontWeight="bold">Ответ:</Box>
                                <Text>{item.response}</Text>
                            </Collapse>
                            
                        </ListItem>
                        ))}
                    </UnorderedList>
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Закрыть
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
          </VStack>
        </Box>
        </Container>
      );
    };
    
    export default Test;
