"use client";

import Link from "next/link";
import { agent } from "@/config/agent";
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
  useEffect(() => {

  // ✅ HARD LOCK IMMEDIATELY
  if (sessionStorage.getItem("visitor_notified")) {
    return;
  }

  // ✅ SET BEFORE FETCH
  sessionStorage.setItem(
    "visitor_notified",
    "true"
  );

  const sendVisitorData = async () => {

    try {

      await fetch("/api/notify", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          browser: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          page: window.location.href,
          referrer: document.referrer,
          screen: `${window.innerWidth}x${window.innerHeight}`,
          timezone:
            Intl.DateTimeFormat()
              .resolvedOptions()
              .timeZone,
        }),
      });

    } catch (err: unknown) {

      console.log(err);

      // ❌ OPTIONAL:
      // remove lock if request fails
      sessionStorage.removeItem(
        "visitor_notified"
      );
    }
  };

  sendVisitorData();

}, []);
  return (
    <main className="relative min-h-screen bg-[#0f1115] text-white overflow-hidden">
      {/* NAVBAR */}
<div className="fixed top-0 left-0 w-full z-50">

  {/* GLASS BACKDROP */}
  <div className="absolute inset-0 bg-[#241c16]/75 backdrop-blur-2xl border-b border-white/10" />

  {/* GOLD TOP LINE */}
  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

  <div className="relative max-w-7xl mx-auto px-6">

    <div className="h-20 flex items-center justify-between">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* PREMIUM LOGO */}
        <div className="relative">

          <div className="absolute inset-0 bg-[#d4af37]/20 blur-xl rounded-full" />

          <div className="relative w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">

            <span className="text-sm font-semibold tracking-wider">
              {agent.logoInitials}
            </span>

          </div>

        </div>

        {/* BRANDING */}
        <div className="leading-tight">

          <p className="text-[10px] tracking-[0.25em] text-[#9ca3af] uppercase">
             {agent.title}
          </p>

          <h2 className="text-lg font-semibold tracking-wide">
              {agent.name}
          </h2>

        </div>

      </div>

      {/* CENTER NAV */}
      <div className="hidden md:flex items-center gap-8 text-sm text-[#d1d5db]">

        <Link
          href="/"
          className="hover:text-white transition"
        >
          Home
        </Link>

        <Link
          href="/apply"
          className="hover:text-white transition"
        >
          Apply
        </Link>

        <Link
          href="/resources"
          className="hover:text-white transition"
        >
          Resources
        </Link>

        <Link
          href="/about"
          className="hover:text-white transition"
        >
          About
        </Link>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* RATING */}
        <div className="hidden lg:flex items-center gap-2 text-sm">

          <div className="flex text-[#d4af37]">
            ★★★★★
          </div>

          <span className="text-[#9ca3af]">
            Trusted Agent
          </span>

        </div>

        {/* CTA */}
        <a
          href={`mailto:${agent.email}?subject=Rental Inquiry&body=Hello Alex,%0D%0A%0D%0AI am interested in applying.`}
          className="group relative overflow-hidden bg-[#d4af37] text-black px-6 py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.02]"
        >

          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />

          <span className="relative">
            Get in Touch
          </span>

        </a>

      </div>

    </div>

  </div>

</div>

      {/* BACKGROUND (MATURE GRADIENT) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d24] via-[#0f1115] to-[#1a1624] opacity-70" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 space-y-24">

        {/* HERO */}
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

  {/* 🔥 BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <div
      className="w-full h-full bg-cover bg-center scale-110 animate-[zoom_20s_ease-in-out_infinite]"
      style={{
        backgroundImage: "url('/hero.jpg')" // 🔁 replace with your image
      }}
    />
  </div>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />

  {/* GRADIENT DEPTH */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

  {/* LIGHT GLOW */}
  <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4af37]/20 blur-[120px] rounded-full" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-3xl px-6 space-y-6 animate-fadeInUp">

    <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
      Secure Your Next Home <br />
      <span className="text-[#d4af37]">In Minutes</span>
    </h1>

    <p className="text-gray-300 text-lg max-w-xl mx-auto">
      Fast, secure rental applications trusted by tenants across the United States.
    </p>

    {/* TRUST BADGES */}
    <div className="flex flex-wrap justify-center gap-3 text-sm mt-4">

      <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        🔒 Secure Checkout
      </span>

      <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        ✔ Verified Process
      </span>

      <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        ⚡ Fast Approval
      </span>

    </div>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">

      <Link
        href="/apply"
        className="bg-[#d4af37] text-black px-10 py-4 rounded-xl font-medium hover:bg-[#c9a531] transition shadow-xl shadow-[#d4af37]/20 active:scale-[0.98]"
      >
        Start Application
      </Link>

      <a
  href={`mailto:${agent.email}?subject=Rental Inquiry&body=Hello,%0D%0A%0D%0AI am interested in applying.`}
  className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-xl hover:bg-white/20 transition"
>
        Contact Agent
      </a>

    </div>

  </div>

  {/* SCROLL INDICATOR */}
  <div className="absolute bottom-6 flex flex-col items-center text-xs text-gray-400 animate-bounce">
    <span>Scroll</span>
    <div className="w-[2px] h-6 bg-white/40 mt-1"></div>
  </div>

  {/* ANIMATIONS */}
  <style jsx>{`
    @keyframes zoom {
      0% { transform: scale(1.1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1.1); }
    }

    .animate-fadeInUp {
      animation: fadeInUp 1s ease forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>

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
      {agent.name}
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

      <a
  href={`mailto:${agent.email}?subject=Rental Inquiry&body=Hello Alex,%0D%0A%0D%0AI am interested in applying.`}
  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-medium transition"
>
  Get in Touch
</a>

      <div className="text-right">
        <p className="text-lg font-semibold">
           {agent.email}
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
    alt={agent.name}
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
        About {agent.company}
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

<section className="space-y-8">

  <div className="flex items-end justify-between flex-wrap gap-4">

    <div>

      <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
        Resources
      </p>

      <h2 className="text-4xl font-serif mt-2">
        Rental Insights & Guides
      </h2>

    </div>

    <Link
      href="/resources"
      className="text-[#d4af37]"
    >
      View All →
    </Link>

  </div>

  <div className="grid md:grid-cols-3 gap-6">

    <Link
      href="/resources/rental-documents"
      className="bg-[#151821] border border-white/5 rounded-2xl p-6 hover:border-[#d4af37]/30 transition"
    >

      <p className="text-sm text-[#9ca3af]">
        Rental Tips
      </p>

      <h3 className="text-2xl font-semibold mt-3">
        Documents Needed Before Applying
      </h3>

    </Link>

    <Link
      href="/resources/credit-score-rentals"
      className="bg-[#151821] border border-white/5 rounded-2xl p-6 hover:border-[#d4af37]/30 transition"
    >

      <p className="text-sm text-[#9ca3af]">
        Credit Guide
      </p>

      <h3 className="text-2xl font-semibold mt-3">
        How Credit Scores Affect Rentals
      </h3>

    </Link>

    <Link
      href="/resources/first-time-renters"
      className="bg-[#151821] border border-white/5 rounded-2xl p-6 hover:border-[#d4af37]/30 transition"
    >

      <p className="text-sm text-[#9ca3af]">
        Beginner Guide
      </p>

      <h3 className="text-2xl font-semibold mt-3">
        Tips for First-Time Renters
      </h3>

    </Link>

  </div>

</section>

        {/* FOOTER */}
      <footer className="border-t border-white/5 pt-10 pb-8 mt-10">

  <div className="max-w-6xl mx-auto px-6">

    {/* TOP */}
    <div className="grid md:grid-cols-3 gap-10">

      {/* BRAND */}
      <div className="space-y-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
            AS
          </div>

          <div>

            <p className="font-semibold">
              {agent.company}
            </p>

            <p className="text-xs text-[#9ca3af]">
              Premium Rental Applications
            </p>

          </div>

        </div>

        <p className="text-sm text-[#9ca3af] leading-relaxed max-w-sm">
          Secure and professional rental application
          services designed to simplify the leasing process.
        </p>

      </div>

      {/* NAVIGATION */}
      <div>

        <p className="font-semibold mb-4">
          Navigation
        </p>

        <div className="flex flex-col gap-3 text-sm text-[#9ca3af]">

          <Link href="/">
            Home
          </Link>

          <Link href="/apply">
            Apply
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/privacy">
            Privacy Policy
          </Link>

          <Link href="/refund">
            Refund Policy
          </Link>

          <Link href="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>

      {/* CONTACT */}
      <div>

        <p className="font-semibold mb-4">
          Contact
        </p>

        <div className="space-y-3 text-sm text-[#9ca3af]">

          <p>
             {agent.email}
          </p>

          <p>
            Available for rental inquiries
          </p>

          <a
            href={`mailto:${agent.email}?subject=Rental Inquiry`}
            className="inline-block mt-2 bg-[#d4af37] text-black px-5 py-3 rounded-lg font-medium hover:bg-[#c9a531] transition"
          >
            Get in Touch
          </a>

        </div>

      </div>

    </div>

    {/* BOTTOM */}
    <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">

      <p>
        © 2026 {agent.name}. All rights reserved.
      </p>

      <div className="flex items-center gap-4">

        <span>
          Secure Payments
        </span>

        <span>
          Protected Data
        </span>

        <span>
          Verified Process
        </span>

      </div>

    </div>

  </div>

</footer>

      </div>

    </main>
  );
}

/* COMPONENTS */

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