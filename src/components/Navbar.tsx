'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const BEST_SITES_LINKS = [
  { href: '/buy-instagram-likes-followers', label: 'Buy Instagram likes and followers' },
  { href: '/buy-youtube-views-likes-comments', label: 'Buy YouTube views, likes and comments' },
  { href: '/buy-twitter-likes-comments-followers', label: 'Buy Twitter likes, comments and followers' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBestSitesOpen, setIsBestSitesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsBestSitesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header className="relative z-30 flex items-center justify-between whitespace-nowrap px-0 py-4 md:px-4 bg-white/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur border border-gray-100 rounded-xl">
        <Link className="flex items-center gap-2.5 text-[#111827] pl-4 md:pl-0" href="/" onClick={closeMenu}>
          <div className="text-primary w-6 h-6 flex items-center justify-center flex-shrink-0">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
            </svg>
          </div>
          <h2 className="text-[#111827] text-lg font-bold leading-tight tracking-[-0.015em]">Fanzsocial</h2>
        </Link>
        <nav className="hidden md:flex flex-1 justify-end">
          <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 p-1.5 backdrop-blur-sm shadow-sm">
            <Link className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full" href="/reviews">
              Reviews
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsBestSitesOpen(!isBestSitesOpen)}
                onBlur={() => setTimeout(() => setIsBestSitesOpen(false), 150)}
                className="text-slate-800 text-sm font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full flex items-center gap-1"
                aria-expanded={isBestSitesOpen}
                aria-haspopup="true"
              >
                Best sites
                <span className={`material-symbols-outlined text-base transition-transform ${isBestSitesOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {isBestSitesOpen && (
                <div className="absolute top-full left-0 mt-1 min-w-[220px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-50">
                  {BEST_SITES_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-slate-800 hover:bg-gray-100 transition-colors text-left"
                      onClick={() => setIsBestSitesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
        <button
          className="md:hidden p-2 pr-4"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="material-symbols-outlined text-3xl text-[#111827]">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={closeMenu}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#111827]">Menu</h3>
                <button onClick={closeMenu} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu">
                  <span className="material-symbols-outlined text-2xl text-[#111827]">close</span>
                </button>
              </div>
              <nav className="flex-1 p-4 overflow-auto">
                <div className="flex flex-col gap-2">
                  <Link href="/reviews" onClick={closeMenu} className="text-slate-800 text-base font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-3 rounded-lg">
                    Reviews
                  </Link>
                  <div className="pt-2 pb-1">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">Best sites</div>
                    <div className="flex flex-col gap-1">
                      {BEST_SITES_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenu}
                          className="text-slate-800 text-base font-medium leading-normal hover:bg-gray-100 transition-colors px-4 py-3 rounded-lg pl-6"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
