export type CardType = "VISA" | "MASTERCARD" | "AMEX" | "UNKNOWN";

export interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface CardValidationErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export interface CardPreviewProps {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cardType: CardType;
}

export interface CardInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
}

export interface DetectedCard {
  type: CardType;
  cvvLength: number;
  cardNumberLength: number;
}
