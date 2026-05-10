"use client";

import { Transaction } from "@/types/payment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  transaction: Transaction;
  onClick: () => void;
}

export default function TransactionItem({ transaction, onClick }: Props) {
  const currencySymbol = transaction.currency === "USD" ? "$" : "₹";

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="h-auto w-full justify-start p-4 text-left"
    >
      <div className="w-full">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium">
              {currencySymbol} {transaction.amount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {transaction.cardholderName || "Unknown cardholder"}
            </p>
          </div>

          <Badge variant="outline">{transaction.status}</Badge>
        </div>

        <p className="mt-2 break-all text-xs text-muted-foreground">
          {transaction.id}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {new Date(transaction.timestamp).toLocaleString()}
        </p>
      </div>
    </Button>
  );
}
