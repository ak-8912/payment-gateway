"use client";

import { Button } from "@/components/ui/button";

interface Props {
  attempts: number;
  maxAttempts?: number;
  onRetry: () => void;
  disabled?: boolean;
}

export default function RetrySection({
  attempts,
  maxAttempts = 3,
  onRetry,
  disabled,
}: Props) {
  const limitReached = attempts >= maxAttempts;

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        Attempt {attempts} of {maxAttempts}
      </p>

      {limitReached ? (
        <p className="font-medium text-destructive">
          Maximum retry attempts reached.
        </p>
      ) : (
        <Button
          type="button"
          disabled={disabled}
          onClick={onRetry}
          className="h-10 px-5 text-sm"
        >
          Retry Payment
        </Button>
      )}
    </div>
  );
}
