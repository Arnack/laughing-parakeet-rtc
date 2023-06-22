'use client'

import React from 'react';
import TimeSlot from './TimeSlot';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat', 'Sun'];
const timeSlots = ['08:00', '09:00', '10:00', '11:00'];

function TimeTable() {
  function handleTimeSlotClick(time) {
    alert(`You clicked ${time}`);
  }

  return (
    <div className="container">
      <div className="row"> 
        {daysOfWeek.map((day) => (
          <div key={day} className="col">
            <strong className='m-2'>{day}</strong>
            {timeSlots.map((time) => (
              <TimeSlot key={time} time={time} onClick={() => handleTimeSlotClick(time)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeTable;
