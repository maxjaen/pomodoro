import React, { useState } from 'react';
import './text-field.scss';

type TextFieldProperties = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
};

export const TextField: React.FC<TextFieldProperties> = ({ label, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className="text-field">
      {label && <label className="text-field-label">{label}</label>}
      <input className="text-field-input" type="text" placeholder={placeholder} value={inputValue} onChange={handleChange} />
    </div>
  );
};
