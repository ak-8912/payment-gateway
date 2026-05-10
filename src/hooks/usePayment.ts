"use client";

import { PaymentPayload } from "@/types/payment";
import { usePaymentStore } from "@/store/paymentStore";

export const usePayment = () => {
  const {
    setStatus,
    incrementAttempts,
    attempts,
    transactionId,
    setTransactionId,
  } = usePaymentStore();

  const makePayment = async (
    payload: Partial<PaymentPayload>,
    existingTransactionId?: string
  ) => {
    const txId = existingTransactionId || transactionId || crypto.randomUUID();

    if (!transactionId) {
      setTransactionId(txId);
    }

    incrementAttempts();

    setStatus("PROCESSING");

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
      setStatus("TIMEOUT");
    }, 6000);

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          transactionId: txId,
        }),
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (data.status === "SUCCESS") {
        setStatus("SUCCESS");
      } else {
        setStatus("FAILED");
      }

      return data;
    } catch {
      setStatus("TIMEOUT");
    }
  };

  const pay = async (payload: Partial<PaymentPayload>) => {
    return makePayment(payload);
  };

  const retryPayment = async (payload: Partial<PaymentPayload> = {}) => {
    if (attempts >= 3) return;

    return makePayment(payload, transactionId || undefined);
  };

  return {
    pay,
    retryPayment,
    attempts,
  };
};
