import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Activity, LogOut, HeartCrack, X,
  Home, LayoutDashboard, Info, Phone,
  Settings, LifeBuoy, ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleConfirmLogout = () => {
    setShowLogoutModal(false)
    closeMenu()
    logout()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    ...(user ? [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }] : []),
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Phone },
  ]

  const secondaryLinks = [
    { to: '#', label: 'Settings', icon: Settings },
    { to: '#', label: 'Help & Support', icon: LifeBuoy },
    { to: '#', label: 'Privacy Policy', icon: ShieldCheck },
  ]

  const isActive = (to) => location.pathname === to

  return (
    <>
      <style>{`
        @keyframes navSlideInRTL {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes modalPopIn {
          from { opacity: 0; transform: translateY(16px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* staggered entrance for drawer menu items — slide right -> left to match the drawer */
        @keyframes itemFadeUp {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .anim-nav    { animation: navSlideInRTL 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .anim-modal  { animation: modalPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .anim-overlay{ animation: overlayFadeIn 0.2s ease-out; }
        .drawer-item { opacity: 0; animation: itemFadeUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .anim-nav, .anim-modal, .anim-overlay { animation: none; }
          .drawer-item { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ============ FIXED TOP NAVBAR ============ */}
      <nav className="fixed top-4 inset-x-0 z-50 px-4">
        <div
          className="anim-nav relative max-w-5xl mx-auto rounded-full
                     bg-white/30 backdrop-blur-2xl backdrop-saturate-150
                     border border-white/40
                     shadow-[0_8px_32px_rgba(2,132,199,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full
                       bg-gradient-to-b from-white/50 via-white/10 to-transparent opacity-60"
          />

          <div className="relative px-3 py-2 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2 font-semibold text-navy pl-2">
              <span className="w-9 h-9 rounded-full bg-gradient-to-b from-sky-400 to-primary-dark
                               flex items-center justify-center
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_2px_6px_rgba(2,132,199,0.35)]">
                <Activity className="text-white" size={18} strokeWidth={2.5} />
              </span>
              <span className="tracking-tight text-sm sm:text-base">
                SUBA <span className="text-primary-dark">Health Care</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5 text-sm font-medium text-slate-600
                            bg-white/25 border border-white/30 rounded-full px-1.5 py-1
                            shadow-[inset_0_1px_2px_rgba(2,132,199,0.06)]">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-1.5 rounded-full transition-all
                              ${isActive(l.to)
                                ? 'bg-white/80 text-primary-dark font-semibold shadow-sm'
                                : 'hover:bg-white/70 hover:text-navy hover:shadow-sm'}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-2 pr-1">
              {user ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-danger
                             px-4 py-1.5 rounded-full border border-danger/20 bg-danger/5
                             hover:bg-danger hover:text-white transition-all active:scale-[0.97]"
                >
                  <LogOut size={15} /> Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-slate-600 hover:text-navy
                               px-4 py-1.5 rounded-full hover:bg-white/70 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold text-white px-5 py-2 rounded-full
                               bg-gradient-to-b from-sky-400 to-primary-dark
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(2,132,199,0.35)]
                               hover:brightness-105 active:scale-[0.97] transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Morphing hamburger ⇄ X (mobile only) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full
                         bg-white/40 border border-white/40 text-navy
                         hover:bg-white/70 active:scale-95 transition-all"
            >
              <span className="relative block w-5 h-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 w-5 h-[2px] bg-navy rounded-full
                              transition-all duration-300 ease-in-out origin-center
                              ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                />
                <span
                  className={`absolute left-0 top-[7px] w-5 h-[2px] bg-navy rounded-full
                              transition-all duration-300 ease-in-out
                              ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
                />
                <span
                  className={`absolute left-0 top-[14px] w-5 h-[2px] bg-navy rounded-full
                              transition-all duration-300 ease-in-out origin-center
                              ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ============ MOBILE DRAWER — premium glass sidebar, slides from the left ============ */}
      {/* dark translucent backdrop */}
      <div
        onClick={closeMenu}
        className={`md:hidden fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px]
                    transition-opacity duration-300
                    ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* drawer panel — slides in from the RIGHT (right to left) */}
      <aside
        aria-hidden={!menuOpen}
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[70]
                    w-[85%] max-w-[320px] rounded-l-3xl
                    bg-white/[0.65] backdrop-blur-[18px] backdrop-saturate-150
                    border-l border-white/60
                    shadow-[0_10px_40px_rgba(15,23,42,0.08)]
                    flex flex-col
                    transform transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* ---- Header (compact, 60px) ---- */}
        <div className="h-[60px] shrink-0 px-5 flex items-center justify-between border-b border-slate-900/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-b from-sky-400 to-primary-dark
                             flex items-center justify-center
                             shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
              <Activity className="text-white" size={15} strokeWidth={2.5} />
            </span>
            <span className="text-[18px] font-semibold text-navy tracking-tight">
              SUBA <span className="text-primary-dark">Health Care</span>
            </span>
          </div>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-full
                       bg-slate-900/[0.04] text-slate-500
                       hover:bg-slate-900/[0.08] hover:text-navy
                       active:scale-95 transition-all duration-200"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* ---- Primary navigation: one grouped container with dividers ---- */}
        <div className="px-5 pt-6">
          <div className="rounded-2xl bg-white/50 border border-white/70 overflow-hidden
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
                          divide-y divide-slate-900/[0.05]">
            {navLinks.map((l, i) => {
              const active = isActive(l.to)
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeMenu}
                  style={menuOpen ? { animationDelay: `${80 + i * 50}ms` } : undefined}
                  className={`drawer-item group relative flex items-center gap-3 h-12 px-4
                              text-[16px] transition-colors duration-200
                              ${active
                                ? 'bg-sky-50/80 text-primary-dark font-semibold'
                                : 'text-slate-600 font-medium hover:bg-white/70 hover:text-navy'}`}
                >
                  {/* left blue accent bar for active page */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full
                                bg-primary-dark transition-opacity duration-200
                                ${active ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <l.icon
                    size={19}
                    strokeWidth={active ? 2.4 : 2}
                    className={`transition-all duration-200
                                ${active ? 'text-primary-dark' : 'text-slate-400 group-hover:text-navy'}
                                group-hover:translate-x-[2px]`}
                  />
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* ---- Secondary section ---- */}
        <div className="px-5 pt-5">
          <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            More
          </p>
          <div className="flex flex-col">
            {secondaryLinks.map((l, i) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={closeMenu}
                style={menuOpen ? { animationDelay: `${300 + i * 50}ms` } : undefined}
                className="drawer-item group flex items-center gap-3 h-11 px-3 rounded-[14px]
                           text-[15px] font-medium text-slate-500
                           hover:bg-white/70 hover:text-navy
                           transition-colors duration-200"
              >
                <l.icon
                  size={18}
                  strokeWidth={2}
                  className="text-slate-400 group-hover:text-navy transition-all duration-200 group-hover:translate-x-[2px]"
                />
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* flexible spacer pushes actions to the bottom */}
        <div className="flex-1" />

        {/* ---- Bottom actions: pinned ---- */}
        <div className="px-5 pb-6 pt-4 border-t border-slate-900/[0.06]">
          {user ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="group w-full flex items-center gap-3 h-12 px-4 rounded-[14px]
                         text-[16px] font-medium text-danger bg-danger/[0.06]
                         hover:bg-danger/10 active:scale-[0.98]
                         transition-all duration-200"
            >
              <LogOut
                size={19}
                strokeWidth={2}
                className="text-danger transition-transform duration-200 group-hover:translate-x-[2px]"
              />
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full h-12 flex items-center justify-center rounded-[14px]
                           text-[16px] font-semibold text-white
                           bg-gradient-to-b from-sky-400 to-primary-dark
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(2,132,199,0.3)]
                           hover:brightness-105 active:scale-[0.98] transition-all duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full h-12 flex items-center justify-center rounded-[14px]
                           text-[16px] font-medium text-slate-600
                           hover:bg-white/70 hover:text-navy
                           transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ============ LOGOUT CONFIRMATION POPUP ============ */}
      {showLogoutModal && (
        <div
          className="anim-overlay fixed inset-0 z-[100] flex items-center justify-center px-4
                     bg-navy/30 backdrop-blur-sm"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            onClick={(e) => e.stopPropagation()}
            className="anim-modal relative w-full max-w-sm rounded-3xl
                       bg-white/80 backdrop-blur-2xl backdrop-saturate-150
                       border border-white/60
                       shadow-[0_24px_60px_rgba(2,132,199,0.25),inset_0_1px_0_rgba(255,255,255,0.7)]
                       p-7 text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-b from-sky-100 to-sky-200
                            flex items-center justify-center mb-4
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <HeartCrack className="text-primary-dark" size={30} />
            </div>

            <h3 id="logout-title" className="text-lg font-bold text-navy mb-1.5">
              Leaving so soon?
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              You don't like the SUBA project? It's okay...
              <br />
              we'll miss you — come back anytime!
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white
                           bg-gradient-to-b from-sky-400 to-primary-dark
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(2,132,199,0.35)]
                           hover:brightness-105 active:scale-[0.97] transition-all"
              >
                Stay
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold text-danger
                           bg-danger/5 border border-danger/25
                           hover:bg-danger hover:text-white active:scale-[0.97] transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}