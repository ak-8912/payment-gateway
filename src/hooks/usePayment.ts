"use client";

import { PaymentFormPayload, PaymentPayload } from "@/types/payment";
import { usePaymentStore } from "@/store/paymentStore";

interface GatewayResponse {
  status: "SUCCESS" | "FAILED" | "TIMEOUT";
  reason?: string;
}

const friendlyNetworkError =
  "We could not reach the payment gateway. Please check your connection and try again.";

const timeoutReason =
  "The gateway took too long to respond. Please try again.";

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const usePayment = () => {
  const {
    setStatus,
    incrementAttempts,
    attempts,
    transactionId,
    setTransactionId,
    currentPayload,
    setCurrentPayload,
    setFailureReason,
  } = usePaymentStore();

  const makePayment = async (payload: PaymentPayload) => {
    if (!transactionId) {
      setTransactionId(payload.id);
    }

    setCurrentPayload(payload);
    setFailureReason(null);
    incrementAttempts();
    setStatus("PROCESSING");

    const controller = new AbortController();
    const startedAt = Date.now();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 6000);

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      clearTimeout(timeout);

      const data = (await response.json()) as GatewayResponse;
      const elapsed = Date.now() - startedAt;

      if (elapsed < 2000) {
        await wait(2000 - elapsed);
      }

      if (data.status === "SUCCESS") {
        setStatus("SUCCESS");
      } else {
        setFailureReason(data.reason || "Your payment was declined.");
        setStatus("FAILED");
      }

      return data;
    } catch (error) {
      clearTimeout(timeout);

      const elapsed = Date.now() - startedAt;

      if (elapsed < 2000) {
        await wait(2000 - elapsed);
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        setFailureReason(timeoutReason);
      } else {
        setFailureReason(friendlyNetworkError);
      }

      setStatus("TIMEOUT");
    }
  };

  const pay = async (payload: PaymentFormPayload) => {
    const id = crypto.randomUUID();
    const paymentPayload: PaymentPayload = { ...payload, id };

    setTransactionId(id);

    return makePayment(paymentPayload);
  };

  const retryPayment = async () => {
    if (attempts >= 3 || !currentPayload) return;

    return makePayment(currentPayload);
  };

  return {
    pay,
    retryPayment,
    attempts,
  };
};
