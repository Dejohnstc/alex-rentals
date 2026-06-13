import Link from "next/link";
import { agent } from "@/config/agent";
const articles = [
  {
    title: "Documents Needed Before Applying for a Rental",
    description:
      "Learn the essential documents landlords typically require before approving a rental application.",
    href: "/resources/rental-documents",
    image: "/rental-documents.jpg",
    category: "Application Guide",
    readTime: "5 min read",
  },

  {
    title: "How Credit Scores Affect Rental Applications",
    description:
      "Understand how your credit score can influence rental approval decisions and what landlords look for.",
    href: "/resources/credit-score-rentals",
    image: "/credit-score.jpg",
    category: "Credit Guide",
    readTime: "5 min read",
  },

  {
    title: "Tips for First-Time Renters",
    description:
      "Everything first-time renters should know before submitting a rental application.",
    href: "/resources/first-time-renters",
    image: "/first-renter.jpg",
    category: "Beginner Guide",
    readTime: "6 min read",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[#d4af37]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 space-y-24">

        {/* HERO */}
        <section className="text-center space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-[#9ca3af]">

            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />

            Rental Resources

          </div>

          <h1 className="text-5xl md:text-7xl font-serif leading-[1.05] tracking-tight max-w-5xl mx-auto">

            Rental Insights <br />

            <span className="text-[#d4af37]">
              & Application Guides
            </span>

          </h1>

          <p className="text-lg md:text-xl text-[#9ca3af] max-w-3xl mx-auto leading-relaxed">
            Explore premium rental resources, tenant guidance,
            and expert insights designed to help applicants
            navigate the leasing process with confidence.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-6">

            <div>

              <p className="text-3xl font-semibold">
                3+
              </p>

              <p className="text-sm text-[#9ca3af]">
                Expert Guides
              </p>

            </div>

            <div className="w-px h-10 bg-white/10" />

            <div>

              <p className="text-3xl font-semibold">
                100+
              </p>

              <p className="text-sm text-[#9ca3af]">
                Applications Reviewed
              </p>

            </div>

            <div className="w-px h-10 bg-white/10" />

            <div>

              <p className="text-3xl font-semibold">
                98%
              </p>

              <p className="text-sm text-[#9ca3af]">
                Client Satisfaction
              </p>

            </div>

          </div>

        </section>

        {/* FEATURED */}
        <section className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">

          {/* MAIN FEATURED */}
          <Link
            href="/resources/rental-documents"
            className="group relative rounded-[32px] overflow-hidden border border-white/5 min-h-[520px]"
          >

            <img
              src="/rental-documents.jpg"
              alt="Rental Documents"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative h-full flex flex-col justify-end p-10">

              <div className="flex items-center gap-3 text-sm text-[#d4af37] mb-5">

                <span>
                  Featured Guide
                </span>

                <span>•</span>

                <span>
                  5 min read
                </span>

              </div>

              <h2 className="text-4xl md:text-5xl font-serif leading-tight max-w-2xl group-hover:text-[#d4af37] transition">
                Documents Needed Before Applying for a Rental
              </h2>

              <p className="text-[#d1d5db] text-lg leading-relaxed max-w-2xl mt-6">
                Prepare the right documents before applying and dramatically
                improve your approval speed.
              </p>

            </div>

          </Link>

          {/* SIDE FEATURED */}
          <div className="space-y-8">

            {articles.slice(1).map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex gap-5 bg-[#151821] border border-white/5 rounded-3xl p-5 hover:border-[#d4af37]/30 transition"
              >

                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">

                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

                <div className="flex flex-col justify-between">

                  <div>

                    <div className="flex items-center gap-2 text-xs text-[#9ca3af] uppercase tracking-widest">

                      <span>
                        {article.category}
                      </span>

                      <span>•</span>

                      <span>
                        {article.readTime}
                      </span>

                    </div>

                    <h3 className="text-2xl font-semibold mt-3 group-hover:text-[#d4af37] transition leading-snug">
                      {article.title}
                    </h3>

                  </div>

                  <p className="text-[#9ca3af] text-sm mt-4 leading-relaxed">
                    {article.description}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* ALL ARTICLES */}
        <section className="space-y-10">

          <div className="flex items-end justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
                Explore
              </p>

              <h2 className="text-4xl md:text-5xl font-serif mt-2">
                Latest Resources
              </h2>

            </div>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group bg-[#151821] border border-white/5 rounded-[28px] overflow-hidden hover:border-[#d4af37]/40 transition"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-700"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-8 space-y-5">

                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#9ca3af]">

                    <span>
                      {article.category}
                    </span>

                    <span>•</span>

                    <span>
                      {article.readTime}
                    </span>

                  </div>

                  <h3 className="text-3xl font-serif leading-tight group-hover:text-[#d4af37] transition">
                    {article.title}
                  </h3>

                  <p className="text-[#9ca3af] leading-relaxed">
                    {article.description}
                  </p>

                  <div className="pt-3">

                    <span className="inline-flex items-center gap-2 text-[#d4af37] font-medium">

                      Read Article

                      <span className="group-hover:translate-x-1 transition">
                        →
                      </span>

                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/5 bg-[#151821] px-8 md:px-14 py-16">

          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#d4af37]/10 blur-3xl rounded-full" />

          <div className="relative max-w-4xl">

            <p className="text-sm tracking-widest text-[#9ca3af] uppercase">
              Need Assistance?
            </p>

            <h2 className="text-4xl md:text-6xl font-serif leading-tight mt-5">
              Ready to Start <br />
              Your Rental Application?
            </h2>

            <p className="text-lg text-[#9ca3af] leading-relaxed mt-6 max-w-2xl">
              Begin your secure rental application process with
              professional support and fast review processing.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/apply"
                className="bg-[#d4af37] text-black px-8 py-4 rounded-2xl font-semibold hover:bg-[#c9a531] transition"
              >
                Start Application
              </Link>

              <a
                href={`mailto:${agent.email}?subject=Rental Inquiry`}
                className="border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/5 transition"
              >
                Contact Agent
              </a>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}