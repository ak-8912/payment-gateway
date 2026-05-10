"use client";

import { useForm } from "react-hook-form";
import CardInput from "./CardInput";
import CardPreview from "./CardPreview";
import { usePayment } from "@/hooks/usePayment";
import { usePaymentStore } from "@/store/paymentStore";
import { detectCardType } from "@/lib/detectCardType";
import {
  validateCardNumber,
  validateCVV,
  validateExpiry,
} from "@/lib/validateCard";
import { formatCardNumber } from "@/lib/formatCardNumber";
import { PaymentPayload } from "@/types/payment";

interface FormValues {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: "INR" | "USD";
}

export default function PaymentForm() {
  const { pay } = usePayment();

  const status = usePaymentStore((s) => s.status);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      currency: "INR",
    },
  });

  const values = watch();

  const cardType = detectCardType(values.cardNumber || "");

  const onSubmit = async (data: FormValues) => {
    await pay(data as unknown as PaymentPayload);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <CardPreview
          name={values.cardholderName}
          number={values.cardNumber}
          expiry={values.expiry}
          cardType={cardType}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <CardInput
          id="cardholderName"
          label="Cardholder Name"
          placeholder="John Doe"
          error={errors.cardholderName?.message}
          {...register("cardholderName", {
            required: "Cardholder name is required",
          })}
        />

        <CardInput
          id="cardNumber"
          label="Card Number"
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          error={errors.cardNumber?.message}
          {...register("cardNumber", {
            required: "Card number is required",
            validate: (value) =>
              validateCardNumber(value) || "Invalid card number",
            onChange: (e) => {
              setValue("cardNumber", formatCardNumber(e.target.value), {
                shouldValidate: true,
              });
            },
          })}
        />

        <div className="grid grid-cols-2 gap-4">
          <CardInput
            id="expiry"
            label="Expiry"
            placeholder="MM/YY"
            maxLength={5}
            error={errors.expiry?.message}
            {...register("expiry", {
              required: "Expiry is required",
              validate: (value) =>
                validateExpiry(value) || "Invalid expiry date",
            })}
          />

          <CardInput
            id="cvv"
            label="CVV"
            placeholder="123"
            maxLength={cardType === "AMEX" ? 4 : 3}
            error={errors.cvv?.message}
            {...register("cvv", {
              required: "CVV is required",
              validate: (value) =>
                validateCVV(value, cardType) || "Invalid CVV",
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CardInput
            id="amount"
            type="number"
            label="Amount"
            placeholder="100"
            error={errors.amount?.message}
            {...register("amount", {
              required: "Amount required",
              min: {
                value: 1,
                message: "Minimum amount is 1",
              },
            })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Currency</label>

            <select
              className="border rounded-lg px-4 py-3"
              {...register("currency")}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || status === "PROCESSING"}
          className="w-full rounded-lg bg-black text-white py-3 disabled:opacity-50"
        >
          {status === "PROCESSING" ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
