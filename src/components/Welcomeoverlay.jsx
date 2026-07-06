import React from 'react'
import { HeartPulse, Sparkles } from 'lucide-react'

/**
 * Full-screen animated welcome overlay.
 * variant="back" -> shown after a normal login (returning user)
 * variant="new"  -> shown after a fresh registration (new user)
 */
export default function WelcomeOverlay({ variant = 'back', name }) {
  const isNew = variant === 'new'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/75 backdrop-blur-sm">
      <div
        className="relative flex flex-col items-center text-center px-8"
        style={{ animation: 'welcomePop 480ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-sky-200/40 to-primary-light/20 blur-3xl" />
        </div>

        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg flex items-center justify-center mb-5">
          {isNew ? (
            <Sparkles size={34} className="text-white" aria-hidden="true" />
          ) : (
            <HeartPulse size={34} className="text-white" aria-hidden="true" />
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight mb-2">
          {isNew ? `Welcome${name ? `, ${name}` : ''}!` : `Welcome back${name ? `, ${name}` : ''}!`}
        </h2>

        <p className="text-slate-500 text-sm max-w-xs">
          {isNew
            ? "Your account is ready — let's get your health journey started."
            : 'Great to see you again. Taking you to your dashboard…'}
        </p>
      </div>

      <style>{`
        @keyframes welcomePop {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}