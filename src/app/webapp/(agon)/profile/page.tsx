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
    <div className="container py-5">
      <div className="d-flex flex-column gap-5">
        <h1>Profile</h1>
        <div className="box-profile">
        <div className="mb-3 form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className="form-control" value={userInfo.displayName || ''} onChange={(e) => setUserInfo({ ...userInfo, displayName: e.target.value })} />
        </div>

        {/* <div className="form-group">
          <input className="form-control" placeholder="Your email"
            type="email"  />
        </div> */}


        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" className="form-control" value={userInfo.description || ''} onChange={(e) => setUserInfo({ ...userInfo, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label htmlFor="position" className="form-label">Position</label>
          <input type="text" id="position" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="services" className="form-label">Services</label>
          <textarea id="services" className="form-control" value={services} onChange={(e) => setServices(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="experience" className="form-label">Experience</label>
          <textarea id="experience" className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="education" className="form-label">Education</label>
          <input type="text" id="education" className="form-control" value={education} onChange={(e) => setEducation(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="languages" className="form-label">Languages</label>
          <input type="text" id="languages" className="form-control" value={languages} onChange={(e) => setLanguages(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="rates" className="form-label">Rates</label>
          <input type="text" id="rates" className="form-control" value={rates} onChange={(e) => setRates(e.target.value)} />
        </div>
        <div className="col-md-12  form-group">
          <button className="btn btn-green-full text-heading-6" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>
        </div>
      </div>
    </div>
  );

};

export default Profile;
