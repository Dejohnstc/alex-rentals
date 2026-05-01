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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Form>({
    fullName: "",
    phone: "+1",
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

  const handlePhone = (value: string) => {
    if (!value.startsWith("+1")) {
      value = "+1" + value.replace(/\D/g, "");
    }
    update("phone", value);
  };

  const isValidPhone =
    form.phone.startsWith("+1") && form.phone.length >= 11;

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
          <h1 className="text-2xl font-semibold">
            Rental Application
          </h1>
          <p className="text-gray-400 text-sm">
            Complete your application and secure your spot
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-6">

          <Section title="Applicant Information" />

          <InputField label="Full Name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />

          <InputField label="Phone Number (+1XXXXXXXXXX)" value={form.phone} onChange={(e) => handlePhone(e.target.value)} />

          <InputField label="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)} />

          <InputField type="date" label="Move-in Date" value={form.moveInDate} onChange={(e) => update("moveInDate", e.target.value)} />

          <select value={form.leaseTerm} onChange={(e) => update("leaseTerm", e.target.value)} className="input-box">
            <option value="12">12 months</option>
            <option value="6">6 months</option>
            <option value="3">3 months</option>
          </select>

          <InputField label="Number of Occupants" value={form.occupants} onChange={(e) => update("occupants", e.target.value)} />

          <Section title="Rental History" />

          <InputField label="Landlord Name" value={form.landlordName} onChange={(e) => update("landlordName", e.target.value)} />

          <InputField label="Landlord Phone" value={form.landlordPhone} onChange={(e) => update("landlordPhone", e.target.value)} />

          <InputField label="Length of Tenancy" value={form.tenancyLength} onChange={(e) => update("tenancyLength", e.target.value)} />

          <TextareaField label="Reason for Leaving" value={form.reasonLeaving} onChange={(e) => update("reasonLeaving", e.target.value)} />

          <Section title="Employment & Financials" />

          <InputField label="Occupation / Employer" value={form.occupation} onChange={(e) => update("occupation", e.target.value)} />

          <InputField label="Estimated Monthly Income" value={form.income} onChange={(e) => update("income", e.target.value)} />

          <InputField label="Pets (type/breed if any)" value={form.pets} onChange={(e) => update("pets", e.target.value)} />

          <select value={form.evicted} onChange={(e) => update("evicted", e.target.value)} className="input-box">
            <option value="No">No eviction history</option>
            <option value="Yes">Yes - explain</option>
          </select>

          {form.evicted === "Yes" && (
            <TextareaField
              label="Explain eviction"
              value={form.evictionReason}
              onChange={(e) => update("evictionReason", e.target.value)}
            />
          )}

          {/* PAYMENT */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <p className="text-lg font-semibold">${amount}</p>
            <p className="text-gray-400 text-xs">
              Application fee (non-refundable)
            </p>
          </div>

          <p className="text-xs text-yellow-400 text-center">
            Use a card that supports OTP (3D Secure). If your card fails, try another card or bank transfer.
          </p>

          <FlutterWaveButton
            {...config}
            text={loading ? "Processing..." : "Submit Application & Pay"}
            callback={() => setLoading(false)}
            onClose={() => setLoading(false)}
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
            disabled={!isValid || loading}
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
        .input-box {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .input-box:focus {
          outline: none;
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.1);
        }
      `}</style>

    </main>
  );
}

/* COMPONENTS */

function Section({ title }: { title: string }) {
  return (
    <h2 className="text-sm text-gray-400 mt-6 mb-2">
      {title}
    </h2>
  );
}

function InputField({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400">{label}</label>
      <input {...props} className="input-box" />
    </div>
  );
}

function TextareaField({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400">{label}</label>
      <textarea {...props} className="input-box h-24" />
    </div>
  );
}