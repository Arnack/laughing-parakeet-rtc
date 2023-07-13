'use client'

import { useState } from 'react';

export default function BookedSessions() {
    const [sessions] = useState([
        {
            date: '21.06.2023',
            day: 'Monday',
            time: '09:00',
            user: 'Hamish O\'Brien',
            price: '$100',
            avatar: 'https://via.placeholder.com/150',
            completed: true
        },
        {
            date: '21.06.2023',
            day: 'Monday',
            time: '14:00',
            user: 'Hamish O\'Brien',
            price: '$200',
            avatar: 'https://via.placeholder.com/150',
            completed: false
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
        <div key={index} className="card mb-3 bg-gray-100" style={{border: 'none',
        width: "540px",
        float: "left",
        borderRadius: "18px",
        margin: "12px"}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={session.avatar} alt={session.user} className="img-fluid rounded-circle p-3" style={{width: '120px', height: '120px', objectFit: 'cover'}} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">
                  <strong className="text-muted">{session.day}, {session.date} at {session.time}</strong>
                </p>
                with <strong className="card-title">{session.user}</strong>
                <p className="card-text">{session.price}</p>
                {session.completed ? <p className="card-text text-success">Completed</p> :
                 <p className="card-text text-warning">Not completed</p>
                }
              </div>
            </div>
          </div>
        </div>
      ))}
        </div>
    </>
    );
}
