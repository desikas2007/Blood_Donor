"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[13px] font-medium text-dark mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full h-10 px-3 border rounded-md text-[14px] text-dark bg-white
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
            disabled:bg-surface disabled:text-muted
            transition-colors duration-150
            ${error ? "border-red-500" : "border-border"}
            ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
