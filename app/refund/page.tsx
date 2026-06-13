import { agent } from "@/config/agent";
export default function Refund() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
            Legal
          </p>

          <h1 className="text-5xl font-serif mt-3">
            Refund Policy
          </h1>

          <div className="h-[2px] w-20 bg-[#d4af37] mt-5" />

          <p className="text-sm text-[#9ca3af] mt-6">
            Last updated: {new Date().getFullYear()}
          </p>

        </div>

        {/* CONTENT */}
        <section className="space-y-10 text-[15px] leading-relaxed text-[#d1d5db]">

          <div className="space-y-3">

            <p>
              {agent.company} maintains a strict refund policy regarding
              rental application processing fees.
            </p>

            <p>
              By submitting payment through this website,
              you acknowledge and agree to the terms outlined below.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Non-Refundable Fees
            </h2>

            <p>
              All rental application fees are considered final
              and non-refundable once submitted.
            </p>

            <p>
              Fees are used to cover administrative costs,
              verification procedures, screening processes,
              and application review services.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Duplicate Payments
            </h2>

            <p>
              Refunds may be considered in cases involving:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Duplicate transactions</li>

              <li>Verified billing errors</li>

              <li>Technical processing failures</li>

            </ul>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Processing Errors
            </h2>

            <p>
              If you believe a payment was processed incorrectly,
              please contact us immediately for review and investigation.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Chargebacks
            </h2>

            <p>
              Unauthorized chargebacks or payment disputes may result
              in suspension of application processing and further review.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Contact
            </h2>

            <p>
              For refund-related questions or support:
            </p>

            <p className="text-[#d4af37] font-medium">
               {agent.email}
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}