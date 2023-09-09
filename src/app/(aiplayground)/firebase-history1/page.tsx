'use client'

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Container,
  UnorderedList,
  ListItem,
  Collapse,
  IconButton,
  Text,
  Spinner
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import db from "@/service/firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, query, limit } from "firebase/firestore";

interface IMessage {
    id: string;
    message: string;
    response: any;
  }
  
  const HistoryPage = () => {
    const [history, setHistory] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showContent, setShowContent] = useState<Array<boolean>>([]);
  
    const toggleContent = (index: number) => {
      const newShowContent = [...showContent];
      newShowContent[index] = !newShowContent[index];
      setShowContent(newShowContent);
    };
  
    async function loadHistoryFromFirebase() {
        setLoading(true);
        try {
          const historyRef = collection(db, "history");
          const limitedQuery = query(historyRef, limit(108));
          const historySnapshot = await getDocs(limitedQuery);
          const historyData = historySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHistory(historyData as any);
        } catch (error) {
          console.error("Error loading history from Firebase:", error);
        } finally {
          setLoading(false);
        }
      }
  
      async function removeFromFirestore(id: string) {
        try {
          const docRef = doc(db, "history", id);
          await deleteDoc(docRef);
          loadHistoryFromFirebase();
        } catch (error) {
          console.error("Error removing document from Firestore:", error);
        }
      }
  
    useEffect(() => {
      loadHistoryFromFirebase();
    }, []);
  
    return (
      <Container>
        <Box>
          <Heading as="h1" mb={4}>
            История запросов
          </Heading>
          {loading && <Spinner size="xl" /> }
          <UnorderedList spacing={4}>
            {history.map((item, index) => (
              <ListItem key={"hist" + index}>
                <Box
                  fontWeight="bold"
                  style={{ display: showContent[index] ? "block" : "none", cursor: "pointer" }}
                  onClick={() => toggleContent(index)}
                >
                  Запрос:
                </Box>
                <Box
                  onClick={() => toggleContent(index)}
                  style={{ cursor: "pointer" }}
                >
                  <Text style={{ textDecoration: 'underline'}}>{item.message}</Text>
                  <IconButton
                    aria-label="Удалить из истории"
                    icon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFirestore(item.id);
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
        </Box>
      </Container>
    );
  };
  
  export default HistoryPage;
  