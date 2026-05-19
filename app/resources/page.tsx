import Link from "next/link";

const articles = [
  {
    title: "Documents Needed Before Applying for a Rental",
    description:
      "Learn the essential documents landlords typically require before approving a rental application.",
    href: "/resources/rental-documents",
  },

  {
    title: "How Credit Scores Affect Rental Applications",
    description:
      "Understand how your credit score can influence rental approval decisions and what landlords look for.",
    href: "/resources/credit-score-rentals",
  },

  {
    title: "Tips for First-Time Renters",
    description:
      "Everything first-time renters should know before submitting a rental application.",
    href: "/resources/first-time-renters",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white px-6 py-20">

      <div className="max-w-6xl mx-auto space-y-16">

        {/* HERO */}
        <section className="space-y-6">

          <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
            Resources
          </p>

          <h1 className="text-5xl md:text-6xl font-serif leading-tight">
            Rental Insights <br />
            & Application Guides
          </h1>

          <div className="h-[2px] w-24 bg-[#d4af37]" />

          <p className="text-lg text-[#9ca3af] max-w-3xl leading-relaxed">
            Explore professional rental resources, application tips,
            and guidance designed to help tenants navigate the leasing process confidently.
          </p>

        </section>

        {/* ARTICLES */}
        <section className="grid md:grid-cols-3 gap-8">

          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group bg-[#151821] border border-white/5 rounded-3xl p-8 hover:border-[#d4af37]/40 transition"
            >

              <div className="space-y-5">

                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-xl">
                  ✦
                </div>

                <h2 className="text-2xl font-semibold group-hover:text-[#d4af37] transition">
                  {article.title}
                </h2>

                <p className="text-[#9ca3af] leading-relaxed">
                  {article.description}
                </p>

                <p className="text-[#d4af37] text-sm font-medium">
                  Read Article →
                </p>

              </div>

            </Link>
          ))}

        </section>

      </div>

    </main>
  );
}