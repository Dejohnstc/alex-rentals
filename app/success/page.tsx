"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {

  const params = useSearchParams();

  const status = params.get("status");
  const tx_ref = params.get("tx_ref");

  const hasSent = useRef(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  // ✅ LOAD FULL APPLICATION FROM LOCAL STORAGE
  const [application] = useState(() => {

    if (typeof window === "undefined") {
      return null;
    }

    const saved =
      localStorage.getItem(
        "rental_application"
      );

    return saved
      ? JSON.parse(saved)
      : null;

  });

  useEffect(() => {

    const alreadySent =
      sessionStorage.getItem(
        `application_sent_${tx_ref}`
      );

    const sendApplication =
      async () => {

        if (
          status !== "successful" ||
          hasSent.current ||
          alreadySent
        ) {
          return;
        }

        if (!application) {

          setError(
            "Application data not found."
          );

          return;
        }

        hasSent.current = true;

        setSending(true);

        try {

          const res =
            await fetch(
              "/api/send",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  ...application,
                  tx_ref,
                }),
              }
            );

          const data =
            await res.json();

          console.log(
            "SEND RESPONSE:",
            data
          );

          if (!res.ok) {

            throw new Error(
              data.error ||
              "Submission failed"
            );
          }

          sessionStorage.setItem(
            `application_sent_${tx_ref}`,
            "true"
          );

          setSent(true);

          // OPTIONAL CLEANUP
          localStorage.removeItem(
            "rental_application"
          );

        } catch (err) {

          console.error(err);

          setError(
            err instanceof Error
              ? err.message
              : "Submission failed"
          );

        } finally {

          setSending(false);

        }
      };

    sendApplication();

  }, [
    status,
    tx_ref,
    application,
  ]);

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
              ⚠️ {error}
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