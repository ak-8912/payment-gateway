"use client";

import { useEffect, useState } from "react";

import PaymentForm from "@/components/payment/PaymentForm";
import StatusScreen from "@/components/payment/StatusScreen";
import RetrySection from "@/components/payment/RetrySection";

import TransactionHistory from "@/components/history/TransactionHistory";

import { usePaymentStore } from "@/store/paymentStore";
import { Transaction } from "@/types/payment";
import { usePayment } from "@/hooks/usePayment";

export default function HomePage() {
  const {
    status,
    attempts,
    history,
    setStatus,
    addTransaction,
    transactionId,
    setHistory,
  } = usePaymentStore();

  const { retryPayment } = usePayment();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("transactions");

    if (stored) {
      const parsed: Transaction[] = JSON.parse(stored);

      // parsed.forEach((tx) => addTransaction(tx));
      setHistory(parsed);
    }
  }, [addTransaction]);

  // Save history
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(history));
  }, [history]);

  // Add latest transaction to history
  useEffect(() => {
    if (status === "SUCCESS" || status === "FAILED" || status === "TIMEOUT") {
      if (!transactionId) return;

      const transaction: Transaction = {
        id: transactionId,
        amount: 0,
        status,
        timestamp: Date.now(),
        attempts,
      };

      addTransaction(transaction);
    }
  }, [status, attempts, transactionId, addTransaction]);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Payment Gateway</h1>

          <p className="text-gray-600 mt-2">
            Simulated payment flow using Next.js
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <PaymentForm />

            <StatusScreen status={status} />

            {(status === "FAILED" || status === "TIMEOUT") && (
              <RetrySection attempts={attempts} onRetry={retryPayment} />
            )}

            {(status === "SUCCESS" ||
              status === "FAILED" ||
              status === "TIMEOUT") && (
              <button
                onClick={() => setStatus("IDLE")}
                className="mt-4 w-full rounded-lg border py-3"
              >
                Start New Payment
              </button>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Transaction History</h2>
            </div>

            <TransactionHistory
              transactions={history}
              onSelect={(tx) => setSelectedTransaction(tx)}
            />
          </div>
        </div>

        {selectedTransaction && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Transaction ID:</span>{" "}
                {selectedTransaction.id}
              </p>

              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedTransaction.status}
              </p>

              <p>
                <span className="font-medium">Attempts:</span>{" "}
                {selectedTransaction.attempts}
              </p>

              <p>
                <span className="font-medium">Timestamp:</span>{" "}
                {new Date(selectedTransaction.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
