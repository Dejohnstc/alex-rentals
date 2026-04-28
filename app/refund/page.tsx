export default function Refund() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-semibold mb-6">Refund Policy</h1>

        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().getFullYear()}
        </p>

        <section className="space-y-5 text-sm leading-relaxed">

          <p>
            All payments made for rental application fees are final and non-refundable.
          </p>

          <h2 className="text-lg font-semibold mt-6">Non-Refundable Fees</h2>
          <p>
            The application fee covers administrative costs associated with reviewing
            and processing your rental application. Once submitted, this fee cannot be refunded.
          </p>

          <h2 className="text-lg font-semibold mt-6">Exceptions</h2>
          <p>
            Refunds may only be issued in cases of duplicate payments or verified
            technical errors.
          </p>

          <h2 className="text-lg font-semibold mt-6">Processing Errors</h2>
          <p>
            If you believe you were charged incorrectly, please contact us immediately
            so we can investigate the issue.
          </p>

          <h2 className="text-lg font-semibold mt-6">Contact</h2>
          <p>
            For refund-related inquiries, contact:
            <br />
            <strong>alexsobieskki@gmail.com</strong>
          </p>

        </section>

      </div>
    </main>
  );
}