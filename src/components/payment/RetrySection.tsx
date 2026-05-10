"use client";

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
      <p className="text-sm text-gray-600">
        Attempt {attempts} of {maxAttempts}
      </p>

      {limitReached ? (
        <p className="text-red-500 font-medium">
          Maximum retry attempts reached.
        </p>
      ) : (
        <button
          disabled={disabled}
          onClick={onRetry}
          className="rounded-lg bg-black text-white px-5 py-3 disabled:opacity-50"
        >
          Retry Payment
        </button>
      )}
    </div>
  );
}
