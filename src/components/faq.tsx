/**
 * v0 by Vercel.
 * @see https://v0.dev/t/q9zYaw9EHug
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function FAQ() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">What payment methods do you accept?</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            We accept all major credit cards.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Can I cancel my subscription?</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Yes, you can cancel your subscription at any time.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Do you offer any discounts?</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Yes, we offer a discount for annual subscriptions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">What if I need more help?</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Our support team is available 24/7 to help you with your needs.
          </p>
        </div>
      </div>
    </div>
  );
}
