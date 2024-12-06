// src/app/cancel/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Payment Cancelled
        </h1>
        <p className="mb-8 text-gray-600">
          Your payment was cancelled. No charges were made.
        </p>
        <Link href="/">
          <Button>Try Again</Button>
        </Link>
      </div>
    </div>
  );
}
