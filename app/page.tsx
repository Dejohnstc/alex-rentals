"use client";

import { useState } from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";

export default function Home() {

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    moveInDate: "",
    leaseTerm: "12",
    occupants: "",
    occupation: "",
    income: "",
  });

  const [tx_ref] = useState(() => "rent_" + crypto.randomUUID());

  const amount = 54.0;

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    form.fullName &&
    form.email &&
    form.phone &&
    form.occupation &&
    form.income;

  // ✅ Encode function (important)
  const encode = (val: string) => encodeURIComponent(val || "");

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref,
    amount,
    currency: "USD",
    payment_options: "card",

    customer: {
      email: form.email,
      name: form.fullName || "Customer",
      phone_number: form.phone || "0000000000",
    },

    // ✅ PASS ALL DATA TO SUCCESS PAGE
    redirect_url: `http://localhost:3000/success?tx_ref=${tx_ref}&name=${encode(form.fullName)}&email=${encode(form.email)}&phone=${encode(form.phone)}&income=${encode(form.income)}&occupation=${encode(form.occupation)}`,

    customizations: {
      title: "Rental Application Fee",
      description: "Apartment Screening",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] px-4 py-10 text-white">

      <div className="max-w-md mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6">

        <h1 className="text-xl font-semibold mb-4 text-center">
          Rental Application
        </h1>

        {/* FORM */}
        <div className="space-y-3">

          <input placeholder="Full Name" onChange={(e)=>update("fullName", e.target.value)} className="input"/>
          <input placeholder="Phone Number" onChange={(e)=>update("phone", e.target.value)} className="input"/>
          <input placeholder="Email Address" onChange={(e)=>update("email", e.target.value)} className="input"/>

          <input type="date" onChange={(e)=>update("moveInDate", e.target.value)} className="input"/>

          <select onChange={(e)=>update("leaseTerm", e.target.value)} className="input">
            <option value="12">12 months</option>
            <option value="6">6 months</option>
            <option value="3">3 months</option>
          </select>

          <input placeholder="Number of Occupants" onChange={(e)=>update("occupants", e.target.value)} className="input"/>

          <input placeholder="Occupation / Employer" onChange={(e)=>update("occupation", e.target.value)} className="input"/>

          <input placeholder="Monthly Income" onChange={(e)=>update("income", e.target.value)} className="input"/>

        </div>

        {/* SUMMARY */}
        <div className="mt-5 p-3 border border-white/10 rounded-xl bg-white/5 text-sm">
          <p>Application Fee: <strong>${amount}</strong></p>
          <p className="text-gray-400 text-xs mt-1">
            Covers screening & background checks. Non-refundable.
          </p>
        </div>

        {/* PAYMENT BUTTON */}
        <div className="mt-5">
          <FlutterWaveButton
            {...config}
            text="Submit Application & Pay"
            callback={() => {}}
            onClose={() => {}}
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all duration-200 active:scale-[0.98]"
            disabled={!isValid}
          />
        </div>

        {/* LEGAL */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          By proceeding, you agree to our{" "}
          <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>{" "}
          and{" "}
          <a href="/refund" className="underline hover:text-white">Refund Policy</a>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-6 text-center text-xs text-gray-500">
        <p>© 2026 Alex Rentals</p>
        <p>
          <a href="/privacy" className="underline hover:text-white">Privacy</a> |{" "}
          <a href="/refund" className="underline hover:text-white">Refund</a> |{" "}
          <a href="mailto:alexsobieskki@gmail.com" className="underline hover:text-white">
            Contact
          </a>
        </p>
      </footer>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
        }
      `}</style>

    </main>
  );
}