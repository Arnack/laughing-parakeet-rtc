import React, { useState, useRef } from 'react';

const DoubleRangeInput = ({ min, max, onChange }) => {
  const [values, setValues] = useState([min, max]);
  const rangeRef = useRef(null);

  const handleChange = (index) => (e) => {
    let newArray = [...values];
    newArray[index] = Number(e.target.value);
    if (index === 0) {
      if (newArray[0] > newArray[1]) newArray[1] = newArray[0];
    } else {
      if (newArray[1] < newArray[0]) newArray[0] = newArray[1];
    }
    setValues(newArray);
    onChange(newArray);
  };

  const getPercentage = (value) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={values[0]}
        onChange={handleChange(0)}
        style={{
          position: 'absolute',
          zIndex: 2,
          marginLeft: `${getPercentage(values[0])}%`,
          transform: 'translateX(-50%)',
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={values[1]}
        onChange={handleChange(1)}
        style={{
          position: 'absolute',
          zIndex: 1,
          marginLeft: `${getPercentage(values[1])}%`,
          transform: 'translateX(-50%)',
        }}
      />
      <div
        ref={rangeRef}
        style={{
          height: '1px',
          background: 'black',
          position: 'relative',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            background: 'blue',
            height: '1px',
            width: `${getPercentage(values[1]) - getPercentage(values[0])}%`,
            marginLeft: `${getPercentage(values[0])}%`,
          }}
        />
      </div>
    </div>
  );
};

export default DoubleRangeInput;
