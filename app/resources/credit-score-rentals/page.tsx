import Link from "next/link";
import { agent } from "@/config/agent";
export default function CreditScoreRentalsPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <section className="space-y-6">

          <p className="text-sm tracking-[0.25em] text-[#9ca3af] uppercase">
            Rental Resources
          </p>

          <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            How Credit Scores <br />
            Affect Rental Applications
          </h1>

          {/* META */}
          <div className="flex items-center gap-4 text-sm text-[#9ca3af]">

            <span>5 min read</span>

            <span>•</span>

            <span>Tenant Screening Guide</span>

          </div>

          <div className="h-[2px] w-24 bg-[#d4af37]" />

          {/* HERO IMAGE */}
          <div className="rounded-3xl overflow-hidden border border-white/5 mt-8">

            <img
              src="/credit-score.jpg"
              alt="Credit Score Rentals"
              className="w-full h-[420px] object-cover"
            />

          </div>

          <p className="text-lg text-[#9ca3af] leading-relaxed max-w-3xl">
            Understanding how landlords evaluate credit scores can significantly improve
            your chances of rental approval and help you prepare stronger applications.
          </p>

        </section>

        {/* ARTICLE CONTENT */}
        <section className="space-y-12 text-[#d1d5db] leading-relaxed text-[16px]">

          {/* SECTION */}
          <div className="bg-[#151821] border border-white/5 rounded-3xl p-8 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                ✦
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Why Credit Scores Matter
              </h2>

            </div>

            <p>
              Credit scores help landlords evaluate financial responsibility,
              payment reliability, and overall tenant risk.
            </p>

            <p>
              A strong credit history often indicates that rent payments
              are likely to be made consistently and on time.
            </p>

          </div>

          {/* SECTION */}
          <div className="bg-[#151821] border border-white/5 rounded-3xl p-8 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                ✦
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Common Credit Requirements
              </h2>

            </div>

            <p>
              Most landlords prefer applicants with stable financial history,
              though credit requirements vary depending on property type,
              location, and rental demand.
            </p>

            <p>
              Some property owners may prioritize:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Consistent payment history</li>

              <li>Low outstanding debt</li>

              <li>Few late payments</li>

              <li>Minimal collections or charge-offs</li>

            </ul>

          </div>

          {/* SECTION */}
          <div className="bg-[#151821] border border-white/5 rounded-3xl p-8 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                ✦
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Improving Approval Chances
              </h2>

            </div>

            <p>
              Applicants with lower credit scores can still strengthen their applications
              through additional documentation and preparation.
            </p>

            <p>
              Helpful strategies include:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Providing proof of stable income</li>

              <li>Offering additional references</li>

              <li>Explaining past financial hardship honestly</li>

              <li>Showing strong recent payment behavior</li>

            </ul>

          </div>

        </section>

        {/* AUTHOR */}
        <section className="bg-[#151821] border border-white/5 rounded-3xl p-8">

          <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
            Written By
          </p>

          <div className="flex items-center gap-5 mt-5">

            <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">

              <img
                src="/agent.jpg"
                alt={agent.name}
                className="w-full h-full object-cover"
              />

            </div>

            <div>

              <h3 className="text-2xl font-semibold">
                {agent.name}
              </h3>

              <p className="text-[#9ca3af] mt-1">
                Real estate advisor focused on rental applications,
                tenant screening, and premium leasing experiences.
              </p>

            </div>

          </div>

        </section>

        {/* RELATED ARTICLES */}
        <section className="space-y-8">

          <div className="flex items-end justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
                Continue Reading
              </p>

              <h2 className="text-4xl font-serif mt-2">
                Related Resources
              </h2>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <Link
              href="/resources/rental-documents"
              className="group bg-[#151821] border border-white/5 rounded-3xl p-8 hover:border-[#d4af37]/40 transition"
            >

              <div className="space-y-4">

                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                  ✦
                </div>

                <h3 className="text-2xl font-semibold group-hover:text-[#d4af37] transition">
                  Documents Needed Before Applying
                </h3>

                <p className="text-[#9ca3af]">
                  Learn the key documents landlords commonly require
                  before approving rental applications.
                </p>

              </div>

            </Link>

            <Link
              href="/resources/first-time-renters"
              className="group bg-[#151821] border border-white/5 rounded-3xl p-8 hover:border-[#d4af37]/40 transition"
            >

              <div className="space-y-4">

                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                  ✦
                </div>

                <h3 className="text-2xl font-semibold group-hover:text-[#d4af37] transition">
                  Tips for First-Time Renters
                </h3>

                <p className="text-[#9ca3af]">
                  Important guidance every first-time renter should know
                  before signing a lease agreement.
                </p>

              </div>

            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}