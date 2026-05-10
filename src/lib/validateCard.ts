import { CardType } from "@/types/card";

export const validateCardNumber = (num: string) => {
  const digits = num.replace(/\s/g, "");

  if (!/^\d+$/.test(digits)) return false;
  if (/^3[47]/.test(digits)) return digits.length === 15;

  return digits.length === 16;
};

export const validateExpiry = (expiry: string) => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  const [month, year] = expiry.split("/").map(Number);
  if (!month || !year || month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(2000 + year, month);

  return expiryDate > now;
};

export const validateCVV = (cvv: string, type: CardType) => {
  if (type === "AMEX") return /^\d{4}$/.test(cvv);
  return /^\d{3}$/.test(cvv);
};
