"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[13px] font-medium text-dark mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full h-10 px-3 border rounded-md text-[14px] text-dark placeholder:text-gray-400
            focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
            disabled:bg-surface disabled:text-muted
            transition-colors duration-150
            ${error ? "border-red-500" : "border-border"}
            ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
