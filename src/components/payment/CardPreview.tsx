"use client";

import { CardType } from "@/types/card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  name: string;
  number: string;
  expiry: string;
  cardType: CardType;
}

export default function CardPreview({ name, number, expiry, cardType }: Props) {
  return (
    <Card className="min-h-[220px] bg-primary text-primary-foreground shadow-lg max-w-md">
      <CardContent className="flex flex-1 flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-80">Payment Card</p>

          <Badge variant="secondary">{cardType}</Badge>
        </div>

        <div className="text-2xl tracking-widest">
          {number || "•••• •••• •••• ••••"}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs opacity-70">Card Holder</p>
            <p className="uppercase tracking-wide">{name || "YOUR NAME"}</p>
          </div>

          <div>
            <p className="text-xs opacity-70">Expires</p>
            <p>{expiry || "MM/YY"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
