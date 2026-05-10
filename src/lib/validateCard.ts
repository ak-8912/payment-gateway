export const validateCardNumber = (num: string) => {
  return num.replace(/\s/g, "").length >= 16;
};

export const validateExpiry = (expiry: string) => {
  const [month, year] = expiry.split("/").map(Number);
  if (!month || !year) return false;

  const now = new Date();
  const expiryDate = new Date(2000 + year, month);

  return expiryDate > now;
};

export const validateCVV = (cvv: string, type: string) => {
  if (type === "AMEX") return /^\d{4}$/.test(cvv);
  return /^\d{3}$/.test(cvv);
};
