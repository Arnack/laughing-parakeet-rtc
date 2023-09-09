import React, { useState } from 'react';
import styles from './AutoComplete.module.scss';

const AutoComplete = ({ options, onOptionSelect, placeholder }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (event: any) => {
    const userInput = event.currentTarget.value;

    // Filter our options that don't contain the user's input
    const newFilteredOptions = options.filter(
      (option: any) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInputValue(userInput);
    setFilteredOptions(newFilteredOptions);
  };

  const handleClick = (option: any) => {
    setInputValue(option);
    setFilteredOptions([]);
    onOptionSelect(option);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder ? placeholder : 'Select language'}
        value={inputValue}
        onChange={handleChange}
        style={{
        //   width: '20%',
          float: 'left',
          padding: '0px 10px',
          backgroundColor: '#ffffff',
          color: '#000000',
          border: '1px solid #ced4da',
          height: '60px',
        }}
      />
      <ul className={styles.dropdown}>
        {filteredOptions.map((option, i) => (
          <li key={option} className={styles.dropdownItem} onClick={() => handleClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
