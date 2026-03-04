import Link from "next/link";
import { getAllProviderSummaries } from "@/lib/instagram-providers";
import { FaStar } from "react-icons/fa6";

export default function ReviewsShowcase() {
  const reviews = getAllProviderSummaries().slice(0, 3);

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">
            Honest Reviews
          </span>
          <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">
            We test platforms so you don&apos;t have to
          </h2>
          <p className="text-gray-600 mt-1">
            Unbiased reviews of the best places to buy Instagram likes, YouTube followers, and more.
          </p>
        </div>
        <Link href="/reviews" className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline">
          See all reviews <span aria-hidden>{">"}</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <Link
            key={r.slug}
            href={`/reviews/${r.slug}`}
            className="group relative flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {r.image ? (
              <div className="relative">
                <div className="bg-cover bg-center" style={{ backgroundImage: `url(${r.image})`, height: 160 }} />
                {r.rating != null && (
                  <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-900">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold">{r.rating.toFixed(1)}/5</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative h-[160px] bg-gray-100">
                {r.rating != null && (
                  <div className="absolute top-3 left-3 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-gray-900">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold">{r.rating.toFixed(1)}/5</span>
                  </div>
                )}
              </div>
            )}
            <div className="p-5 flex-1">
              {r.badge ? (
                <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${r.badgeClass || "bg-gray-900 text-white"}`}>
                  {r.badge}
                </span>
              ) : null}
              <h3 className="mt-2 text-lg font-bold text-[#111827] group-hover:underline line-clamp-2">
                {idx + 1}. {r.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-3">{r.excerpt}</p>
              {r.pros && r.pros.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-extrabold text-green-600 uppercase">Pros</div>
                  <div className="flex flex-wrap gap-2">
                    {r.pros.slice(0, 3).map((pro, i) => (
                      <span key={i} className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                        {pro.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <span className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition-all group-hover:bg-primary/90">
                View full review
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
