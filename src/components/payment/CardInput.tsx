"use client";

import { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
      <Label htmlFor={id} className="text-foreground">
        {label}
      </Label>

      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("h-11 text-sm", error && "border-destructive")}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
