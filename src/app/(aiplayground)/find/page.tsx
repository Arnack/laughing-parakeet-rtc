'use client'

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '@/service/firebase/firebaseConfig';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  Heading,
  Text,
} from "@chakra-ui/react";

const Find = () => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const searchUsers = async () => {
    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('description', '>=', searchText), where('description', '<=', searchText + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    let usersList: any[] = [];
    querySnapshot.forEach((doc) => {
      usersList.push(doc.data());
    });
    setUsers(usersList);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Find Users</Heading>
      <FormControl>
        <FormLabel>Search</FormLabel>
        <Input type="text" placeholder="Enter text..." value={searchText} onChange={handleSearchChange} />
      </FormControl>
      <Button mt={2} onClick={searchUsers}>Search</Button>
      <SimpleGrid columns={3} spacing={10} mt={5}>
        {users.map((user, index) => (
          <Box key={index} bg="teal.500" color="white" p="5" borderRadius="md">
            <Text>{user.displayName}</Text>
            <Text>{user.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Find;
