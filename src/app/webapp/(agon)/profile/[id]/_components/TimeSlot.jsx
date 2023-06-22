'use client'

import React from 'react';
import styles from './style.module.scss';

function TimeSlot({ time, onClick }) {
  return (
    <div className='mb-2'>
     <button className={styles.outlineButton2} onClick={onClick}>
      {time}
    </button>
    {/* <br /> */}
    </div>
   
  );
}

export default TimeSlot;
