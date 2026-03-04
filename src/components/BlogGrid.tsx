'use client'

import Link from "next/link";
import { useMemo, useState } from "react";

type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
  rating?: number;
  pros?: Array<{ title: string; description: string }>;
  cons?: Array<{ title: string; description: string }>;
  pricing?: string;
};

type BlogGridProps = {
  posts: PostCard[];
  pageSize?: number; // default 9
  hrefBase?: string; // default "/blog"
};

export default function BlogGrid({ posts, pageSize = 9, hrefBase = "/blog" }: BlogGridProps) {
  const [visible, setVisible] = useState(pageSize);
  const canLoadMore = visible < posts.length;
  const items = useMemo(() => posts.slice(0, visible), [posts, visible]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((post) => (
          <Link
            key={post.slug}
            href={`${hrefBase}/${post.slug}`}
            className="group flex flex-col h-full rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative">
              {post.image ? (
                <div className="bg-cover bg-center relative" style={{ backgroundImage: `url(${post.image})`, height: 200 }}>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                  {/* Rating badge with star in top left */}
                  {(hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers") && post.rating !== undefined && (
                    <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                      <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-xs font-bold text-gray-900">{post.rating.toFixed(1)}/5</span>
                    </div>
                  )}
                  {/* Pricing badge in bottom right */}
                  {(hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers") && post.pricing && post.pricing.trim() !== "" && (
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {post.pricing}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[200px] bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                  {/* Rating badge with star in top left */}
                  {(hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers") && post.rating !== undefined && (
                    <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                      <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-xs font-bold text-gray-900">{post.rating.toFixed(1)}/5</span>
                    </div>
                  )}
                  {/* Pricing badge in bottom right */}
                  {(hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers") && post.pricing && post.pricing.trim() !== "" && (
                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                      {post.pricing}
                    </div>
                  )}
                </div>
              )}
              {post.badge && hrefBase !== "/reviews" && hrefBase !== "/buy-instagram-likes-followers" ? (
                <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.badgeClass ?? "bg-primary text-white"} z-10`}>{post.badge}</span>
              ) : null}
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-[#111827] font-bold text-lg leading-tight group-hover:text-primary transition-colors text-left">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2 text-left">{post.excerpt}</p>
              {/* Pros and Cons for reviews and Instagram providers */}
              {(hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers") && (
                <div className="mt-4 space-y-3">
                  {post.pros && post.pros.length > 0 && (
                    <div>
                      <div className="text-xs font-extrabold text-green-600 uppercase mb-2 text-left">PROS</div>
                      <div className="flex flex-wrap gap-2">
                        {post.pros.slice(0, 3).map((pro, idx) => (
                          <span key={idx} className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                            {pro.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {post.cons && post.cons.length > 0 && (
                    <div>
                      <div className="text-xs font-extrabold text-red-600 uppercase mb-2 text-left">CONS</div>
                      <div className="flex flex-wrap gap-2">
                        {post.cons.slice(0, 3).map((con, idx) => (
                          <span key={idx} className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded-full border border-red-200">
                            {con.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div
              className={`border-t border-gray-100 text-left ${
                hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers"
                  ? "px-6 py-4"
                  : "px-6 py-4 bg-blue-50 group-hover:bg-blue-100 transition-colors"
              }`}
            >
              {(hrefBase === "/reviews" || hrefBase === "/buy-instagram-likes-followers") ? (
                <span className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition-all group-hover:bg-primary/90">
                  View full review
                </span>
              ) : (
                <span className="text-sm font-medium text-blue-600">Read article</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {canLoadMore ? (
        <div className="flex justify-center">
          <button
            onClick={() => setVisible((n) => n + pageSize)}
            className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[-0.01em] hover:bg-opacity-90 transition-all"
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}


