import React from 'react';

export function Input({ value, onChange, type = "text", ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="input-field"
      {...props}
    />
  );
}
