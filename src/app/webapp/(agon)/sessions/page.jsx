'use client'

import { useState } from 'react';

export default function BookedSessions() {
    const [sessions] = useState([
        {
            date: '22.06.2023',
            time: '09:00',
            user: 'Hamish O\'Brien',
            price: '$100',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            date: '23.06.2023',
            time: '14:00',
            user: 'Hamish O\'Brien',
            price: '$200',
            avatar: 'https://via.placeholder.com/150'
        },
        // ... More sessions
    ]);

    return (<>
        <div className="banner-hero banner-breadcrums bg-gray-100 mt-15 mb-30">
            <div className="container">
                <h3>Booked Sessions</h3>
            </div>
        </div>
        <div className="container">

            {sessions.map((session, index) => (
                <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={session.avatar} alt={session.user} className="img-fluid rounded-start" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{session.user}</h5>
                                <p className="card-text">
                                    <small className="text-muted">{session.date} at {session.time}</small>
                                </p>
                                <p className="card-text">{session.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
}
