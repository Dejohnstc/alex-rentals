"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: boolean;
};

function AnimatedStat({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = false,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const duration = 1200; // fast premium feel
          const increment = value / (duration / 16);

          const timer = setInterval(() => {
            start += increment;

            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  const display = decimals
    ? count.toFixed(1)
    : Math.floor(count).toString();

  return (
    <div
      ref={ref}
      className="bg-[#151821] border border-white/5 rounded-xl p-6 text-center hover:bg-[#1c2029] transition transform hover:-translate-y-1"
    >
      <p className="text-3xl font-semibold">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="text-[#9ca3af] text-sm mt-1">{label}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f1115] text-white overflow-hidden">
      {/* NAVBAR */}
<div className="sticky top-0 z-50 bg-[#3a2f25] border-b border-white/10 px-6 py-3 flex items-center justify-between">

  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
      AS
    </div>

    <div>
      <p className="text-xs text-gray-300">REDFIN PRINCIPAL AGENT</p>
      <p className="font-semibold">Alex Sobieski</p>
    </div>
  </div>

  <a
  href="mailto:alexsobieskki@gmail.com?subject=Rental Inquiry&body=Hello Alex,%0D%0A%0D%0AI am interested in applying for a rental property.%0D%0A%0D%0AThank you."
  className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-medium transition"
>
  Get in Touch
</a>

</div>

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
  <AnimatedStat value={262} label="TOTAL DEALS" />
  <AnimatedStat value={326} label="SALES VOLUME ($M)" prefix="$" suffix="M" />
  <AnimatedStat value={4.9} label="HIGHEST SALE ($M)" prefix="$" suffix="M" decimals />
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

       {/* AGENT SECTION (REDIFIN STYLE) */}
<section className="grid md:grid-cols-2 gap-6 items-center">

  {/* LEFT CARD */}
  <div className="bg-[#4a3b2f] rounded-2xl p-8 space-y-5">

    <p className="text-xs text-gray-300 tracking-wide">
      REDFIN PRINCIPAL AGENT
    </p>

    <h2 className="text-4xl font-serif">
      Alex Sobieski
    </h2>

    <p className="text-sm text-gray-300">
      License # 01993164
    </p>

    <div className="h-[2px] w-12 bg-red-500" />

    <div>
      <p className="font-semibold text-lg">
        262 HOMES CLOSED IN:
      </p>

      <p className="text-gray-300 text-sm mt-1">
        Pacifica • San Francisco • Daly City • San Bruno • San Mateo ...
      </p>

      <p className="underline mt-2 cursor-pointer text-sm">
        View More
      </p>
    </div>

    {/* ⭐ KEEP RATING */}
    <div className="flex items-center gap-2 mt-2">
      <span className="text-yellow-400 text-lg">★★★★★</span>
      <span className="text-gray-300 text-sm">5.0 rating</span>
    </div>

    {/* CTA + EMAIL */}
    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">

      <Link
        href="/apply"
        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-medium transition"
      >
        Get in Touch
      </Link>

      <div className="text-right">
        <p className="text-lg font-semibold">
          alexsobieskki@gmail.com
        </p>
        <p className="text-green-400 text-sm">
          ✓ Available for inquiries
        </p>
      </div>

    </div>

  </div>

  {/* RIGHT IMAGE */}
  <div className="relative rounded-2xl overflow-hidden">
  <img
    src="/agent.jpg"
    alt="Alex Sobieski"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
</div>

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
        {/* ABOUT (ELITE VERSION) */}
<section className="grid md:grid-cols-2 gap-10 items-center">

  {/* LEFT CONTENT */}
  <div className="space-y-6">

    <div>
      <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
        About Alex
      </p>

      <h2 className="text-4xl font-serif mt-2 leading-tight">
        A Trusted Real Estate Advisor
      </h2>

      <div className="h-[2px] w-16 bg-[#d4af37] mt-3" />
    </div>

    <p className="text-[#9ca3af] leading-relaxed text-[15px]">
      I believe that selling or buying a home is more than just a transaction — 
      it is a step toward a better life. Over the years, I have overseen construction 
      projects, managed tenants, and renovated homes across multiple markets.
    </p>

    <p className="text-[#9ca3af] leading-relaxed text-[15px]">
      I have helped countless families secure homes, investments, and new beginnings. 
      Whether you are buying your first home or expanding your portfolio, 
      I guide every step with precision, strategy, and care.
    </p>

    <p className="text-[#9ca3af] leading-relaxed text-[15px]">
      My commitment is simple — maximize your value, minimize your stress, 
      and deliver results that exceed expectations.
    </p>

    {/* MINI TRUST BADGES */}
    <div className="flex flex-wrap gap-4 pt-2 text-sm text-[#9ca3af]">
      <span className="bg-white/5 px-4 py-2 rounded-lg">✔ Negotiation Expert</span>
      <span className="bg-white/5 px-4 py-2 rounded-lg">✔ Market Specialist</span>
      <span className="bg-white/5 px-4 py-2 rounded-lg">✔ Client Focused</span>
    </div>

  </div>

  {/* RIGHT VISUAL */}
  <div className="relative">

    <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/10 to-transparent rounded-2xl blur-2xl" />

    <div className="relative bg-[#151821] border border-white/5 rounded-2xl p-6 space-y-5 shadow-xl">

      <p className="text-sm text-[#9ca3af]">
        Why clients choose Alex
      </p>

      <ul className="space-y-3 text-sm text-[#d1d5db]">

        <li className="flex items-start gap-2">
          <span className="text-green-400">✔</span>
          Proven track record of successful transactions
        </li>

        <li className="flex items-start gap-2">
          <span className="text-green-400">✔</span>
          Strong negotiation for best price outcomes
        </li>

        <li className="flex items-start gap-2">
          <span className="text-green-400">✔</span>
          Transparent and stress-free process
        </li>

        <li className="flex items-start gap-2">
          <span className="text-green-400">✔</span>
          Deep understanding of the local market
        </li>

      </ul>

      {/* CTA INSIDE CARD */}
      <Link
        href="/apply"
        className="block text-center bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a531] transition"
      >
        Start Application
      </Link>

    </div>

  </div>

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