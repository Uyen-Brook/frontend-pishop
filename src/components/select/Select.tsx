// Select.tsx
import React from 'react';

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
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = '',
  placeholder = '-- Chọn --',
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <select
        disabled={disabled}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className={`
          h-12
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          text-sm
          text-gray-700
          outline-none
          transition-all

          focus:border-red-400
          focus:ring-2
          focus:ring-red-100

          dark:border-white/10
          dark:bg-white/5
          dark:text-white

          ${
            disabled
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer'
          }
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;