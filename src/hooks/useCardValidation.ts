import { useState } from "react";
import { detectCardType } from "@/lib/detectCardType";
import {
  validateCardNumber,
  validateCVV,
  validateExpiry,
} from "@/lib/validateCard";

export const useCardValidation = () => {
  const [values, setValues] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const cardType = detectCardType(values.number);

  const errors = {
    number: !validateCardNumber(values.number),
    expiry: !validateExpiry(values.expiry),
    cvv: !validateCVV(values.cvv, cardType),
    name: values.name.length < 3,
  };

  const isValid = Object.values(errors).every((e) => !e);

  return {
    values,
    setValues,
    errors,
    isValid,
    cardType,
  };
};
