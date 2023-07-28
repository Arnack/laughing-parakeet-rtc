'use client'

import React, { useState, useEffect, FC } from 'react';
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from './_style.module.scss';


const ConsultantItem: FC = ({ user }: any) => {
    return (
        <>
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
                                    <div className="flex-grow-1 ms-3" style={{ maxWidth: "40%" }}>
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
                                            <Link href={`/webapp/profile/${user.uid}`}>
                                                <button type="button" className={styles.primaryBtn2}>
                                                    Book
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultantItem;