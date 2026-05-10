"use client";

import { Transaction } from "@/types/payment";

interface Props {
  transaction: Transaction;
  onClick: () => void;
}

export default function TransactionItem({ transaction, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border p-4 text-left hover:bg-gray-50 transition"
    >
      <div className="flex justify-between">
        <p className="font-medium">₹ {transaction.amount}</p>

        <span className="text-sm">{transaction.status}</span>
      </div>

      <p className="text-xs text-gray-500 mt-2 break-all">{transaction.id}</p>

      <p className="text-xs text-gray-400 mt-1">
        {new Date(transaction.timestamp).toLocaleString()}
      </p>
    </button>
  );
}
