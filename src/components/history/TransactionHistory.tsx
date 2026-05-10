"use client";

import { Transaction } from "@/types/payment";
import TransactionItem from "./TransactionItem";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  transactions: Transaction[];
  onSelect?: (transaction: Transaction) => void;
}

export default function TransactionHistory({ transactions, onSelect }: Props) {
  if (!transactions.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No transactions yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onClick={() => onSelect?.(transaction)}
        />
      ))}
    </div>
  );
}
