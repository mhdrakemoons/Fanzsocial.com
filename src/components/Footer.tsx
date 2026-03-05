"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaReddit } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const year = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If it's the same page, just scroll to top
    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to different page - router will trigger ScrollToTop component
      router.push(href);
    }
  };

  return (
    <footer className="relative mt-8">
      <div className="w-full max-w-[87.5rem] mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm px-6 md:px-8 py-6">
          {/* Mobile: Logo, Nav, Reddit | Desktop: Logo left, Nav centered, Reddit right */}
          <div className="flex flex-col md:flex-row md:relative gap-5 md:gap-6 items-start md:items-center">
            {/* Logo */}
            <div className="flex w-full md:w-auto items-center justify-start">
              <Link 
                href="/" 
                onClick={(e) => handleNavClick(e, "/")}
                className="flex items-center gap-2.5 text-[#111827] hover:opacity-80 transition-opacity"
              >
                <div className="text-primary size-6 flex items-center justify-center flex-shrink-0">
                  <svg 
                    fill="currentColor" 
                    viewBox="0 0 48 48" 
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="w-6 h-6"
                  >
                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" />
                  </svg>
                </div>
                <span className="text-base font-bold tracking-tight">Fanzsocial</span>
              </Link>
            </div>
            {/* Navigation Links - Desktop: Centered */}
            <nav className="flex flex-wrap items-center gap-0.5 md:gap-1.5 rounded-full border border-gray-200 bg-white/80 p-1 md:p-1.5 backdrop-blur-sm shadow-sm md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-2 md:px-4 py-1.5 rounded-full" 
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
              >
                Home
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-2 md:px-4 py-1.5 rounded-full" 
                href="/buy-instagram-likes-followers"
                onClick={(e) => handleNavClick(e, "/buy-instagram-likes-followers")}
              >
                Buy Instagram
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-2 md:px-4 py-1.5 rounded-full" 
                href="/buy-youtube-views-likes-comments"
                onClick={(e) => handleNavClick(e, "/buy-youtube-views-likes-comments")}
              >
                Buy YouTube
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-2 md:px-4 py-1.5 rounded-full" 
                href="/buy-twitter-likes-comments-followers"
                onClick={(e) => handleNavClick(e, "/buy-twitter-likes-comments-followers")}
              >
                Buy Twitter
              </Link>
              <Link 
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-2 md:px-4 py-1.5 rounded-full" 
                href="/reviews"
                onClick={(e) => handleNavClick(e, "/reviews")}
              >
                Reviews
              </Link>
            </nav>
            {/* Reddit community block */}
            <div className="flex flex-col w-full md:w-auto md:max-w-[280px] md:ml-auto rounded-xl border border-gray-200 bg-gray-50/80 p-4 border-l-4 border-l-[#FF4500]">
              <FaReddit className="w-8 h-8 text-[#FF4500] flex-shrink-0" aria-hidden />
              <h3 className="text-sm font-semibold text-gray-900 mt-2">Join our community</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Connect with creators and brands on Reddit. Share tips, ask questions, and stay in the loop with r/FanzSocial.
              </p>
              <a
                href="https://www.reddit.com/r/FanzSocial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit r/FanzSocial on Reddit"
                className="mt-3 inline-flex items-center justify-center rounded-full border-2 border-[#FF4500] px-4 py-2 text-sm font-medium text-[#FF4500] hover:bg-[#FF4500] hover:text-white transition-colors w-fit"
              >
                Visit r/FanzSocial
              </a>
            </div>
          </div>
          {/* Privacy Policy and Terms of Service - Mobile only */}
          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-600 md:hidden">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <span className="text-gray-300" aria-hidden>•</span>
            <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
          </div>
          {/* Copyright - Mobile only */}
          <div className="mt-3 text-xs text-gray-500 text-center md:hidden">
            © {year} Fanzsocial. All rights reserved.
          </div>
          {/* Desktop: Privacy/TOS and Copyright row */}
          <div className="mt-4 hidden md:flex items-center justify-between relative">
            <div className="text-xs text-gray-500">
              © {year} Fanzsocial. All rights reserved.
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-sm text-gray-600">
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              <span className="text-gray-300" aria-hidden>•</span>
              <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
