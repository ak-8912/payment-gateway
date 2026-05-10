"use client";

import { CardType } from "@/types/card";

interface Props {
  name: string;
  number: string;
  expiry: string;
  cardType: CardType;
}

export default function CardPreview({ name, number, expiry, cardType }: Props) {
  return (
    <div className="rounded-2xl bg-black text-white p-6 shadow-lg min-h-[220px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <p className="text-sm opacity-80">Payment Card</p>

        <div className="text-sm font-semibold">{cardType}</div>
      </div>

      <div className="text-2xl tracking-widest font-mono">
        {number || "•••• •••• •••• ••••"}
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs opacity-70">Card Holder</p>
          <p className="uppercase tracking-wide">{name || "YOUR NAME"}</p>
        </div>

        <div>
          <p className="text-xs opacity-70">Expires</p>
          <p>{expiry || "MM/YY"}</p>
        </div>
      </div>
    </div>
  );
}
