"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

/* ─────────────────────────── CONFIG ─────────────────────────── */

const TOTAL_STEPS = 5;
const APPLICATION_FEE = 1;
const STORAGE_KEY = "rental_application";

const STEP_TITLES = [
  "Personal Details",
  "Rental History",
  "Employment & Income",
  "Household",
  "Review & Pay",
];

const US_STATES =
  "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(
    " "
  );

const EMPLOYED_STATUSES = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed",
];
const EMPLOYMENT_STATUSES = [
  ...EMPLOYED_STATUSES,
  "Student",
  "Retired",
  "Unemployed",
  "Other",
];

const LEASE_TERMS = [
  "6 months",
  "12 months",
  "18 months",
  "24 months",
  "Month-to-month",
];

const CREDIT_RANGES = [
  "800+",
  "740-799",
  "670-739",
  "580-669",
  "Below 580",
  "No credit history",
  "Not sure",
];

const YES_NO = ["No", "Yes"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─────────────────────────── TYPES ─────────────────────────── */

type Form = {
  // Step 1 – personal
  propertyAddress: string;
  fullName: string;
  email: string;
  phone: string;
  moveInDate: string;
  leaseTerm: string;
  licenseNumber: string;
  licenseState: string;

  // Step 2 – rental history
  currentAddress: string;
  tenancyLength: string;
  currentRent: string;
  noLandlord: string; // "yes" | ""
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
  reasonLeaving: string;
  previousAddress: string;

  // Step 3 – employment & income
  employmentStatus: string;
  occupation: string;
  employer: string;
  employerPhone: string;
  employmentLength: string;
  income: string;
  additionalIncome: string;
  creditScore: string;

  // Step 4 – household
  numberOfOccupants: string;
  otherOccupants: string;
  vehicles: string;
  pets: string;
  petDetails: string;
  smoker: string;
  evicted: string;
  evictionReason: string;
  brokenLease: string;
  brokenLeaseReason: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyAddress: string;
  additionalNotes: string;
};

type Errors = Partial<Record<keyof Form | "consent", string>>;

const EMPTY_FORM: Form = {
  propertyAddress: "",
  fullName: "",
  email: "",
  phone: "",
  moveInDate: "",
  leaseTerm: "",
  licenseNumber: "",
  licenseState: "",

  currentAddress: "",
  tenancyLength: "",
  currentRent: "",
  noLandlord: "",
  landlordName: "",
  landlordPhone: "",
  landlordEmail: "",
  reasonLeaving: "",
  previousAddress: "",

  employmentStatus: "",
  occupation: "",
  employer: "",
  employerPhone: "",
  employmentLength: "",
  income: "",
  additionalIncome: "",
  creditScore: "",

  numberOfOccupants: "",
  otherOccupants: "",
  vehicles: "",
  pets: "No",
  petDetails: "",
  smoker: "No",
  evicted: "No",
  evictionReason: "",
  brokenLease: "No",
  brokenLeaseReason: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  emergencyAddress: "",
  additionalNotes: "",
};

// Identity data is never written to the browser's localStorage.
const SENSITIVE_FIELDS: (keyof Form)[] = ["licenseNumber"];

/* ─────────────────────────── HELPERS ─────────────────────────── */

// US area codes never start with 1, so a leading 1 is always the country code.
const nationalDigits = (v: string) =>
  v.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);

const formatPhone = (v: string) => {
  const d = nationalDigits(v);
  if (!d) return "";
  if (d.length <= 3) return `+1 (${d}`;
  if (d.length <= 6) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const isValidPhone = (v: string) => nationalDigits(v).length === 10;

const toAmount = (v: string) => Number(v.replace(/[$,\s]/g, ""));

const isValidAmount = (v: string) => {
  const n = toAmount(v);
  return v.trim() !== "" && !Number.isNaN(n) && n >= 0;
};

function validateStep(step: number, f: Form, today: string): Errors {
  const e: Errors = {};
  const req = (k: keyof Form, msg = "This field is required") => {
    if (!f[k].trim()) e[k] = msg;
  };
  const phone = (k: keyof Form, optional = false) => {
    if (optional && !f[k].trim()) return;
    if (!isValidPhone(f[k])) e[k] = "Enter a 10-digit US phone number";
  };

  if (step === 1) {
    req("propertyAddress", "Tell us which property you're applying for");
    req("fullName", "Full legal name is required");
    if (!f.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RE.test(f.email.trim()))
      e.email = "Enter a valid email address";
    phone("phone");
    if (!f.moveInDate) e.moveInDate = "Choose a move-in date";
    else if (today && f.moveInDate < today)
      e.moveInDate = "Move-in date can't be in the past";
    req("leaseTerm", "Choose a lease term");
    if (f.licenseNumber.trim() && !f.licenseState)
      e.licenseState = "Select the state that issued your ID";
  }

  if (step === 2) {
    req("currentAddress", "Current address is required");
    req("tenancyLength", "How long have you lived there?");
    if (f.currentRent.trim() && !isValidAmount(f.currentRent))
      e.currentRent = "Enter a number, e.g. 1450";
    if (f.noLandlord !== "yes") {
      req("landlordName", "Landlord or property manager name is required");
      phone("landlordPhone");
      if (f.landlordEmail.trim() && !EMAIL_RE.test(f.landlordEmail.trim()))
        e.landlordEmail = "Enter a valid email address";
      req("reasonLeaving", "Please tell us why you're moving");
    }
  }

  if (step === 3) {
    req("employmentStatus", "Select your employment status");
    if (EMPLOYED_STATUSES.includes(f.employmentStatus)) {
      req("occupation", "Job title is required");
      req(
        "employer",
        f.employmentStatus === "Self-employed"
          ? "Business name is required"
          : "Employer name is required"
      );
      req("employmentLength", "How long have you been in this role?");
    }
    phone("employerPhone", true);
    if (!isValidAmount(f.income))
      e.income = "Enter your gross monthly income (0 if none)";
    if (f.additionalIncome.trim() && !isValidAmount(f.additionalIncome))
      e.additionalIncome = "Enter a number, e.g. 600";
  }

  if (step === 4) {
    const n = Number(f.numberOfOccupants);
    if (!f.numberOfOccupants.trim() || !Number.isInteger(n) || n < 1)
      e.numberOfOccupants = "Enter at least 1 (including yourself)";
    if (f.pets === "Yes")
      req("petDetails", "Describe each pet (type, breed, weight)");
    if (f.evicted === "Yes")
      req("evictionReason", "Please explain the eviction");
    if (f.brokenLease === "Yes")
      req("brokenLeaseReason", "Please explain what happened");
    req("emergencyName", "Emergency contact name is required");
    req("emergencyRelationship", "Relationship is required");
    phone("emergencyPhone");
  }

  return e;
}

// Saved progress, read once on the client (never during server render).
function loadSavedForm(): Form {
  const next = { ...EMPTY_FORM };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return next;
    const parsed = JSON.parse(saved) as Record<string, unknown>;
    (Object.keys(EMPTY_FORM) as (keyof Form)[]).forEach((k) => {
      if (!SENSITIVE_FIELDS.includes(k) && typeof parsed[k] === "string")
        next[k] = parsed[k] as string;
    });
    // Older versions saved the license NUMBER under licenseState.
    if (!US_STATES.includes(next.licenseState)) next.licenseState = "";
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return next;
}

function localToday() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

const noopSubscribe = () => () => {};

/* ─────────────────────────── PAGE ─────────────────────────── */

// Renders the form only in the browser, so it can read localStorage while
// it's being created, with no hydration mismatch and no setState in effects.
export default function Home() {
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <p className="text-center text-sm text-gray-500">
          Loading application…
        </p>
      </main>
    );
  }

  return <ApplicationForm />;
}

function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(loadSavedForm);
  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState({
    accuracy: false,
    screening: false,
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [today] = useState(localToday);

  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Save progress (minus sensitive fields) whenever the form changes.
  useEffect(() => {
    try {
      const safe: Partial<Form> = { ...form };
      SENSITIVE_FIELDS.forEach((k) => delete safe[k]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    } catch {}
  }, [form]);

  // Scroll back to the top when the step changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const clearError = (key: keyof Errors) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const n = { ...prev };
      delete n[key];
      return n;
    });

  const update = (key: keyof Form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearError(key);
  };

  type ChangeEl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  const bind = (key: keyof Form) => ({
    value: form[key],
    error: errors[key],
    onChange: (e: ChangeEvent<ChangeEl>) => update(key, e.target.value),
  });

  const bindPhone = (key: keyof Form) => ({
    value: form[key],
    error: errors[key],
    type: "tel",
    inputMode: "tel" as const,
    placeholder: "+1 (555) 123-4567",
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      update(key, formatPhone(e.target.value)),
  });

  const focusFirstError = () =>
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus()
    );

  const next = () => {
    const e = validateStep(step, form, today);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    } else {
      focusFirstError();
    }
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const goTo = (s: number) => {
    setErrors({});
    setStep(s);
  };

  const handlePayment = async () => {
    if (loading) return;
    setSubmitError("");

    // Re-validate every step — saved data or edits may have changed.
    for (let s = 1; s < TOTAL_STEPS; s++) {
      const e = validateStep(s, form, today);
      if (Object.keys(e).length > 0) {
        setErrors(e);
        setStep(s);
        focusFirstError();
        return;
      }
    }

    if (!consent.accuracy || !consent.screening || !consent.terms) {
      setErrors({ consent: "Please confirm all three statements to continue." });
      return;
    }

    setLoading(true);
    const reference = `rent_${crypto.randomUUID()}`;

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // NOTE: the server must set the real charge amount itself and
          // ignore this value — anything sent from the browser can be edited.
          amount: APPLICATION_FEE,
          email: form.email.trim(),
          name: form.fullName.trim(),
          reference,
          // The application itself. Your API must store this (keyed by
          // `reference`) — previously it never left the browser.
          application: {
            ...form,
            consent: { ...consent, acceptedAt: new Date().toISOString() },
          },
        }),
      });

      if (!response.ok) throw new Error(`Payment API returned ${response.status}`);
      const data = await response.json();
      if (!data.url) throw new Error("No payment URL received");

      localStorage.setItem("payment_reference", reference);
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
      setSubmitError(
        "We couldn't start the payment. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) next();
    else handlePayment();
  };

  const isEmployed = EMPLOYED_STATUSES.includes(form.employmentStatus);
  const money = (v: string) => (v.trim() ? `$${v.replace(/^\$/, "")}` : "");

  const reviewSections: { step: number; title: string; rows: [string, string][] }[] = [
    {
      step: 1,
      title: "Personal Details",
      rows: [
        ["Property", form.propertyAddress],
        ["Name", form.fullName],
        ["Email", form.email],
        ["Phone", form.phone],
        ["Move-in date", form.moveInDate],
        ["Lease term", form.leaseTerm],
        [
          "ID",
          form.licenseNumber
            ? `${form.licenseState || "—"} •••• ${form.licenseNumber.slice(-4)}`
            : "",
        ],
      ],
    },
    {
      step: 2,
      title: "Rental History",
      rows: [
        ["Current address", form.currentAddress],
        ["Time there", form.tenancyLength],
        ["Current rent", money(form.currentRent)],
        [
          "Landlord",
          form.noLandlord === "yes"
            ? "No current landlord"
            : [form.landlordName, form.landlordPhone].filter(Boolean).join(" · "),
        ],
        ["Reason for leaving", form.noLandlord === "yes" ? "" : form.reasonLeaving],
        ["Previous address", form.previousAddress],
      ],
    },
    {
      step: 3,
      title: "Employment & Income",
      rows: [
        ["Status", form.employmentStatus],
        ["Job title", isEmployed ? form.occupation : ""],
        ["Employer", isEmployed ? form.employer : ""],
        ["Time in role", isEmployed ? form.employmentLength : ""],
        ["Gross monthly income", money(form.income)],
        ["Other income", money(form.additionalIncome)],
        ["Credit score (est.)", form.creditScore],
      ],
    },
    {
      step: 4,
      title: "Household",
      rows: [
        ["Occupants", form.numberOfOccupants],
        ["Pets", form.pets === "Yes" ? form.petDetails : "No"],
        ["Vehicles", form.vehicles],
        ["Smoker", form.smoker],
        ["Prior eviction", form.evicted],
        ["Broken lease", form.brokenLease],
        [
          "Emergency contact",
          [form.emergencyName, form.emergencyRelationship, form.emergencyPhone]
            .filter(Boolean)
            .join(" · "),
        ],
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-10 space-y-6">
        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-2xl font-semibold">Rental Application</h1>
          <p className="mt-1 text-sm text-gray-400">
            Step {step} of {TOTAL_STEPS} · {STEP_TITLES[step - 1]}
          </p>
        </header>

        {/* PROGRESS */}
        <div
          className="h-2 w-full rounded-full bg-white/10"
          role="progressbar"
          aria-label="Application progress"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step}
        >
          <div
            className="h-2 rounded-full bg-white transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
        >
          {step < TOTAL_STEPS && (
            <p className="text-xs text-gray-500">
              Fields marked <span className="text-red-400">*</span> are required.
              Your progress is saved on this device.
            </p>
          )}

          {/* ───── STEP 1 ───── */}
          {step === 1 && (
            <div className="space-y-6">
              <StepHeader
                eyebrow="Applicant Information"
                title="Personal Details"
                description="Tell us who you are and which home you're applying for."
              />

              <Field
                label="Property You're Applying For"
                required
                placeholder="e.g. 123 Main St, Unit 4B, Austin, TX"
                {...bind("propertyAddress")}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Full Legal Name"
                  required
                  autoComplete="name"
                  placeholder="As shown on your ID"
                  {...bind("fullName")}
                />
                <Field
                  label="Phone Number"
                  required
                  autoComplete="tel"
                  {...bindPhone("phone")}
                />
              </div>

              <Field
                label="Email Address"
                required
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...bind("email")}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Desired Move-In Date"
                  required
                  type="date"
                  min={today || undefined}
                  {...bind("moveInDate")}
                />
                <Select
                  label="Lease Term"
                  required
                  emptyLabel="Select lease length"
                  options={LEASE_TERMS}
                  {...bind("leaseTerm")}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Driver's License / State ID No."
                  autoComplete="off"
                  placeholder="e.g. D1234567"
                  hint="Used to verify identity. Not saved on this device."
                  {...bind("licenseNumber")}
                />
                <Select
                  label="Issuing State"
                  emptyLabel="Select state"
                  options={US_STATES}
                  {...bind("licenseState")}
                />
              </div>

              <Notice title="Application Notice">
                Completing this application does not guarantee approval.
                Applications are reviewed based on rental history, income
                verification, credit profile, and landlord criteria.
              </Notice>
            </div>
          )}

          {/* ───── STEP 2 ───── */}
          {step === 2 && (
            <div className="space-y-6">
              <StepHeader
                eyebrow="Rental History"
                title="Current Residence"
                description="Tell us where you live now and who we can contact for a rental reference."
              />

              <Field
                label="Current Address"
                required
                autoComplete="street-address"
                placeholder="Street, city, state, ZIP"
                {...bind("currentAddress")}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Time at This Address"
                  required
                  placeholder="e.g. 2 years 3 months"
                  {...bind("tenancyLength")}
                />
                <Field
                  label="Current Monthly Rent"
                  inputMode="decimal"
                  placeholder="e.g. 1450"
                  hint="Enter 0 if you don't pay rent."
                  {...bind("currentRent")}
                />
              </div>

              <Checkbox
                checked={form.noLandlord === "yes"}
                onChange={(c) => update("noLandlord", c ? "yes" : "")}
              >
                I don&apos;t have a current landlord (for example, I own my home,
                live with family, or this is my first rental).
              </Checkbox>

              {form.noLandlord !== "yes" && (
                <div className="space-y-6 rounded-2xl border border-white/10 p-5">
                  <SubHeading>Current Landlord or Property Manager</SubHeading>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field
                      label="Landlord Name"
                      required
                      placeholder="Person or management company"
                      {...bind("landlordName")}
                    />
                    <Field
                      label="Landlord Phone"
                      required
                      {...bindPhone("landlordPhone")}
                    />
                  </div>

                  <Field
                    label="Landlord Email"
                    type="email"
                    placeholder="landlord@example.com"
                    {...bind("landlordEmail")}
                  />

                  <Textarea
                    label="Reason for Leaving"
                    required
                    placeholder="e.g. Relocating for work, need more space, lease ending"
                    {...bind("reasonLeaving")}
                  />
                </div>
              )}

              <Field
                label="Previous Address"
                placeholder="Street, city, state, ZIP"
                hint="Please add this if you've been at your current address for less than 2 years."
                {...bind("previousAddress")}
              />

              <Notice title="Why We Ask">
                Rental history helps us understand an applicant&apos;s tenancy
                experience and housing background.
              </Notice>
            </div>
          )}

          {/* ───── STEP 3 ───── */}
          {step === 3 && (
            <div className="space-y-6">
              <StepHeader
                eyebrow="Applicant Profile"
                title="Employment & Income"
                description="Help us understand your employment background and ability to pay rent."
              />

              <Select
                label="Employment Status"
                required
                emptyLabel="Select status"
                options={EMPLOYMENT_STATUSES}
                {...bind("employmentStatus")}
              />

              {isEmployed && (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Field
                      label="Job Title"
                      required
                      autoComplete="organization-title"
                      placeholder="e.g. Registered Nurse"
                      {...bind("occupation")}
                    />
                    <Field
                      label={
                        form.employmentStatus === "Self-employed"
                          ? "Business Name"
                          : "Employer Name"
                      }
                      required
                      autoComplete="organization"
                      placeholder={
                        form.employmentStatus === "Self-employed"
                          ? "Your business name"
                          : "Company you work for"
                      }
                      {...bind("employer")}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field
                      label="Employer Phone"
                      hint="Used only to verify employment."
                      {...bindPhone("employerPhone")}
                    />
                    <Field
                      label="Time in This Role"
                      required
                      placeholder="e.g. 3 years"
                      {...bind("employmentLength")}
                    />
                  </div>
                </>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Gross Monthly Income"
                  required
                  inputMode="decimal"
                  placeholder="e.g. 4500"
                  hint="Before taxes, in USD."
                  {...bind("income")}
                />
                <Field
                  label="Other Monthly Income"
                  inputMode="decimal"
                  placeholder="e.g. 600"
                  hint="Benefits, alimony, side work, etc."
                  {...bind("additionalIncome")}
                />
              </div>

              <Select
                label="Estimated Credit Score"
                emptyLabel="Select a range"
                options={CREDIT_RANGES}
                hint="Your own estimate. It's verified during screening."
                {...bind("creditScore")}
              />

              <Notice title="Qualification Review">
                Income, rental history, employment verification, and applicant
                disclosures may be reviewed during the screening process.
                Providing accurate information helps ensure a faster review.
              </Notice>
            </div>
          )}

          {/* ───── STEP 4 ───── */}
          {step === 4 && (
            <div className="space-y-6">
              <StepHeader
                eyebrow="Household"
                title="Occupants, Pets & Background"
                description="Tell us who will live in the home and anything the landlord should know."
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Number of Occupants"
                  required
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder="e.g. 2"
                  hint="Including yourself."
                  {...bind("numberOfOccupants")}
                />
                <Field
                  label="Vehicles"
                  placeholder="e.g. 2019 Honda Civic, TX ABC-1234"
                  hint="Make, model and plate for parking."
                  {...bind("vehicles")}
                />
              </div>

              <Textarea
                label="Other Adult Occupants"
                placeholder="Full names of everyone 18 or older who will live with you"
                {...bind("otherOccupants")}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Select
                  label="Do You Have Pets?"
                  required
                  options={YES_NO}
                  hint="Assistance animals aren't pets and don't need to be listed here."
                  {...bind("pets")}
                />
                <Select
                  label="Does Anyone in the Household Smoke?"
                  required
                  options={YES_NO}
                  {...bind("smoker")}
                />
              </div>

              {form.pets === "Yes" && (
                <Textarea
                  label="Pet Details"
                  required
                  placeholder="Type, breed, and weight of each pet, e.g. Dog, Labrador, 60 lbs"
                  {...bind("petDetails")}
                />
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <Select
                  label="Ever Been Evicted?"
                  required
                  options={YES_NO}
                  {...bind("evicted")}
                />
                <Select
                  label="Ever Broken a Lease?"
                  required
                  options={YES_NO}
                  {...bind("brokenLease")}
                />
              </div>

              {form.evicted === "Yes" && (
                <Textarea
                  label="Please Explain the Eviction"
                  required
                  placeholder="When it happened and the circumstances"
                  {...bind("evictionReason")}
                />
              )}

              {form.brokenLease === "Yes" && (
                <Textarea
                  label="Please Explain the Broken Lease"
                  required
                  placeholder="When it happened and the circumstances"
                  {...bind("brokenLeaseReason")}
                />
              )}

              <div className="space-y-6 rounded-2xl border border-white/10 p-5">
                <SubHeading>Emergency Contact</SubHeading>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    label="Full Name"
                    required
                    placeholder="Someone not living with you"
                    {...bind("emergencyName")}
                  />
                  <Field
                    label="Relationship"
                    required
                    placeholder="e.g. Sister, Friend"
                    {...bind("emergencyRelationship")}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    label="Phone Number"
                    required
                    {...bindPhone("emergencyPhone")}
                  />
                  <Field
                    label="Address"
                    placeholder="City and state is fine"
                    {...bind("emergencyAddress")}
                  />
                </div>
              </div>

              <Textarea
                label="Anything Else We Should Know?"
                placeholder="Optional: context about your application, credit, or rental history"
                {...bind("additionalNotes")}
              />
            </div>
          )}

          {/* ───── STEP 5 ───── */}
          {step === 5 && (
            <div className="space-y-6">
              <StepHeader
                eyebrow="Final Step"
                title="Review & Submit"
                description="Check your answers before paying the application fee."
              />

              <div className="space-y-4">
                {reviewSections.map((s) => (
                  <ReviewSection
                    key={s.step}
                    title={s.title}
                    rows={s.rows}
                    onEdit={() => goTo(s.step)}
                  />
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 p-5 text-center">
                <p className="text-2xl font-bold">${APPLICATION_FEE}</p>
                <p className="text-xs text-gray-400">Application fee</p>
              </div>

              <fieldset className="space-y-4">
                <legend className="sr-only">Required confirmations</legend>

                <Checkbox
                  checked={consent.accuracy}
                  onChange={(c) => {
                    setConsent((p) => ({ ...p, accuracy: c }));
                    clearError("consent");
                  }}
                >
                  I confirm the information in this application is true and
                  complete. False information may result in denial.
                </Checkbox>

                <Checkbox
                  checked={consent.screening}
                  onChange={(c) => {
                    setConsent((p) => ({ ...p, screening: c }));
                    clearError("consent");
                  }}
                >
                  I authorize the landlord or its agent to verify my information,
                  including contacting my landlord and employer and obtaining a
                  credit and background report.
                </Checkbox>

                <Checkbox
                  checked={consent.terms}
                  onChange={(c) => {
                    setConsent((p) => ({ ...p, terms: c }));
                    clearError("consent");
                  }}
                >
                  I agree to the{" "}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">
                    Terms &amp; Conditions
                  </Link>
                  ,{" "}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">
                    Refund Policy
                  </Link>
                  .
                </Checkbox>

                {errors.consent && (
                  <p className="text-xs text-red-400" role="alert">
                    {errors.consent}
                  </p>
                )}
              </fieldset>

              {submitError && (
                <p
                  className="rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-300"
                  role="alert"
                >
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Processing…" : `Pay $${APPLICATION_FEE} & Submit`}
              </button>

              <Notice title="Application Review">
                Upon successful payment, your application will be submitted for
                landlord review. Approval decisions may be based on rental
                history, employment verification, income qualification, credit
                profile, occupancy information, and other supporting details.
              </Notice>
            </div>
          )}

          {/* NAV */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                disabled={loading}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-gray-200 transition hover:border-white/40 disabled:opacity-50"
              >
                Back
              </button>
            ) : (
              <span />
            )}

            {step < TOTAL_STEPS && (
              <button
                type="submit"
                className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

// One shared style for every control. Plain border change on focus —
// no glow, no gold box-shadow.
const controlBase =
  "mt-2 w-full rounded-xl border bg-neutral-900 px-4 text-base text-white placeholder:text-white/35 [color-scheme:dark] transition-colors focus:outline-none focus-visible:border-white/70 disabled:opacity-50";

const controlBorder = (error?: string) =>
  error ? "border-red-400/70" : "border-white/15 hover:border-white/30";

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-[0.15em] text-gray-400"
      >
        {label}
        {required && (
          <span className="text-red-400" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

function Field({
  label,
  error,
  hint,
  required,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        {...props}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlBase} h-12 ${controlBorder(error)}`}
      />
    </FieldShell>
  );
}

function Select({
  label,
  error,
  hint,
  required,
  options,
  emptyLabel,
  ...props
}: BaseProps & {
  options: string[];
  emptyLabel?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        {...props}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlBase} h-12 ${controlBorder(error)}`}
      >
        {emptyLabel !== undefined && <option value="">{emptyLabel}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function Textarea({
  label,
  error,
  hint,
  required,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        {...props}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlBase} min-h-[120px] resize-y py-3 ${controlBorder(error)}`}
      />
    </FieldShell>
  );
}

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-white"
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-gray-300">
        {children}
      </label>
    </div>
  );
}

function StepHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-white">{children}</h3>;
}

function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
        {title}
      </p>
      <p className="text-sm leading-relaxed text-gray-400">{children}</p>
    </div>
  );
}

function ReviewSection({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, string][];
  onEdit: () => void;
}) {
  const filled = rows.filter(([, v]) => v.trim());
  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm text-[#d4af37] hover:underline"
        >
          Edit
        </button>
      </div>
      <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[10rem_1fr]">
        {filled.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-gray-500">{k}</dt>
            <dd className="break-words text-gray-200">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}