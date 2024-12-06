// src/app/success/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mb-8 text-gray-600">
          Thank you for your purchase. We have sent you a confirmation email.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
