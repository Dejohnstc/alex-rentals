export default function Privacy() {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().getFullYear()}
        </p>

        <section className="space-y-5 text-sm leading-relaxed">
          <p>
           Alex Rentals (referred to as &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values your privacy and is committed to protecting your personal information.
          </p>

          <h2 className="text-lg font-semibold mt-6">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address,
            and payment details when you submit a rental application or make a payment.
          </p>

          <h2 className="text-lg font-semibold mt-6">How We Use Your Information</h2>
          <p>
            Your information is used to process rental applications, confirm payments,
            and communicate with you regarding your application status.
          </p>

          <h2 className="text-lg font-semibold mt-6">Payment Security</h2>
          <p>
            All payments are securely processed through third-party payment providers.
            We do not store or have access to your card details.
          </p>

          <h2 className="text-lg font-semibold mt-6">Data Sharing</h2>
          <p>
            We do not sell or rent your personal information. Data may only be shared
            with payment providers or when required by law.
          </p>

          <h2 className="text-lg font-semibold mt-6">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting us.
          </p>

          <h2 className="text-lg font-semibold mt-6">Contact</h2>
          <p>
            For questions regarding this policy, contact:
            <br />
            <strong>alexsobieskki@gmail.com</strong>
          </p>
        </section>

      </div>
    </main>
  );
}