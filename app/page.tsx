"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-12 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl opacity-40" />

      <div className="relative max-w-6xl mx-auto space-y-20">

        {/* HERO */}
        <section className="text-center space-y-6">

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            Rent Smarter. <br />
            <span className="text-white/70">Apply Faster.</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A secure and modern rental application experience trusted by tenants across the United States.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

            <Link
              href="/apply"
              className="bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition active:scale-[0.98]"
            >
              Start Application
            </Link>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              🔒 Secure • Verified • Fast
            </div>

          </div>

        </section>

        {/* FLOATING STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <Stat number="120+" label="Homes Rented" />
          <Stat number="45+" label="Applications Approved" />
          <Stat number="98%" label="Approval Rate" />

        </section>

        {/* REVIEWS (AIRBNB STYLE) */}
        <section className="space-y-6">

          <h2 className="text-2xl font-semibold text-center">
            What Renters Are Saying
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">

            <Review
              text="Super smooth process. Paid and got approved within 24 hours."
              name="Michael R."
            />

            <Review
              text="Way easier than traditional rental applications. Highly recommend."
              name="Jessica T."
            />

            <Review
              text="Felt safe paying online. Everything was transparent."
              name="David L."
            />

          </div>

        </section>

        {/* AGENT PROFILE */}
        <section className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-lg font-semibold">
              AS
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Alex Sobieski
              </h3>
              <p className="text-gray-400 text-sm">
                Verified Rental Specialist
              </p>
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="text-gray-400 text-sm">
              5.0 • 120+ verified reviews
            </span>
          </div>

          <p className="text-gray-400 text-sm mt-4 max-w-xl">
            Helping renters secure homes quickly with a transparent and secure application process.
          </p>

        </section>

        {/* CTA */}
        <section className="text-center space-y-6">

          <h2 className="text-3xl font-semibold">
            Ready to Get Started?
          </h2>

          <Link
            href="/apply"
            className="inline-block bg-white text-black px-10 py-4 rounded-xl font-medium hover:bg-gray-200 transition active:scale-[0.98]"
          >
            Start Your Application
          </Link>

        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-gray-500 pt-6 border-t border-white/10">
          © 2026 Alex Rentals • Secure Rental Applications
        </footer>

      </div>

    </main>
  );
}

/* COMPONENTS */

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/[0.05] border border-white/10 rounded-xl p-6 text-center hover:bg-white/[0.08] transition transform hover:-translate-y-1">
      <p className="text-3xl font-semibold">{number}</p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
}

function Review({ text, name }: { text: string; name: string }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 text-sm text-gray-300 hover:bg-white/[0.06] transition">
      <p className="mb-3">“{text}”</p>
      <div className="text-xs text-gray-500">— {name}</div>
    </div>
  );
}