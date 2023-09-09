'use client'

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '@/service/firebase/firebaseConfig';
import styles from './_style.module.scss';
import ConsultantItem from './_components/ConsultantItem';
import AutoComplete from './_components/autocomplete/AutoComplete';


const FindLangTutor = () => {
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 2, max: 200 }); // example range
  const [users, setUsers] = useState([]);

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Russian', 'Ukrainian', 'Mandarin'];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleLanguageChange = (selected) => {
    setLanguage(selected[0]);
  };

  const handlePriceChange = (key) => (event) => {
    setPriceRange(prevRange => ({ ...prevRange, [key]: event.target.value }));
  };

  const searchUsers = async () => {
    // const usersCol = collection(db, 'users');
    // const q = query(usersCol, where('rates', '>=', priceRange.min));

    // const querySnapshot = await getDocs(q);
    // let usersList = [];
    // querySnapshot.forEach((doc) => {
    //   let user = doc.data();
    //   // if (user.language.split(", ").includes(language.toLocaleLowerCase) || true) {
    //     usersList.push(user);
    //   // }
    // });
    // console.log('usersList>>>', usersList);
    // setUsers(usersList);



    const usersCol = collection(db, 'users');
    const q = query(usersCol, where('description', '>=', searchText), where('description', '<=', searchText + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    let usersList = [];
    querySnapshot.forEach((doc) => {
      usersList.push(doc.data());
    });
    setUsers(usersList);
  };

  return (
    <>
      <section className="section-box">
        <div className="banner-hero banner-breadcrums bg-gray-100">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-12">
                <h3 className="text-display-3 color-gray-900 mb-20">Private tutors that fit your needs</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-12">
              <div className="input-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Search by keywords"
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{
                    width: '20%',
                    float: 'left',
                    padding: '0px 10px',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '1px solid #ced4da',
                  }}
                />
                <AutoComplete
                  options={languages}
                  onOptionSelect={setLanguage}
                />
                <input
                  type="number"
                  min="0"
                  placeholder='Min Price'
                  value={priceRange.min}
                  onChange={handlePriceChange('min')}
                  style={{
                    width: '20%',
                    float: 'left',
                    padding: '0px 10px',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '1px solid #ced4da',
                    height: '60px',
                  }}
                />
                <input
                  type="number"
                  min="0"
                  placeholder='Max Price'
                  value={priceRange.max}
                  onChange={handlePriceChange('max')}
                  style={{
                    width: '20%',
                    float: 'left',
                    padding: '0px 10px',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '1px solid #ced4da',
                    height: '60px',
                  }}
                />
                <button
                  className={`btn btn-green-900 ${styles['search-button']}`}
                  onClick={searchUsers}
                  style={{
                    padding: '0px 22px',
                    'border-top-right-radius': '0px',
                    'border-bottom-right-radius': '0px',
                    height: '60px',
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-12">
              {users.map((user, index) => (
                <ConsultantItem key={user.uid} user={user} />
              ))}

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FindLangTutor;