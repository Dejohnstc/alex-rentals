import { agent } from "@/config/agent";
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
            Legal
          </p>

          <h1 className="text-5xl font-serif mt-3">
            Terms & Conditions
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
              By accessing and using {agent.company},
              you agree to comply with these Terms & Conditions.
            </p>

            <p>
              These terms govern the use of our website,
              rental application services, and payment systems.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Rental Applications
            </h2>

            <p>
              Submission of a rental application does not guarantee
              approval, tenancy, or housing placement.
            </p>

            <p>
              All applicants must provide accurate and truthful information.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Payment Terms
            </h2>

            <p>
              Application processing fees are required before
              review and screening can begin.
            </p>

            <p>
              All approved payments are considered final
              and subject to our Refund Policy.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              User Responsibilities
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Provide truthful application information</li>

              <li>Use the website lawfully</li>

              <li>Avoid fraudulent payment activity</li>

              <li>Maintain respectful communication</li>

            </ul>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Limitation of Liability
            </h2>

            <p>
              {agent.company} is not responsible for losses,
              delays, or damages arising from application decisions,
              third-party payment providers, or technical interruptions.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Modifications
            </h2>

            <p>
              We reserve the right to modify these Terms & Conditions
              at any time without prior notice.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Contact
            </h2>

            <p>
              For questions regarding these terms:
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