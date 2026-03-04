import Link from "next/link";
import { getAllProviderSummaries } from "@/lib/instagram-providers";

export default function InstagramLikesShowcase() {
  const providers = getAllProviderSummaries().slice(0, 3);
  if (providers.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest uppercase text-primary">
            Best sites to buy
          </span>
          <h2 className="text-[#111827] text-3xl md:text-4xl font-extrabold tracking-tight">
            Instagram Likes & Followers
          </h2>
          <p className="text-gray-600 mt-1">Our top-ranked providers, tested and reviewed.</p>
        </div>
        <Link
          href="/buy-instagram-likes-followers"
          className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline"
        >
          View all reviews <span aria-hidden>{">"}</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p) => (
          <Link
            key={p.slug}
            href={`/buy-instagram-likes-followers/${p.slug}`}
            className="group flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {p.image ? (
              <div className="bg-cover bg-center relative" style={{ backgroundImage: `url(${p.image})`, height: 160 }}>
                {p.rating != null && (
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-900">{p.rating.toFixed(1)}/5</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[160px] bg-gray-100 relative">
                {p.rating != null && (
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-900">{p.rating.toFixed(1)}/5</span>
                  </div>
                )}
              </div>
            )}
            <div className="p-5 flex-1">
              {p.badge ? (
                <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${p.badgeClass || "bg-primary text-white"}`}>
                  {p.badge}
                </span>
              ) : null}
              <h3 className="mt-2 text-lg font-bold text-[#111827] group-hover:underline line-clamp-2">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-3">{p.excerpt}</p>
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
