'use client'

import React, { useState, useEffect } from 'react';
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '@/service/firebase/firebaseConfig';
import styles from './_style.module.scss';


function ShopFrid1() {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const searchUsers = async () => {
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
                <h3 className="text-display-3 color-gray-900 mb-20">Find a Professional</h3>
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
                <input type="text" className={`form-control ${styles['search-input']}`} placeholder="Enter text..." value={searchText} onChange={handleSearchChange} />
                <button className={`btn btn-green-900 ${styles['search-button']}`}
                  onClick={searchUsers}
                  style={{ padding: '0px 22px' }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {users.map((user, index) => (
                <div className="container py-5 h-100">
                  <div className="row d-flex align-items-center h-100">
                    <div className="col col-md-8">
                      <div className="card" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4">
                          <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                              <Link href={`/webapp/profile/${user.uid}`}>
                                <img
                                  src={user.photoURL}
                                  alt="Generic placeholder image"
                                  className="img-fluid"
                                  style={{ width: '120px', borderRadius: '10px' }}
                                />
                              </Link>
                            </div>
                            <div className="flex-grow-1 ms-3" style={{maxWidth: "40%"}}>
                              <Link href={`/webapp/profile/${user.uid}`}>
                               <h5 className="mb-1">{user.displayName}</h5>
                              </Link>
                              <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                                {user.services}
                              </p>
                              <p>
                                {user.description}
                              </p>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <div
                                className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                style={{ backgroundColor: '#efefef' }}
                              >
                                <div>
                                  <p className="small text-muted mb-1">Rating</p>
                                  <p className="mb-0">5.0</p>
                                </div>
                                <div className="px-3">
                                  <p className="small text-muted mb-1">Sessions</p>
                                  <p className="mb-0">12</p>
                                </div>
                                <div>
                                  <p className="small text-muted mb-1">Rate</p>
                                  <p className="mb-0">{user.rates}</p>
                                </div>
                              </div>
                              <div className="d-flex pt-1">
                                <button type="button" className={styles.outlineButton2}>
                                  Message
                                </button>
                                <button type="button" className={styles.primaryBtn2}>
                                  Book
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                // <div key={index} className="card mb-4">
                //   <div className="row g-0">
                //     <div className="col-md-3">
                //       <img src={user.photoURL} className={`card-img ${styles['card-img']}`} alt={user.displayName} />
                //     </div>
                //     <div className="col-md-8">
                //       <div className="card-body">
                //         <Link href={`/webapp/profile/${user.uid}`}>
                //           <h5 className="card-title">{user.displayName}</h5>
                //         </Link>
                //         <p className="card-text">{user.description}</p>
                //         <p className="card-text"><strong>Position:</strong> {user.position}</p>
                //         <p className="card-text"><strong>Education:</strong> {user.education}</p>
                //         <p className="card-text"><strong>Experience:</strong> {user.experience}</p>
                //         <p className="card-text"><strong>Languages:</strong> {user.languages}</p>
                //         <p className="card-text"><strong>Rates:</strong> {user.rates}</p>
                //         <p className="card-text"><strong>Services:</strong> {user.services}</p>
                //         {/* <p className="card-text"><strong>Email:</strong> {user.email}</p> */}
                //       </div>
                //     </div>
                //   </div>
                // </div>
              ))}

            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ShopFrid1;