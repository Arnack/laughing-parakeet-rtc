'use client'

import React, { useState } from 'react';

const Counter = () => { 
    const [count, setCount] = useState(0);

    function handleClick() {
        setTimeout(() => {
            setCount(count + 1);
        }, 1000);
    }

    return <div>
        <p>You clicked {count} times</p>
        <button onClick={handleClick}>Click me</button>
    </div> 
}

export default Counter;
