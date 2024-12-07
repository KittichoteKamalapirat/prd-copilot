/**
 * v0 by Vercel.
 * @see https://v0.dev/t/q9zYaw9EHug
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import FAQ from "./faq";

export default function PricingTable() {
  return (
    <div className="grid gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center">
        Simple, transparent pricing
      </h1>
      <p className="text-xl text-center text-zinc-600 dark:text-zinc-400 mt-2">
        Choose a plan that suits your needs. No hidden fees.
      </p>
      <div className="grid gap-6 md:grid-cols-3 mt-16">
        <div className="border rounded-lg p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Basic</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-2">
              $29/month
            </p>
            <ul className="mt-6 text-zinc-500 dark:text-zinc-400">
              <li>Access to all features</li>
              <li>Unlimited users</li>
              <li>24/7 Support</li>
            </ul>
            <Button className="mt-6">Get started</Button>
          </div>
        </div>
        <div className="border rounded-lg p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Premium</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-2">
              $49/month
            </p>
            <ul className="mt-6 text-zinc-500 dark:text-zinc-400">
              <li>Access to all features</li>
              <li>Unlimited users</li>
              <li>Priority Support</li>
              <li>Free updates</li>
            </ul>
            <Button className="mt-6">Get started</Button>
          </div>
        </div>
        <div className="border rounded-lg p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Enterprise</h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 mt-2">
              Custom Pricing
            </p>
            <ul className="mt-6 text-zinc-500 dark:text-zinc-400">
              <li>Access to all features</li>
              <li>Unlimited users</li>
              <li>Dedicated Support</li>
              <li>Custom integrations</li>
            </ul>
            <Button className="mt-6">Contact us</Button>
          </div>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
