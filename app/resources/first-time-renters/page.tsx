import Link from "next/link";
import { agent } from "@/config/agent";
export default function FirstTimeRentersPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-5xl mx-auto space-y-16">

        {/* HERO */}
        <section className="space-y-6">

          <p className="text-sm tracking-[0.25em] text-[#9ca3af] uppercase">
            Rental Resources
          </p>

          <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            Tips for <br />
            First-Time Renters
          </h1>

          {/* META */}
          <div className="flex items-center gap-4 text-sm text-[#9ca3af]">

            <span>6 min read</span>

            <span>•</span>

            <span>Beginner Rental Guide</span>

          </div>

          <div className="h-[2px] w-24 bg-[#d4af37]" />

          {/* HERO IMAGE */}
          <div className="rounded-3xl overflow-hidden border border-white/5 mt-8">

            <img
              src="/first-renter.jpg"
              alt="First Time Renters"
              className="w-full h-[420px] object-cover"
            />

          </div>

          <p className="text-lg text-[#9ca3af] leading-relaxed max-w-3xl">
            Renting your first home can feel overwhelming,
            but proper preparation can make the process smoother,
            faster, and far less stressful.
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
                Set a Realistic Budget
              </h2>

            </div>

            <p>
              Before applying for a rental property,
              calculate your monthly housing budget carefully.
            </p>

            <p>
              Remember to account for:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Monthly rent payments</li>

              <li>Security deposits</li>

              <li>Utilities and internet</li>

              <li>Parking and transportation costs</li>

              <li>Furniture and moving expenses</li>

            </ul>

          </div>

          {/* SECTION */}
          <div className="bg-[#151821] border border-white/5 rounded-3xl p-8 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                ✦
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Prepare Documents Early
              </h2>

            </div>

            <p>
              Having your documents organized before applying
              can dramatically improve approval speed.
            </p>

            <p>
              Commonly requested documents include:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Government-issued identification</li>

              <li>Proof of income</li>

              <li>Employment verification</li>

              <li>Bank statements</li>

              <li>Previous landlord references</li>

            </ul>

          </div>

          {/* SECTION */}
          <div className="bg-[#151821] border border-white/5 rounded-3xl p-8 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                ✦
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Understand Lease Agreements
              </h2>

            </div>

            <p>
              Always review lease agreements carefully before signing.
            </p>

            <p>
              Pay attention to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Lease duration</li>

              <li>Monthly payment due dates</li>

              <li>Pet policies</li>

              <li>Maintenance responsibilities</li>

              <li>Late payment penalties</li>

            </ul>

          </div>

          {/* SECTION */}
          <div className="bg-[#151821] border border-white/5 rounded-3xl p-8 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                ✦
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Communicate Professionally
              </h2>

            </div>

            <p>
              Clear and respectful communication with landlords
              can positively influence the application process.
            </p>

            <p>
              Respond quickly, provide accurate information,
              and maintain professional communication throughout the process.
            </p>

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
              href="/resources/credit-score-rentals"
              className="group bg-[#151821] border border-white/5 rounded-3xl p-8 hover:border-[#d4af37]/40 transition"
            >

              <div className="space-y-4">

                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                  ✦
                </div>

                <h3 className="text-2xl font-semibold group-hover:text-[#d4af37] transition">
                  How Credit Scores Affect Rentals
                </h3>

                <p className="text-[#9ca3af]">
                  Understand how landlords evaluate financial history
                  during rental screening.
                </p>

              </div>

            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}