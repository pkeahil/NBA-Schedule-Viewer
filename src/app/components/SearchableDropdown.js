"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function SearchableDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Filter...",
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full px-2 py-1 pr-8 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            ×
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-zinc-400"
        >
          ▼
        </button>
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded shadow-lg max-h-40 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="px-2 py-1 text-xs cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
