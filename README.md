# Payment Gateway UI

A simulated payment gateway built with Next.js App Router and TypeScript. The app demonstrates a full client-side payment lifecycle without using a third-party payment SDK.

## Features

- Payment form with real-time validation
- Card number formatting and card type detection for Visa, Mastercard, and Amex
- Live payment card preview
- Currency selector for INR and USD
- Mock gateway route at `/api/pay`
- Payment states: Idle, Processing, Success, Failed, and Timeout
- AbortController timeout handling after 6 seconds
- Retry flow with a maximum of 3 attempts per transaction
- Frontend-generated transaction IDs using `crypto.randomUUID()`
- Transaction history persisted in `localStorage`
- Clickable history records with detailed transaction view
- ShadCN UI components for form controls, cards, buttons, tabs, badges, and selects

## Tech Stack

- Next.js App Router
- TypeScript
- React Hook Form
- Zustand
- Tailwind CSS
- ShadCN UI

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Run checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Project Structure

```text
src/app/page.tsx                 Main tabbed payment/history page
src/app/api/pay/route.ts         Mock payment gateway route handler
src/components/payment/          Payment form, card preview, status, retry UI
src/components/history/          Transaction history list and rows
src/components/ui/               ShadCN UI components
src/hooks/usePayment.ts          Payment lifecycle and gateway request logic
src/store/paymentStore.ts        Zustand payment state and history
src/lib/                         Card detection, formatting, validation helpers
src/types/                       Shared TypeScript types
```

## Mock Gateway Behavior

The `/api/pay` route randomly returns:

- Success: about 60%
- Failed: about 25%, with a readable reason such as `Insufficient funds`
- Timeout simulation: about 15%, delayed for 8 seconds

The frontend cancels requests after 6 seconds with `AbortController`, then shows a friendly timeout message.

## Assumptions

- This is a simulation only. Card data is never sent to a real payment processor.
- Transaction history is stored in `localStorage`, so it is browser-specific and not shared across devices.
- The mock gateway validates that a transaction ID exists, but does not perform real card authorization.
- Retry attempts reuse the same frontend-generated transaction ID and stored payload.
- The processing state is kept visible for roughly 2 seconds, even if the mock API responds immediately, to make the lifecycle clear.
- Existing history records from older versions of the app may not include cardholder name, currency, or failure reason, so the UI falls back to readable defaults.

## What I Would Improve With More Time

- Add automated tests for validation utilities, payment lifecycle, retry limits, and history persistence.
- Add Playwright coverage for the mobile and desktop payment flows.
- Replace `localStorage` persistence with a small backend store or database-backed transaction log.
- Add stronger card validation, such as a Luhn check and better brand-specific length rules.
- Add masked card numbers to history instead of showing only the transaction ID.
- Improve accessibility with richer live-region messaging and keyboard-focused history/detail navigation.
- Add deterministic gateway test modes so success, failure, and timeout flows can be tested without relying on randomness.
