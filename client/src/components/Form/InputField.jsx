import React from "react";
import "../Form/InputField.css";

const InputField = ({
  name,
  value,
  label,
  placeholder,
  onChange,
  required,
  type,
}) => {
  return (
    <div className="input-field-container">
      <label htmlFor={name} className="input-field-label">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={`input-field`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
