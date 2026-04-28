"use client";

import { Suspense, useEffect } from "react";
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

  useEffect(() => {
    if (status === "successful") {
      fetch("/api/send", {
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
    }
  }, []);

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

          <p className="text-sm text-gray-400">
            Your application has been submitted successfully.
          </p>
        </>
      )}

      <Link
        href="/"
        className="inline-block mt-6 bg-white text-black px-6 py-2 rounded-xl"
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