"use client";

import { useState } from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";

type Form = {
  fullName: string;
  phone: string;
  email: string;
  moveInDate: string;
  leaseTerm: string;
  occupants: string;
  landlordName: string;
  landlordPhone: string;
  tenancyLength: string;
  reasonLeaving: string;
  occupation: string;
  income: string;
  pets: string;
  evicted: string;
  evictionReason: string;
};

export default function Home() {

  const [form, setForm] = useState<Form>({
    fullName: "",
    phone: "",
    email: "",
    moveInDate: "",
    leaseTerm: "12",
    occupants: "",
    landlordName: "",
    landlordPhone: "",
    tenancyLength: "",
    reasonLeaving: "",
    occupation: "",
    income: "",
    pets: "",
    evicted: "No",
    evictionReason: "",
  });

  const [tx_ref] = useState(() => "rent_" + crypto.randomUUID());
  const amount = 54.0;

  const update = (key: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    form.fullName &&
    form.email &&
    form.phone &&
    form.occupation &&
    form.income;

  const encode = (val: string) => encodeURIComponent(val || "");

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref,
    amount,
    currency: "USD",
    payment_options: "card",

    customer: {
      email: form.email,
      name: form.fullName,
      phone_number: form.phone || "0000000000",
    },

    redirect_url: `https://alex-rentals.live/success?tx_ref=${tx_ref}&name=${encode(form.fullName)}&email=${encode(form.email)}&phone=${encode(form.phone)}&income=${encode(form.income)}&occupation=${encode(form.occupation)}`,

    // ✅ FIXED HERE
    customizations: {
      title: "Rental Application Fee",
      description: "Apartment Screening",
      logo: "https://alex-rentals.live/logo.png", // 🔥 replace later if needed
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#111111] px-4 py-10 text-white">

      <div className="max-w-xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6">

        <h1 className="text-xl font-semibold mb-6 text-center">
          Rental Application
        </h1>

        <div className="space-y-4">

          <Section title="Applicant Information" />

          <Input placeholder="Full Name" onChange={(e) => update("fullName", e.target.value)} />
          <Input placeholder="Phone Number" onChange={(e) => update("phone", e.target.value)} />
          <Input placeholder="Email Address" onChange={(e) => update("email", e.target.value)} />

          <Input type="date" onChange={(e) => update("moveInDate", e.target.value)} />

          <select
            onChange={(e) => update("leaseTerm", e.target.value)}
            className="input bg-transparent text-white"
          >
            <option value="12" className="bg-black">12 months</option>
            <option value="6" className="bg-black">6 months</option>
            <option value="3" className="bg-black">3 months</option>
          </select>

          <Input placeholder="Number of Occupants" onChange={(e) => update("occupants", e.target.value)} />

          <Section title="Rental History" />

          <Input placeholder="Landlord Name" onChange={(e) => update("landlordName", e.target.value)} />
          <Input placeholder="Landlord Phone" onChange={(e) => update("landlordPhone", e.target.value)} />
          <Input placeholder="Length of Tenancy" onChange={(e) => update("tenancyLength", e.target.value)} />

          <textarea
            placeholder="Reason for Leaving"
            onChange={(e) => update("reasonLeaving", e.target.value)}
            className="input"
          />

          <Section title="Employment & Financials" />

          <Input placeholder="Current Occupation / Employer" onChange={(e) => update("occupation", e.target.value)} />
          <Input placeholder="Estimated Monthly Income" onChange={(e) => update("income", e.target.value)} />

          <Input placeholder="Pets (type/breed if any)" onChange={(e) => update("pets", e.target.value)} />

          <select
            onChange={(e) => update("evicted", e.target.value)}
            className="input bg-transparent text-white"
          >
            <option value="No" className="bg-black">No eviction history</option>
            <option value="Yes" className="bg-black">Yes - explain</option>
          </select>

          {form.evicted === "Yes" && (
            <textarea
              placeholder="Explain eviction in detail"
              onChange={(e) => update("evictionReason", e.target.value)}
              className="input"
            />
          )}

        </div>

        <div className="mt-6 p-4 border border-white/10 rounded-xl bg-white/5 text-sm">
          <p>Application Fee: <strong>${amount}</strong></p>
          <p className="text-gray-400 text-xs mt-1">
            Covers screening & background checks. Non-refundable.
          </p>
        </div>

        <div className="mt-6">
          <FlutterWaveButton
            {...config}
            text="Submit Application & Pay"
            callback={() => {}}
            onClose={() => {}}
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
            disabled={!isValid}
          />
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By proceeding, you agree to our{" "}
          <a href="/privacy" className="underline">Privacy Policy</a> and{" "}
          <a href="/refund" className="underline">Refund Policy</a>
        </p>

      </div>

      <footer className="mt-6 text-center text-xs text-gray-500">
        <p>© 2026 Alex Rentals</p>
        <p>
          <a href="/privacy" className="underline">Privacy</a> |{" "}
          <a href="/refund" className="underline">Refund</a> |{" "}
          <a href="mailto:alexsobieskki@gmail.com" className="underline">Contact</a>
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

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="input" />;
}

function Section({ title }: { title: string }) {
  return <h2 className="text-sm text-gray-400 mt-4 mb-2">{title}</h2>;
}