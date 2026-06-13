import { agent } from "@/config/agent";
export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
            Legal
          </p>

          <h1 className="text-5xl font-serif mt-3">
            Privacy Policy
          </h1>

          <div className="h-[2px] w-20 bg-[#d4af37] mt-5" />

          <p className="text-sm text-[#9ca3af] mt-6">
            Last updated: {new Date().getFullYear()}
          </p>

        </div>

        {/* CONTENT */}
        <section className="space-y-10 text-[15px] leading-relaxed text-[#d1d5db]">

          <div className="space-y-3">

            <p>
              {agent.company} (“we”, “our”, or “us”) values your privacy
              and is committed to protecting your personal information.
            </p>

            <p>
              This Privacy Policy explains how we collect, use,
              and safeguard your information when using our website
              and rental application services.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Information We Collect
            </h2>

            <p>
              We may collect personal information including your name,
              phone number, email address, rental application details,
              and payment information submitted through our website.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              How We Use Your Information
            </h2>

            <p>
              Information submitted through this website is used to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-[#9ca3af]">

              <li>Process rental applications</li>

              <li>Verify applicant information</li>

              <li>Communicate application updates</li>

              <li>Confirm payment transactions</li>

              <li>Improve website functionality and security</li>

            </ul>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Payment Security
            </h2>

            <p>
              Payments are securely processed through trusted
              third-party payment providers. We do not store
              or have direct access to your card information.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Data Sharing
            </h2>

            <p>
              We do not sell, rent, or distribute personal information.
              Information may only be shared with payment providers,
              property owners, or when legally required.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Cookies & Advertising
            </h2>

            <p>
              This website may use cookies, analytics tools,
              and advertising services such as Google AdSense
              to improve user experience and display relevant content.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Your Rights
            </h2>

            <p>
              You may request access, correction, or deletion
              of your personal information by contacting us directly.
            </p>

          </div>

          <div className="space-y-3">

            <h2 className="text-2xl font-semibold text-white">
              Contact
            </h2>

            <p>
              For privacy-related questions or concerns:
            </p>

            <p className="text-[#d4af37] font-medium">
               {agent.email}
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}