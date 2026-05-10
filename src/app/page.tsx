"use client";

import { useEffect, useState } from "react";

import PaymentForm from "@/components/payment/PaymentForm";
import StatusScreen from "@/components/payment/StatusScreen";
import RetrySection from "@/components/payment/RetrySection";

import TransactionHistory from "@/components/history/TransactionHistory";

import { usePaymentStore } from "@/store/paymentStore";
import { Transaction } from "@/types/payment";
import { usePayment } from "@/hooks/usePayment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  const {
    status,
    attempts,
    history,
    paymentDetails,
    failureReason,
    resetPayment,
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
  }, [setHistory]);

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
        amount: paymentDetails?.amount ?? 0,
        currency: paymentDetails?.currency ?? "INR",
        cardholderName: paymentDetails?.cardholderName,
        failureReason: failureReason ?? undefined,
        status,
        timestamp: Date.now(),
        attempts,
      };

      addTransaction(transaction);
    }
  }, [
    status,
    attempts,
    transactionId,
    paymentDetails,
    failureReason,
    addTransaction,
  ]);

  return (
    <main className="min-h-screen bg-muted px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold">Payment Gateway</h1>

        <Tabs defaultValue="payment" className="gap-4">
          <TabsList className="w-full justify-start sm:w-fit">
            <TabsTrigger value="payment" className="min-w-28">
              Payment
            </TabsTrigger>
            <TabsTrigger value="history" className="min-w-28">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <Card>
              <CardContent className="p-6">
                <PaymentForm />

                <StatusScreen
                  status={status}
                  reason={failureReason ?? undefined}
                />

                {(status === "FAILED" || status === "TIMEOUT") && (
                  <RetrySection attempts={attempts} onRetry={retryPayment} />
                )}

                {(status === "SUCCESS" ||
                  status === "FAILED" ||
                  status === "TIMEOUT") && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetPayment}
                    className="mt-4 h-11 w-full text-sm"
                  >
                    Start New Payment
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>

                <CardContent>
                  <TransactionHistory
                    transactions={history}
                    onSelect={(tx) => setSelectedTransaction(tx)}
                  />
                </CardContent>
              </Card>

              {selectedTransaction && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm">
                    <Separator />

                    <p>
                      <span className="font-medium">Cardholder:</span>{" "}
                      {selectedTransaction.cardholderName || "Unknown"}
                    </p>

                    <p>
                      <span className="font-medium">Transaction ID:</span>{" "}
                      {selectedTransaction.id}
                    </p>

                    <p>
                      <span className="font-medium">Amount:</span>{" "}
                      {selectedTransaction.currency === "USD" ? "$" : "₹"}{" "}
                      {selectedTransaction.amount}
                    </p>

                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {selectedTransaction.status}
                    </p>

                    {selectedTransaction.failureReason && (
                      <p>
                        <span className="font-medium">Reason:</span>{" "}
                        {selectedTransaction.failureReason}
                      </p>
                    )}

                    <p>
                      <span className="font-medium">Attempts:</span>{" "}
                      {selectedTransaction.attempts}
                    </p>

                    <p>
                      <span className="font-medium">Timestamp:</span>{" "}
                      {new Date(selectedTransaction.timestamp).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
