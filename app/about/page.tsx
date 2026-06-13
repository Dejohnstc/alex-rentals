import { agent } from "@/config/agent";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-5xl mx-auto space-y-20">

        {/* HERO */}
        <section className="space-y-6">

          <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
            About {agent.company}
          </p>

          <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            A Premium Rental <br />
            Experience Built on Trust
          </h1>

          <div className="h-[2px] w-24 bg-[#d4af37]" />

          <p className="text-lg text-[#9ca3af] max-w-3xl leading-relaxed">
            {agent.name} provides secure and professional rental application
            services designed to simplify the leasing process for tenants,
            property owners, and investors across the United States.
          </p>

        </section>

        {/* GRID */}
        <section className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="bg-[#151821] border border-white/5 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-4">
                Our Mission
              </h2>

              <p className="text-[#9ca3af] leading-relaxed">
                We believe rental applications should be simple,
                transparent, and secure. Our goal is to modernize
                the application process while maintaining professionalism,
                trust, and efficiency.
              </p>

            </div>

            <div className="bg-[#151821] border border-white/5 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-4">
                What We Offer
              </h2>

              <ul className="space-y-3 text-[#9ca3af]">

                <li>✔ Secure online rental applications</li>

                <li>✔ Fast application processing</li>

                <li>✔ Professional tenant screening</li>

                <li>✔ Trusted communication and support</li>

                <li>✔ Modern digital application experience</li>

              </ul>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="absolute inset-0 bg-[#d4af37]/10 blur-3xl rounded-full" />

            <div className="relative bg-gradient-to-br from-[#1a1d24] to-[#151821] border border-white/5 rounded-3xl p-10 h-full flex flex-col justify-between">

              <div className="space-y-6">

                <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
                  Why Clients Trust Us
                </p>

                <h2 className="text-4xl font-serif leading-tight">
                  Professionalism. <br />
                  Transparency. <br />
                  Results.
                </h2>

                <p className="text-[#9ca3af] leading-relaxed">
                  Every application is handled with care,
                  confidentiality, and attention to detail.
                  Our commitment is to provide a seamless
                  rental experience built around trust and security.
                </p>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 mt-10">

                <div className="bg-white/5 rounded-xl p-5">

                  <p className="text-3xl font-semibold">
                    262+
                  </p>

                  <p className="text-sm text-[#9ca3af] mt-1">
                    Homes Closed
                  </p>

                </div>

                <div className="bg-white/5 rounded-xl p-5">

                  <p className="text-3xl font-semibold">
                    98%
                  </p>

                  <p className="text-sm text-[#9ca3af] mt-1">
                    Approval Rate
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CONTACT STRIP */}
        <section className="bg-[#151821] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
              Contact
            </p>

            <h3 className="text-2xl font-semibold mt-2">
              Ready to Start Your Application?
            </h3>

          </div>

          <a
            href={`mailto:${agent.email}?subject=Rental Inquiry`}
            className="bg-[#d4af37] text-black px-8 py-4 rounded-xl font-medium hover:bg-[#c9a531] transition"
          >
            Get in Touch
          </a>

        </section>

      </div>

    </main>
  );
}