'use client'

import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "@/authContext";
import { getDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import db from "@/service/firebase/firebaseConfig";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [userInfo, setUserInfo] = useState<any>({});
  
  // New fields
  const [position, setPosition] = useState('');
  const [services, setServices] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [languages, setLanguages] = useState('');
  const [rates, setRates] = useState('');
  
  const fetchUserInfo = async () => {
    const docRef = doc(db, 'users', user!.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
      // Set values to existing data
      setPosition(docSnap.data().position);
      setServices(docSnap.data().services);
      setExperience(docSnap.data().experience);
      setEducation(docSnap.data().education);
      setLanguages(docSnap.data().languages);
      setRates(docSnap.data().rates);
    } else {
      // create document if it does not exist yet
      await setDoc(docRef, {
        uid: user?.uid,
        email: user?.email,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        // Additional fields
        position: '',
        services: '',
        experience: '',
        education: '',
        languages: '',
        rates: '',
      });
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateDoc(doc(db, 'users', user!.uid), {
        displayName: userInfo.displayName,
        description: userInfo.description,
        // Additional fields
        position: position,
        services: services,
        experience: experience,
        education: education,
        languages: languages,
        rates: rates,
      });
      toast({
        title: "Profile updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Box w="100%" h="100%" p="5">
      <VStack spacing={5}>
        <Heading>Profile</Heading>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" value={userInfo.displayName || ''} onChange={(e) => setUserInfo({...userInfo, displayName: e.target.value})} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Textarea value={userInfo.description || ''} onChange={(e) => setUserInfo({...userInfo, description: e.target.value})} />
        </FormControl>
        <FormControl id="position">
          <FormLabel>Position</FormLabel>
          <Input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
        </FormControl>
        <FormControl id="services">
          <FormLabel>Services</FormLabel>
          <Textarea value={services} onChange={(e) => setServices(e.target.value)} />
        </FormControl>
        <FormControl id="experience">
          <FormLabel>Experience</FormLabel>
          <Textarea value={experience} onChange={(e) => setExperience(e.target.value)} />
        </FormControl>
        <FormControl id="education">
          <FormLabel>Education</FormLabel>
          <Input type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
        </FormControl>
        <FormControl id="languages">
          <FormLabel>Languages</FormLabel>
          <Input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} />
        </FormControl>
        <FormControl id="rates">
          <FormLabel>Rates</FormLabel>
          <Input type="text" value={rates} onChange={(e) => setRates(e.target.value)} />
        </FormControl>
        <Button onClick={handleUpdateProfile} colorScheme="teal">
          Update Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
