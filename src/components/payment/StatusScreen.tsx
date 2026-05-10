"use client";

import { useEffect, useRef } from "react";

import { PaymentStatus } from "@/types/payment";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  status: PaymentStatus;
  reason?: string;
}

export default function StatusScreen({ status, reason }: Props) {
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "IDLE") {
      statusRef.current?.focus({ preventScroll: true });
    }
  }, [status]);

  if (status === "IDLE") return null;

  return (
    <Card className="mt-6">
      <CardContent
        ref={statusRef}
        role={status === "PROCESSING" ? "status" : "alert"}
        tabIndex={-1}
        className="p-6 text-center outline-none"
      >
        {status === "PROCESSING" && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
            <h2 className="text-xl font-semibold">Processing Payment...</h2>
          </>
        )}

        {status === "SUCCESS" && (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful
            </h2>

            <p className="mt-2 text-muted-foreground">
              Your transaction completed successfully.
            </p>
          </>
        )}

        {status === "FAILED" && (
          <>
            <h2 className="text-2xl font-bold text-destructive">
              Payment Failed
            </h2>

            <p className="mt-2 text-muted-foreground">
              {reason || "Something went wrong"}
            </p>
          </>
        )}

        {status === "TIMEOUT" && (
          <>
            <h2 className="text-2xl font-bold text-yellow-600">
              Request Timed Out
            </h2>

            <p className="mt-2 text-muted-foreground">
              {reason || "Slow network or gateway timeout."}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
