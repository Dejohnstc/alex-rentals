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

  const isValidPhone =
    form.phone.startsWith("+") && form.phone.length >= 10;

  const isValid =
    form.fullName &&
    form.email &&
    form.phone &&
    isValidPhone &&
    form.occupation &&
    form.income;

  const encode = (val: string) => encodeURIComponent(val || "");

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref,
    amount,
    currency: "USD",
    payment_options: "card,applepay,banktransfer,ussd,alipay",

    customer: {
      email: form.email,
      name: form.fullName,
      phone_number: form.phone,
    },

    redirect_url: `https://alex-rentals.live/success?tx_ref=${tx_ref}&name=${encode(
      form.fullName
    )}&email=${encode(form.email)}&phone=${encode(
      form.phone
    )}&income=${encode(form.income)}&occupation=${encode(
      form.occupation
    )}`,

    customizations: {
      title: "Rental Application Fee",
      description: "Apartment Screening",
      logo: "https://alex-rentals.live/logo.png",
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0b0b0b] to-black px-4 py-10 text-white">

      <div className="max-w-xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Rental Application
          </h1>
          <p className="text-gray-400 text-sm">
            Complete your application and secure your spot
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">

          <Section title="Applicant Information" />

          <FloatingInput label="Full Name" onChange={(e) => update("fullName", e.target.value)} />
          <FloatingInput label="Phone Number (+1XXXXXXXXXX)" onChange={(e) => update("phone", e.target.value)} />
          <FloatingInput label="Email Address" onChange={(e) => update("email", e.target.value)} />

          <FloatingInput type="date" label="Move-in Date" onChange={(e) => update("moveInDate", e.target.value)} />

          <select onChange={(e) => update("leaseTerm", e.target.value)} className="input appearance-none">
            <option value="12">12 months</option>
            <option value="6">6 months</option>
            <option value="3">3 months</option>
          </select>

          <FloatingInput label="Number of Occupants" onChange={(e) => update("occupants", e.target.value)} />

          <Section title="Rental History" />

          <FloatingInput label="Landlord Name" onChange={(e) => update("landlordName", e.target.value)} />
          <FloatingInput label="Landlord Phone" onChange={(e) => update("landlordPhone", e.target.value)} />
          <FloatingInput label="Length of Tenancy" onChange={(e) => update("tenancyLength", e.target.value)} />

          <textarea
            placeholder="Reason for Leaving"
            onChange={(e) => update("reasonLeaving", e.target.value)}
            className="input h-24"
          />

          <Section title="Employment & Financials" />

          <FloatingInput label="Occupation / Employer" onChange={(e) => update("occupation", e.target.value)} />
          <FloatingInput label="Estimated Monthly Income" onChange={(e) => update("income", e.target.value)} />
          <FloatingInput label="Pets (type/breed if any)" onChange={(e) => update("pets", e.target.value)} />

          <select onChange={(e) => update("evicted", e.target.value)} className="input appearance-none">
            <option value="No">No eviction history</option>
            <option value="Yes">Yes - explain</option>
          </select>

          {form.evicted === "Yes" && (
            <textarea
              placeholder="Explain eviction in detail"
              onChange={(e) => update("evictionReason", e.target.value)}
              className="input h-24"
            />
          )}

          {/* PAYMENT */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <p className="text-lg font-semibold">${amount}</p>
            <p className="text-gray-400 text-xs">
              Application fee (non-refundable)
            </p>
          </div>

          <FlutterWaveButton
            {...config}
            text={
              isValid
                ? "Submit Application & Pay"
                : "Enter valid details (phone must include +country code)"
            }
            callback={() => {}}
            onClose={() => {}}
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all"
            disabled={!isValid}
          />

          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <a href="/privacy" className="underline">Privacy Policy</a> and{" "}
            <a href="/refund" className="underline">Refund Policy</a>
          </p>

        </div>

        <footer className="text-center text-xs text-gray-500">
          © 2026 Alex Rentals
        </footer>

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: white;
          transition: 0.2s;
        }

        .input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.15);
        }
      `}</style>

    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ title }: { title: string }) {
  return (
    <h2 className="text-sm text-gray-400 mt-6 mb-2 font-medium tracking-wide">
      {title}
    </h2>
  );
}

function FloatingInput({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input {...props} placeholder=" " className="input peer" />
      <label
        className="absolute left-3 top-3 text-gray-400 text-sm transition-all
        peer-placeholder-shown:top-3
        peer-placeholder-shown:text-sm
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-white
        -top-2 text-xs bg-[#050505] px-1"
      >
        {label}
      </label>
    </div>
  );
}