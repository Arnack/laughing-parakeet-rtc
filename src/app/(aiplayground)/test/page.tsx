'use client'

import React, { use, useEffect, useState } from 'react';


const Counter = () => { 
    
    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            // body: JSON.stringify(data) 
            });
        const t = response.json();
        console.log('t>>>>>>', t);
        
        return t;
    }

    return <div>
        <button onClick={() => postData('http://localhost:5000/api/getToken', { sessionName: 'test' })}>
            test1
        </button>
       <button onClick={() => postData('http://localhost:5000/api/sessions', { sessionName: 'test' })}>
            test2
        </button>
       <button onClick={() => postData('http://localhost:5000/api/sessions/session1/user/user1')}>
            http://localhost:5000/api/sessions/session1/user/user1
        </button>
    </div> 
}

export default Counter;
