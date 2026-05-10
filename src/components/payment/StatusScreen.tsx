"use client";

import { PaymentStatus } from "@/types/payment";

interface Props {
  status: PaymentStatus;
  reason?: string;
}

export default function StatusScreen({ status, reason }: Props) {
  if (status === "IDLE") return null;

  return (
    <div className="rounded-xl border p-6 text-center mt-6">
      {status === "PROCESSING" && (
        <>
          <div className="animate-spin mx-auto mb-4 h-10 w-10 rounded-full border-4 border-gray-300 border-t-black" />
          <h2 className="text-xl font-semibold">Processing Payment...</h2>
        </>
      )}

      {status === "SUCCESS" && (
        <>
          <h2 className="text-2xl font-bold text-green-600">
            Payment Successful
          </h2>

          <p className="mt-2 text-gray-600">
            Your transaction completed successfully.
          </p>
        </>
      )}

      {status === "FAILED" && (
        <>
          <h2 className="text-2xl font-bold text-red-500">Payment Failed</h2>

          <p className="mt-2 text-gray-600">
            {reason || "Something went wrong"}
          </p>
        </>
      )}

      {status === "TIMEOUT" && (
        <>
          <h2 className="text-2xl font-bold text-yellow-600">
            Request Timed Out
          </h2>

          <p className="mt-2 text-gray-600">Slow network or gateway timeout.</p>
        </>
      )}
    </div>
  );
}
