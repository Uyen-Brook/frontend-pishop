// Select.tsx
import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  placeholder?: string;
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = "",
  placeholder = "-- Chọn --",
}) => {
  return (
    <div className={`mb-6 flex items-center justify-center ${className}`}>
      <select
        className="mb-3 flex items-center justify-center text-sm font-bold text-gray-600 me-2 hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
