export type PaymentStatus =
  | "IDLE"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "TIMEOUT";

export interface PaymentPayload {
  id: string;
  amount: number;
  currency: "INR" | "USD";
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: PaymentStatus;
  timestamp: number;
  attempts: number;
}
