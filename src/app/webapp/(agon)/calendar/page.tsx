'use client'

import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Heading } from "@chakra-ui/react";

const Calendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [businessHours, setBusinessHours] = useState<any[]>([]);

  // Example event
  useEffect(() => {
    setEvents([
      { title: 'Event 1', start: new Date() }
    ]);
  }, []);

  const handleEventClick = (clickInfo: any) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  const handleSelect = (selectInfo: any) => {
    let title = 'Available';
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // clear date selection
  
    if (title) {
      calendarApi.addEvent({
        id: Math.floor(Math.random() * 100000) + 1, // we should use more unique id for this
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      
      // Update business hours
      setBusinessHours([
        ...businessHours,
        {
          daysOfWeek: [new Date(selectInfo.startStr).getDay()], 
          startTime: selectInfo.startStr.split('T')[1], 
          endTime: selectInfo.endStr.split('T')[1]
        }
      ]);
    }
  };
  

//   const handleSelect = (selectInfo: any) => {
//     let title = prompt('Please enter a new title for your event');
//     let calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: Math.floor(Math.random() * 100000) + 1, // we should use more unique id for this
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       });
//     }
//   };

//   const businessHours = [{
//     daysOfWeek: [ 1, 2, 3, 4, 5 ],
//     startTime: '08:00',
//     endTime: '11:00',
//   }, {
//     daysOfWeek: [ 1, 2, 3, 4, 5 ],
//     startTime: '13:00',
//     endTime: '17:00',
//   }]

  return (
    <div className="container">
      <Box w="100%" h="100%" p="5">

        <Heading mb={5}>Ajust Availability</Heading>
            <FullCalendar
              plugins={[ timeGridPlugin, interactionPlugin ]}
              initialView="timeGridWeek"
              allDaySlot={false}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              events={events}
              select={handleSelect}
              eventClick={handleEventClick}
              businessHours={businessHours}
              />
      </Box>
    </div>
  );
};

export default Calendar;
