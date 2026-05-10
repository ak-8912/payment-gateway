"use client";

import { Transaction } from "@/types/payment";
import TransactionItem from "./TransactionItem";

interface Props {
  transactions: Transaction[];
  onSelect?: (transaction: Transaction) => void;
}

export default function TransactionHistory({ transactions, onSelect }: Props) {
  if (!transactions.length) {
    return (
      <div className="rounded-xl border p-6 text-center text-gray-500">
        No transactions yet.
      </div>
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
