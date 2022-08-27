import React from 'react';

const Input = ({ type, id, name, label, placeholder, onChange, value, error }) => {
  return (
    <div className="my-3">
      <label htmlFor={label} className="block mb-2 text-sm font-medium text-neutral-800 first-letter:uppercase">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`block p-2 w-full text-neutral-900 bg-gray-50 rounded border ${
          error ? 'border-alert-600' : 'border-neutral-300'
        } shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50`}
      ></input>
      <p className="text-alert-600 min-h-[24px]">{error && `* ${error}`}</p>
    </div>
  );
};

export default Input;
