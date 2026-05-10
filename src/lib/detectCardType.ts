import { CardType } from "@/types/card";

export const detectCardType = (number: string): CardType => {
  if (/^4/.test(number)) return "VISA";
  if (/^5[1-5]/.test(number)) return "MASTERCARD";
  if (/^3[47]/.test(number)) return "AMEX";
  return "UNKNOWN";
};
