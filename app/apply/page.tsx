"use client";

import { useState } from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";

type Form = {
  fullName: string;
  phone: string;
  email: string;
  moveInDate: string;
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

  const [step, setStep] = useState<number>(1);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  // ✅ SAFE LOCAL STORAGE INIT
  const [form, setForm] = useState<Form>(() => {

    if (typeof window !== "undefined") {

      const saved = localStorage.getItem(
        "rental_application"
      );

      if (saved) {
        return JSON.parse(saved);
      }
    }

    return {
      fullName: "",
      phone: "+1",
      email: "",
      moveInDate: "",
      landlordName: "",
      landlordPhone: "",
      tenancyLength: "",
      reasonLeaving: "",
      occupation: "",
      income: "",
      pets: "",
      evicted: "No",
      evictionReason: "",
    };
  });

  // ✅ UPDATE + SAVE
  const update = (
    key: keyof Form,
    value: string
  ) => {

    const updated = {
      ...form,
      [key]: value,
    };

    setForm(updated);

    if (typeof window !== "undefined") {

      localStorage.setItem(
        "rental_application",
        JSON.stringify(updated)
      );
    }
  };

  // ✅ PHONE FORMAT
  const handlePhone = (value: string) => {

    if (!value.startsWith("+1")) {

      value =
        "+1" + value.replace(/\D/g, "");
    }

    update("phone", value);
  };

  // ✅ VALIDATION
  const validateStep = (): boolean => {

    const err: Record<string, string> = {};

    if (step === 1) {

      if (!form.fullName) {
        err.fullName = "Full name is required";
      }

      if (!form.email) {
        err.email = "Email is required";
      }

      if (
        !form.phone ||
        form.phone.length < 11
      ) {
        err.phone = "Valid phone required";
      }
    }

    if (step === 2) {

      if (!form.landlordName) {
        err.landlordName = "Required";
      }

      if (!form.landlordPhone) {
        err.landlordPhone = "Required";
      }
    }

    if (step === 3) {

      if (!form.occupation) {
        err.occupation = "Required";
      }

      if (!form.income) {
        err.income = "Required";
      }
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const next = () => {

    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    setStep((s) => s - 1);
  };

  // ✅ TX REF
  const [tx_ref] = useState<string>(
    () => "rent_" + crypto.randomUUID()
  );

  // ✅ FLUTTERWAVE CONFIG
  const config = {

    public_key:
      process.env
        .NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",

    tx_ref,

    amount: 54,

    currency: "USD",

    payment_options:
      "card,applepay,banktransfer,alipay",

    customer: {
      email: form.email,
      name: form.fullName,
      phone_number: form.phone,
    },

    redirect_url:
      "https://alex-rentals.live/success",

    customizations: {
      title: "Rental Application Fee",
      description: "Apartment Screening",
      logo: "https://alex-rentals.live/logo.png",
    },
  };

  const progress = (step / 4) * 100;

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center">

          <h1 className="text-2xl font-semibold">
            Rental Application
          </h1>

          <p className="text-gray-400 text-sm">
            Step {step} of 4
          </p>

        </div>

        {/* PROGRESS */}
        <div className="w-full bg-white/10 h-2 rounded-full">

          <div
            className="bg-white h-2 transition-all"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">

          {step === 1 && (
            <>

              <Field
                label="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  update(
                    "fullName",
                    e.target.value
                  )
                }
                error={errors.fullName}
              />

              <Field
                label="Phone"
                value={form.phone}
                onChange={(e) =>
                  handlePhone(
                    e.target.value
                  )
                }
                error={errors.phone}
              />

              <Field
                label="Email"
                value={form.email}
                onChange={(e) =>
                  update(
                    "email",
                    e.target.value
                  )
                }
                error={errors.email}
              />

              <Field
                type="date"
                label="Move-in Date"
                value={form.moveInDate}
                onChange={(e) =>
                  update(
                    "moveInDate",
                    e.target.value
                  )
                }
              />

            </>
          )}

          {step === 2 && (
            <>

              <Field
                label="Landlord Name"
                value={form.landlordName}
                onChange={(e) =>
                  update(
                    "landlordName",
                    e.target.value
                  )
                }
                error={errors.landlordName}
              />

              <Field
                label="Landlord Phone"
                value={form.landlordPhone}
                onChange={(e) =>
                  update(
                    "landlordPhone",
                    e.target.value
                  )
                }
                error={errors.landlordPhone}
              />

              <Field
                label="Tenancy Length"
                value={form.tenancyLength}
                onChange={(e) =>
                  update(
                    "tenancyLength",
                    e.target.value
                  )
                }
              />

              <Textarea
                label="Reason for Leaving"
                value={form.reasonLeaving}
                onChange={(e) =>
                  update(
                    "reasonLeaving",
                    e.target.value
                  )
                }
              />

            </>
          )}

          {step === 3 && (
            <>

              <Field
                label="Occupation"
                value={form.occupation}
                onChange={(e) =>
                  update(
                    "occupation",
                    e.target.value
                  )
                }
                error={errors.occupation}
              />

              <Field
                label="Monthly Income"
                value={form.income}
                onChange={(e) =>
                  update(
                    "income",
                    e.target.value
                  )
                }
                error={errors.income}
              />

              <Field
                label="Pets"
                value={form.pets}
                onChange={(e) =>
                  update(
                    "pets",
                    e.target.value
                  )
                }
              />

              <select
                value={form.evicted}
                onChange={(e) =>
                  update(
                    "evicted",
                    e.target.value
                  )
                }
                className="input"
              >
                <option>No</option>
                <option>Yes</option>
              </select>

              {form.evicted === "Yes" && (

                <Textarea
                  label="Explain eviction"
                  value={form.evictionReason}
                  onChange={(e) =>
                    update(
                      "evictionReason",
                      e.target.value
                    )
                  }
                />

              )}

            </>
          )}

          {step === 4 && (
            <>

              <div className="text-center">

                <p className="text-2xl font-bold">
                  $54
                </p>

                <p className="text-gray-400 text-xs">
                  Application fee
                </p>

              </div>

              <FlutterWaveButton
                {...config}

                text={
                  loading
                    ? "Processing..."
                    : "Submit & Pay"
                }

                callback={() => {
                  setLoading(false);
                }}

                onClose={() => {
                  setLoading(false);
                }}

                className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
              />

            </>
          )}

          {/* NAV */}
          <div className="flex justify-between pt-4">

            {step > 1 && (
              <button onClick={back}>
                Back
              </button>
            )}

            {step < 4 && (
              <button
                onClick={next}
                className="ml-auto bg-white text-black px-4 py-2 rounded-lg"
              >
                Continue
              </button>
            )}

          </div>

        </div>

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          color: white;
          font-size: 14px;
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .input:hover {
          border-color: rgba(255,255,255,0.35);
        }

        .input:focus {
          outline: none;
          border-color: white;
          background: rgba(255,255,255,0.08);

          box-shadow:
            0 0 0 2px rgba(255,255,255,0.15),
            0 10px 30px rgba(0,0,0,0.4);
        }
      `}</style>

    </main>
  );
}

/* COMPONENTS */

function Field({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {

  return (
    <div className="space-y-2">

      <label className="text-sm text-gray-300 font-medium">
        {label}
      </label>

      <input
        {...props}
        placeholder={label}
        className="input"
      />

      {error && (
        <p className="text-red-400 text-xs">
          {error}
        </p>
      )}

    </div>
  );
}

type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
  };

function Textarea({
  label,
  ...props
}: TextareaProps) {

  return (
    <div>

      <label className="text-xs text-gray-400">
        {label}
      </label>

      <textarea
        {...props}
        className="input mt-1 h-24"
      />

    </div>
  );
}