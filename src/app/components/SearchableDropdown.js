"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';

export default function SearchableDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Filter...",
  className = "",
  ariaLabel = "Filter dropdown"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = useMemo(() => 
    options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [options, searchTerm]
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
    setFocusedIndex(-1);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    onChange(option);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            handleOptionClick(filteredOptions[focusedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-2 py-1 pr-8 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            aria-label="Clear filter"
            tabIndex={0}
          >
            ×
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-zinc-400"
          aria-label="Toggle dropdown"
          tabIndex={-1}
        >
          ▼
        </button>
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div 
          className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded shadow-lg max-h-40 overflow-y-auto"
          role="listbox"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={`px-2 py-1 text-xs cursor-pointer ${
                index === focusedIndex 
                  ? 'bg-blue-100 dark:bg-blue-900' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={searchTerm === option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
