import React from 'react';
import '../Form/InputField.css';

const InputField = ({ name, value, label, placeholder, onChange, required, type }) => {
  return (
    <div className="input-field-container">
      <label htmlFor={name} className="input-field-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={`input-field-input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
