
import React, { useState } from "react";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
}

const FilterDropdown = ({
  options,
  value,
  onChange,
  label,
  className = "",
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-2 text-sm 
                  bg-white border border-gray-300 rounded-lg focus:outline-none"
      >
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2 text-gray-500" />
          <span>{value ? options.find(opt => opt.value === value)?.label || label : label}</span>
        </div>
        <div className="flex items-center">
          {value && (
            <X
              className="w-4 h-4 mr-1 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={handleClear}
            />
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 
                        ${value === option.value ? "bg-gray-100" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
