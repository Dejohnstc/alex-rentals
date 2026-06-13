"use client";
import Link from "next/link";
import { useState } from "react";
import { FlutterWaveButton } from "flutterwave-react-v3";

type Form = {
  fullName: string;
  phone: string;
  email: string;
  moveInDate: string;

  currentAddress: string;
  licenseState: string;

  landlordName: string;
  landlordPhone: string;
  tenancyLength: string;
  numberOfOccupants: string;

  occupation: string;
  employer: string;
  income: string;
  creditScore: string;

  pets: string;
  evicted: string;
  evictionReason: string;

  emergencyName: string;
  emergencyPhone: string;
  emergencyAddress: string;
  reasonLeaving:string;
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
      currentAddress: "",
licenseState: "",

numberOfOccupants: "",

employer: "",
creditScore: "",

emergencyName: "",
emergencyPhone: "",
emergencyAddress: "",
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
  const saveApplication = () => {

  localStorage.setItem(
    "rental_application",
    JSON.stringify(form)
  );

};

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

  // ✅ PASS USER DATA THROUGH URL
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
<div
  className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-10 space-y-8 shadow-2xl"
>
<div>
  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
    Applicant Information
  </p>

  <h2 className="text-3xl font-semibold text-white">
  Personal Details
</h2>

 <p className="text-gray-400 mt-3 leading-relaxed">
    Please provide your contact information to begin the application.
  </p>
</div>
    <div className="grid md:grid-cols-2 gap-6">

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
        label="Phone Number"
        value={form.phone}
        onChange={(e) =>
          handlePhone(
            e.target.value
          )
        }
        error={errors.phone}
      />

    </div>

    <Field
      label="Email Address"
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
  label="Current Address"
  value={form.currentAddress}
  onChange={(e) =>
    update(
      "currentAddress",
      e.target.value
    )
  }
/>
    <Field
      type="date"
      label="Desired Move-In Date"
      value={form.moveInDate}
      onChange={(e) =>
        update(
          "moveInDate",
          e.target.value
        )
      }
    />
    <Field
  label="Driver License Number"
  value={form.licenseState}
  onChange={(e) =>
    update(
      "licenseState",
      e.target.value
    )
  }
/>

    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
        Application Notice
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        Completing this application does not guarantee approval.
        Applications are reviewed based on rental history,
        income verification, credit profile, and landlord criteria.
      </p>

    </div>

  </div>
)}

          {step === 2 && (
  <div className="space-y-6">

    <div>

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
        Rental History
      </p>

      <h2 className="text-2xl font-semibold text-white">
        Previous Landlord Information
      </h2>

      <p className="text-gray-400 text-sm mt-2">
        Please provide details regarding your most recent rental history.
      </p>

    </div>

    <div className="grid md:grid-cols-2 gap-6">

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

    </div>

    <Field
      label="Length of Tenancy"
      value={form.tenancyLength}
      onChange={(e) =>
        update(
          "tenancyLength",
          e.target.value
        )
      }
    />
    <Field
  label="Number of Occupants"
  value={form.numberOfOccupants}
  onChange={(e) =>
    update(
      "numberOfOccupants",
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

    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
        Why We Ask
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        Rental history helps us better understand an applicant&apos;s
tenancy experience and housing background.
      </p>

    </div>

  </div>
)}

         {step === 3 && (
  <div className="space-y-6">

    <div>

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
        Applicant Profile
      </p>

      <h2 className="text-2xl font-semibold text-white">
        Employment &amp; Qualification Information
      </h2>

      <p className="text-gray-400 text-sm mt-2">
        Help us understand your employment background and housing qualifications.
      </p>

    </div>

    <div className="grid md:grid-cols-2 gap-6">

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
  label="Employer Name"
  value={form.employer}
  onChange={(e) =>
    update(
      "employer",
      e.target.value
    )
  }
/>
     <div className="grid md:grid-cols-2 gap-6">

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

  <div className="space-y-2">

    <label className="text-sm text-gray-300 font-medium">
      Estimated Credit Score
    </label>

    <select
      value={form.creditScore}
      onChange={(e) =>
        update(
          "creditScore",
          e.target.value
        )
      }
      className="input"
    >
      <option value="">
        Select Credit Score Range
      </option>

      <option value="800+">
        800+
      </option>

      <option value="740-799">
        740 - 799
      </option>

      <option value="670-739">
        670 - 739
      </option>

      <option value="580-669">
        580 - 669
      </option>

      <option value="Below 580">
        Below 580
      </option>

    </select>

  </div>

</div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

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

      <div className="space-y-3">

        <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">
          Previous Evictions
        </label>

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

      </div>
<div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">

  <div>

    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
      Emergency Contact
    </p>

    <h3 className="text-xl font-semibold">
      Emergency Contact Information
    </h3>

  </div>

  <Field
    label="Full Name"
    value={form.emergencyName}
    onChange={(e) =>
      update(
        "emergencyName",
        e.target.value
      )
    }
  />

  <Field
    label="Phone Number"
    value={form.emergencyPhone}
    onChange={(e) =>
      update(
        "emergencyPhone",
        e.target.value
      )
    }
  />

  <Field
    label="Address"
    value={form.emergencyAddress}
    onChange={(e) =>
      update(
        "emergencyAddress",
        e.target.value
      )
    }
  />

</div>
    </div>

    {form.evicted === "Yes" && (

      <Textarea
        label="Please Explain the Eviction"
        value={form.evictionReason}
        onChange={(e) =>
          update(
            "evictionReason",
            e.target.value
          )
        }
      />

    )}

    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
        Qualification Review
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        Income, rental history, employment verification, and applicant disclosures
        may be reviewed during the screening process. Providing accurate information
        helps ensure a faster review.
      </p>

    </div>

  </div>
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

    <div
      onClick={saveApplication}
    >

      <FlutterWaveButton
        {...config}

        text={
          loading
            ? "Processing..."
            : "Pay & Submit"
        }

        callback={() => {
          setLoading(false);
        }}

        onClose={() => {
          setLoading(false);
        }}

        className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
      />

    </div>

    {/* ✅ TERMS NOTICE */}
    <div className="mt-5 bg-white/5 border border-white/10 rounded-2xl p-4">

      <p className="text-xs text-center text-gray-400 leading-relaxed">

        By clicking{" "}

        <span className="text-white font-medium">
          &quot;Pay &amp; Submit&quot;
        </span>

        , you acknowledge and agree to our{" "}

        <Link
          href="/terms"
          className="text-[#d4af37] hover:underline"
        >
          Terms &amp; Conditions
        </Link>

        ,{" "}

        <Link
          href="/privacy"
          className="text-[#d4af37] hover:underline"
        >
          Privacy Policy
        </Link>

        {" "}and{" "}

        <Link
          href="/refund"
          className="text-[#d4af37] hover:underline"
        >
          Refund Policy
        </Link>

        .

      </p>

    </div>

    {/* ✅ REVIEW NOTICE */}
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">

      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
        Application Review
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        Upon successful payment, your application will be submitted
        for landlord review. Approval decisions may be based on rental
        history, employment verification, income qualification,
        credit profile, occupancy information, and other supporting
        application details.
      </p>

    </div>

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
  height: 60px;

  padding: 0 18px;

  border-radius: 16px;

  background: rgba(255,255,255,0.04);

  border: 1px solid rgba(255,255,255,0.15);

  color: white;

  font-size: 16px;

  margin-top: 10px;

  transition: all 0.25s ease;
}

.input::placeholder {
  color: rgba(255,255,255,0.35);
}

.input:hover {
  border-color: rgba(212,175,55,0.4);
}

.input:focus {
  outline: none;

  border-color: #d4af37;

  background: rgba(255,255,255,0.06);

  box-shadow:
    0 0 0 3px rgba(212,175,55,0.15),
    0 12px 30px rgba(0,0,0,0.35);
}`}</style>

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
    <div className="space-y-3">

      <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-gray-500">
        {label}
      </label>

      <input
        {...props}
        placeholder={`Enter ${label}`}
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
    <div className="space-y-3">

      <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-gray-500">
        {label}
      </label>

      <textarea
        {...props}
        placeholder={`Enter ${label}`}
        className="w-full min-h-[140px] p-4 rounded-2xl bg-white/5 border border-white/15 text-white placeholder:text-white/35 resize-none transition-all duration-300 hover:border-[#d4af37]/40 focus:outline-none focus:border-[#d4af37] focus:bg-white/8"
      />

    </div>
  );
}