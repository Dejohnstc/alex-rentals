"use client";

import { useState } from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";

export default function Home() {
  const [email, setEmail] = useState("");

  // ✅ Generate tx_ref ONCE safely
  const [tx_ref] = useState(() => "rent_" + crypto.randomUUID());

  const amount = 54;

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref,

    amount,
    currency: "USD",

    payment_options: "card",

    customer: {
      email: email,
      name: "Customer",
      phone_number: "08059398428",
    },

    redirect_url: "http://localhost:3000/success",

    customizations: {
      title: "Rental Application Fee",
      description: "Apartment Screening",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    },
  };

return (
  <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] px-4">

    {/* CARD */}
    <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 text-center">

      {/* LOGO / BRAND */}
      <div className="mb-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white text-lg font-semibold">
          R
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-white mb-1">
        Rental Application Fee
      </h1>

      <p className="text-gray-400 text-sm mb-6">
        Apartment Screening
      </p>

      {/* AMOUNT */}
      <div className="text-5xl font-bold text-white mb-8 tracking-tight">
        ${amount}
      </div>

      {/* INPUT */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
      />

      {/* BUTTON */}
      <FlutterWaveButton
        {...config}
        text="Pay Application Fee"
        callback={() => {}}
        onClose={() => {}}
        className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all duration-200 active:scale-[0.98]"
        disabled={!email}
      />

      {/* TRUST / FOOTER */}
      <div className="mt-6 text-xs text-gray-500 space-y-1">
        <p>Secure payment</p>
        <p>Powered by Flutterwave</p>
      </div>

    </div>
  </main>
);
}