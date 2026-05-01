"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f1115] text-white overflow-hidden">

      {/* BACKGROUND (MATURE GRADIENT) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d24] via-[#0f1115] to-[#1a1624] opacity-70" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 space-y-24">

        {/* HERO */}
        <section className="text-center space-y-6">

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
            Secure Your Next Home <br />
            <span className="text-[#9ca3af]">In Minutes</span>
          </h1>

          <p className="text-[#9ca3af] max-w-2xl mx-auto text-lg">
            Fast, secure rental applications trusted by tenants across the United States.
          </p>

          {/* TRUST STRIP */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#9ca3af]">
            <span>🔒 Secure Checkout</span>
            <span>✔ Verified Process</span>
            <span>⚡ Fast Approval</span>
          </div>

          {/* CTA */}
          <Link
            href="/apply"
            className="inline-block mt-4 bg-[#d4af37] text-black px-10 py-4 rounded-xl font-medium hover:bg-[#c9a531] transition active:scale-[0.98] shadow-lg shadow-[#d4af37]/10"
          >
            Start Application
          </Link>

        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <Stat number="120+" label="Homes Rented" />
          <Stat number="45+" label="Applications Approved" />
          <Stat number="98%" label="Approval Rate" />

        </section>

        {/* PROCESS */}
        <section className="grid sm:grid-cols-3 gap-6 text-center">

          <Step title="1. Fill Application" desc="Enter your details securely" />
          <Step title="2. Pay Fee" desc="Encrypted payment checkout" />
          <Step title="3. Get Approved" desc="Quick review process" />

        </section>

        {/* REVIEWS */}
        <section className="space-y-6">

          <h2 className="text-2xl font-semibold text-center">
            Trusted by Renters
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">

            <Review text="Super smooth process. Got approved quickly." name="Michael R." />
            <Review text="Felt safe paying online. Very professional." name="Jessica T." />
            <Review text="Way better than traditional rental applications." name="David L." />

          </div>

        </section>

        {/* AGENT CARD */}
        <section className="bg-[#151821] border border-white/5 rounded-2xl p-8 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-lg font-semibold">
              AS
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Alex Sobieski
              </h3>
              <p className="text-[#9ca3af] text-sm">
                Verified Rental Specialist
              </p>
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-[#d4af37] text-lg">★★★★★</span>
            <span className="text-[#9ca3af] text-sm">
              5.0 • 120+ verified reviews
            </span>
          </div>

          <p className="text-[#9ca3af] text-sm mt-4 max-w-xl">
            Dedicated to helping renters secure housing quickly with a transparent,
            secure, and modern application process.
          </p>

        </section>

        {/* CTA */}
        <section className="text-center space-y-6">

          <h2 className="text-3xl font-semibold">
            Start Your Application Today
          </h2>

          <Link
            href="/apply"
            className="inline-block bg-[#d4af37] text-black px-10 py-4 rounded-xl font-medium hover:bg-[#c9a531] transition active:scale-[0.98] shadow-lg shadow-[#d4af37]/10"
          >
            Apply Now
          </Link>

        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-[#6b7280] pt-6 border-t border-white/5">
          © 2026 Alex Rentals • Secure Rental Applications
        </footer>

      </div>

    </main>
  );
}

/* COMPONENTS */

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-[#151821] border border-white/5 rounded-xl p-6 text-center hover:bg-[#1c2029] transition transform hover:-translate-y-1">
      <p className="text-3xl font-semibold">{number}</p>
      <p className="text-[#9ca3af] text-sm mt-1">{label}</p>
    </div>
  );
}

function Review({ text, name }: { text: string; name: string }) {
  return (
    <div className="bg-[#151821] border border-white/5 rounded-xl p-5 text-sm text-[#d1d5db] hover:bg-[#1c2029] transition">
      <p className="mb-3">“{text}”</p>
      <div className="text-xs text-[#6b7280]">— {name}</div>
    </div>
  );
}

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#151821] border border-white/5 rounded-xl p-6">
      <p className="font-semibold">{title}</p>
      <p className="text-[#9ca3af] text-sm mt-1">{desc}</p>
    </div>
  );
}