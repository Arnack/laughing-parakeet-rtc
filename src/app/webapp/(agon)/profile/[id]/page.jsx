'use client'

import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '@/service/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import TimeTable from './_components/TimeTable';

const UserProfile = () => {
    const router = useRouter();
    // console.log('router>>>>', router);
    // const { id } = router.query;
    const id = location.pathname.split('/').pop();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const docRef = doc(db, 'users', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        }

        fetchUser();
    }, [id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    // inside the UserProfile component:

    return (
        <>

<section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-12 col-xl-9">
            <div className="card" style={{border: 'none'}}>
              <div className="rounded-top text-white d-flex flex-row bg-gray-100" style={{  height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} /> */}
                  <img src={user.photoURL} alt={user.displayName} className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>{user.displayName}</h5>
                  <p style={{color: "black"}}>{user.services}</p>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">5.0</p>
                    <p className="small text-muted mb-0">Rating</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">12</p>
                    <p className="small text-muted mb-0">TotalmSessions</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">{user.rates}</p>
                    <p className="small text-muted mb-0">Rate</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <p className="font-italic mb-1">{user.description}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 mt-20">
                  <p className="lead fw-normal mb-0">Schedule</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">Choose the time for your first lesson. The timings are displayed in your local timezone.</a>
                  </p>
                </div>
                <TimeTable />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    {/* --------------------- */}


            {/* <div className="banner-hero banner-breadcrums bg-gray-100 ">
                <h3>{user.displayName} profile</h3>
            </div>
            <div className='container'
                style={{
                    marginTop: '30px',
                    marginBottom: '30px',
                }}
            >


                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={user.photoURL} className="card-img" alt={user.displayName} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{user.displayName}</h5>
                                <p className="card-text"><strong>Description:</strong> {user.description}</p>
                                <p className="card-text"><strong>Position:</strong> {user.position}</p>
                                <p className="card-text"><strong>Education:</strong> {user.education}</p>
                                <p className="card-text"><strong>Experience:</strong> {user.experience}</p>
                                <p className="card-text"><strong>Languages:</strong> {user.languages}</p>
                                <p className="card-text"><strong>Rates:</strong> {user.rates}</p>
                                <p className="card-text"><strong>Services:</strong> {user.services}</p>
                                <p className="card-text"><small className="text-muted">Contact: {user.email}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );

};

UserProfile.getInitialProps = async (context) => {
    const { id } = context.query;
    return { id };
};

export default UserProfile;
