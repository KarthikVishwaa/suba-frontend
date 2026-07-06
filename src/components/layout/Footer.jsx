import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  FileText,
  Bone,
  Bot,
  LayoutDashboard,
  HeartPulse,
  Flame,
  Mail,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react'

const QUICK_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/blood-report', label: 'Blood Report Analyzer', icon: FileText },
  { to: '/xray', label: 'X-Ray Analyzer', icon: Bone },
  { to: '/health-assessment', label: 'Health Assessment', icon: HeartPulse },
  { to: '/calorie-counter', label: 'Calorie Counter', icon: Flame },
  { to: '/assistant', label: 'AI Health Assistant', icon: Bot },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-navy text-slate-300 mt-16 overflow-hidden">
      {/* top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />

      {/* subtle decorative glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-sky-400/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="text-white" size={18} aria-hidden="true" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              SUBA Health Care
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-xs">
            AI-Powered Healthcare Analytics Platform — understand your reports,
            track your health, and get answers in plain language.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.slice(0, 3).map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Icon size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Health Tools
          </h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.slice(3).map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Icon size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Developer / contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Developed by
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap size={15} className="text-primary" aria-hidden="true" />
              </div>
              <p className="text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-medium">Suba</span>
                <br />
                Computer Science &amp; Engineering
                <br />
                Annapoorana Engineering College
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors"
            >
              <Mail size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              Contact us
              <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {year} SUBA Health Care Service. All Rights Reserved.</p>
          <p className="text-slate-600">
            For educational purposes only — not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}