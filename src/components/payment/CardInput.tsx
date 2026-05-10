"use client";

import { InputHTMLAttributes } from "react";

interface CardInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function CardInput({
  label,
  error,
  id,
  ...props
}: CardInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          w-full rounded-lg border px-4 py-3 outline-none transition
          ${error ? "border-red-500" : "border-gray-300"}
          focus:border-black
        `}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
