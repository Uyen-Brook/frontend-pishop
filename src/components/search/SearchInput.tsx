// SearchInput.tsx
import React from "react";
import { FiSearch } from "react-icons/fi";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center rounded-full border border-gray-300 bg-white px-3 py-2 shadow-sm transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-gray-700 dark:bg-navy-900 ${className}`}
    >
      <FiSearch className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-300" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none dark:text-white dark:placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchInput;
