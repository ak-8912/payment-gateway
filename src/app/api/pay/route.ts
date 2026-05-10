import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as { id?: string };

  if (!payload.id) {
    return NextResponse.json(
      { status: "FAILED", reason: "Missing transaction ID" },
      { status: 400 }
    );
  }

  const rand = Math.random();

  if (rand < 0.6) {
    return NextResponse.json({ status: "SUCCESS" });
  }

  if (rand < 0.85) {
    return NextResponse.json({
      status: "FAILED",
      reason: "Insufficient funds",
    });
  }

  await new Promise((res) => setTimeout(res, 8000));

  return NextResponse.json({ status: "TIMEOUT" });
}
