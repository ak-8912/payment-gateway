import { create } from "zustand";
import { PaymentStatus, Transaction } from "@/types/payment";

interface PaymentState {
  status: PaymentStatus;
  attempts: number;
  transactionId: string | null;
  history: Transaction[];

  setStatus: (status: PaymentStatus) => void;
  incrementAttempts: () => void;
  resetAttempts: () => void;
  setTransactionId: (id: string) => void;
  addTransaction: (tx: Transaction) => void;
  setHistory: (history: Transaction[]) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  status: "IDLE",
  attempts: 0,
  transactionId: null,
  history: [],

  setStatus: (status) => set({ status }),

  incrementAttempts: () => set((s) => ({ attempts: s.attempts + 1 })),

  resetAttempts: () => set({ attempts: 0 }),

  setTransactionId: (id) => set({ transactionId: id }),

  addTransaction: (tx: Transaction) =>
    set((s) => {
      const exists = s.history.find((item) => item.id === tx.id);

      if (exists) {
        return {
          history: s.history.map((item) => (item.id === tx.id ? tx : item)),
        };
      }

      return {
        history: [tx, ...s.history],
      };
    }),

  setHistory: (history) => set({ history }),
}));
