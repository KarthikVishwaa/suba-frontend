import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Cake,
  Users,
  Ruler,
  Loader2,
  AlertCircle,
  HeartPulse,
} from 'lucide-react'
import WelcomeOverlay from "../components/WelcomeOverlay";

export default function Register() {
  const { register, user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: 'male', height_cm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ ...form, age: Number(form.age), height_cm: Number(form.height_cm) })
      setAuthSuccess(true) // shows WelcomeOverlay below, then redirects
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      setLoading(false)
    }
  }

  // Redirect after the welcome animation, regardless of whether `user`
  // populates in time — this guarantees navigation always happens.
  useEffect(() => {
    if (!authSuccess) return
    const t = setTimeout(() => navigate('/dashboard'), 1400)
    return () => clearTimeout(t)
  }, [authSuccess, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50 relative overflow-hidden">
      {/* decorative background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-200/25 to-primary-light/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-tr from-primary-light/25 to-transparent blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* brand mark */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200 to-primary-light/60 blur-lg opacity-60" />
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg flex items-center justify-center">
              <HeartPulse size={26} className="text-white" aria-hidden="true" />
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500 tracking-wide">SUBA Health Care Service</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_24px_rgba(15,23,42,0.08)] px-7 py-8 sm:px-9 sm:py-9">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight mb-1">
            Create Your Account
          </h1>
          <p className="text-slate-500 text-sm mb-6">Start tracking your health with SUBA</p>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-danger/20 bg-gradient-to-r from-danger/5 to-danger/[0.03] px-4 py-3 mb-5"
            >
              <AlertCircle size={16} className="text-danger mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                required
                placeholder="Full Name"
                autoComplete="name"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                           placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                           focus:border-primary transition-all shadow-sm disabled:opacity-50"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                           placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                           focus:border-primary transition-all shadow-sm disabled:opacity-50"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                autoComplete="new-password"
                disabled={loading}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                           placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                           focus:border-primary transition-all shadow-sm disabled:opacity-50"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Cake size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="number"
                  placeholder="Age"
                  disabled={loading}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                             placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                             focus:border-primary transition-all shadow-sm disabled:opacity-50"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>

              <div className="relative">
                <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
                <select
                  disabled={loading}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white text-navy appearance-none
                             focus:outline-none focus:ring-2 focus:ring-primary/50
                             focus:border-primary transition-all shadow-sm disabled:opacity-50"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <Ruler size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="number"
                placeholder="Height (cm)"
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                           placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                           focus:border-primary transition-all shadow-sm disabled:opacity-50"
                value={form.height_cm}
                onChange={(e) => setForm({ ...form, height_cm: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 text-base font-semibold text-white
                         bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                         disabled:opacity-60 disabled:cursor-not-allowed
                         px-5 py-3 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                         transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Creating account…
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-dark font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {authSuccess && <WelcomeOverlay variant="new" name={user?.name || form.name} />}
    </div>
  )
}
