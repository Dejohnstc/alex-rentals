"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type ApplicationData = {
  fullName?: string;
  phone?: string;
  email?: string;
  occupation?: string;
  income?: string;
};

function SuccessContent() {
  const params = useSearchParams();

  const status = params.get("status");
  const tx_ref = params.get("tx_ref");

  const hasSent = useRef(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  // ✅ LOAD SAVED APPLICATION
  const [application] = useState<ApplicationData | null>(() => {

    if (typeof window !== "undefined") {

      const saved = localStorage.getItem(
        "rental_application"
      );

      return saved ? JSON.parse(saved) : null;
    }

    return null;
  });

  // ✅ SEND APPLICATION AFTER PAYMENT
  useEffect(() => {

    const alreadySent = sessionStorage.getItem(
      `application_sent_${tx_ref}`
    );

    const sendApplication = async () => {

      if (
        status !== "successful" ||
        hasSent.current ||
        !application ||
        alreadySent
      ) {
        return;
      }

      hasSent.current = true;

      setSending(true);

      try {

        const res = await fetch("/api/send", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: application.fullName,
            email: application.email,
            phone: application.phone,
            occupation: application.occupation,
            income: application.income,
            tx_ref,
          }),
        });

        const data = await res.json();

        console.log("SEND RESPONSE:", data);

        if (!res.ok) {
          throw new Error(
            data.error || "Submission failed"
          );
        }

        // ✅ PREVENT DUPLICATE SENDS
        sessionStorage.setItem(
          `application_sent_${tx_ref}`,
          "true"
        );

        setSent(true);

        // ✅ CLEAR SAVED FORM
        localStorage.removeItem(
          "rental_application"
        );

      } catch (err: unknown) {

        console.error(err);

        setError(true);

      } finally {

        setSending(false);

      }
    };

    sendApplication();

  }, [status, application, tx_ref]);

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center w-full max-w-md">

      <h1 className="text-2xl font-semibold text-white mb-4">
        {status === "successful"
          ? "Payment Successful 🎉"
          : "Payment Failed"}
      </h1>

      <p className="text-gray-400 mb-4">
        {status === "successful"
          ? "Your rental application fee has been received."
          : "Something went wrong. Please try again."}
      </p>

      {status === "successful" && (
        <>

          <p className="text-xs text-gray-500 mb-2">
            Transaction Ref
          </p>

          <p className="text-xs break-all text-white mb-4">
            {tx_ref}
          </p>

          {/* ✅ STATUS */}
          {sending && (
            <p className="text-sm text-gray-400">
              Submitting your application...
            </p>
          )}

          {sent && (
            <p className="text-sm text-green-400">
              ✅ Application submitted successfully
            </p>
          )}

          {error && (
            <p className="text-sm text-red-400">
              ⚠️ Payment received, but application submission failed.
              Please contact support.
            </p>
          )}

        </>
      )}

      <Link
        href="/"
        className="inline-block mt-6 bg-white text-black px-6 py-2 rounded-xl hover:bg-gray-200 transition"
      >
        Back to Home
      </Link>

    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">

      <Suspense
        fallback={
          <p className="text-white">
            Loading...
          </p>
        }
      >
        <SuccessContent />
      </Suspense>

    </main>
  );
}