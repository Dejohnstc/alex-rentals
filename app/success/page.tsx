"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();

  const status = params.get("status");
  const tx_ref = params.get("tx_ref");

  const email = params.get("email");
  const name = params.get("name");
  const phone = params.get("phone");
  const income = params.get("income");

  const hasSent = useRef(false); // ✅ prevent duplicate calls
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendApplication = async () => {
      if (status !== "successful" || hasSent.current) return;

      hasSent.current = true;
      setSending(true);

      try {
        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            income,
            tx_ref,
          }),
        });

        if (!res.ok) throw new Error("Failed");

        setSent(true);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setSending(false);
      }
    };

    sendApplication();
  }, [status, name, email, phone, income, tx_ref]);

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center w-full max-w-md">

      <h1 className="text-2xl font-semibold text-white mb-4">
        {status === "successful" ? "Payment Successful 🎉" : "Payment Failed"}
      </h1>

      <p className="text-gray-400 mb-4">
        {status === "successful"
          ? "Your rental application fee has been received."
          : "Something went wrong. Please try again."}
      </p>

      {status === "successful" && (
        <>
          <p className="text-xs text-gray-500 mb-2">Transaction Ref</p>
          <p className="text-xs break-all text-white mb-4">{tx_ref}</p>

          {/* ✅ STATUS FEEDBACK */}
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
              ⚠️ Payment received, but application submission failed. Please contact support.
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
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}