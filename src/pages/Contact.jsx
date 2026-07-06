import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  Clock,
  Mailbox,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    // Simulated send — swap for a real API call when the backend endpoint is ready
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 900)
  }

  const sendAnother = () => {
    setForm({ name: '', email: '', message: '' })
    setSent(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50 pt-28">
      {/* ================= Hero header ================= */}
      <div className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white via-sky-50/30 to-white/60 backdrop-blur-xs">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-200/20 to-primary-light/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-primary-light/20 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-8 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary
                         px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/30 hover:bg-primary-light/30
                         transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <ArrowLeft size={15} aria-hidden="true" /> Back to Dashboard
            </Link>
            <nav aria-label="Breadcrumb" className="hidden sm:block">
              <ol className="flex items-center gap-2 text-sm">
                <li><Link to="/dashboard" className="text-slate-500 hover:text-primary transition-colors">Dashboard</Link></li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li className="text-primary-dark font-semibold">Contact Us</li>
              </ol>
            </nav>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative hidden sm:flex">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200 to-primary-light/60 blur-xl opacity-50" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-lg flex items-center justify-center">
                <Mailbox size={28} className="text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight">
                Contact Us
              </h1>
              <p className="mt-2 text-slate-600 max-w-lg">
                Questions or feedback about SUBA Health Care Service? Send us a message and we'll get back to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="max-w-5xl mx-auto w-full px-6 py-8 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Form card */}
        <div className="md:col-span-3">
          <Card className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)] overflow-hidden">
            {sent ? (
              <CardContent className="py-14 px-8 text-center">
                <div
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-success/15 to-success/5 flex items-center justify-center mb-4"
                  style={{ animation: 'resultIn 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <CheckCircle2 size={32} className="text-success" aria-hidden="true" />
                </div>
                <p className="text-navy font-semibold text-lg mb-1">Message sent</p>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">
                  Thanks for reaching out — our team typically responds within 24 hours.
                </p>
                <button
                  onClick={sendAnother}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark
                             px-4 py-2 rounded-lg border border-primary/20 bg-primary-light/40 hover:bg-primary-light/70
                             transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Send another message
                </button>
              </CardContent>
            ) : (
              <>
                <CardHeader className="border-b border-slate-100/60">
                  <CardTitle className="text-lg">Send a message</CardTitle>
                  <CardDescription>We usually reply within one business day.</CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                      <input
                        required
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange('name')}
                        disabled={sending}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                                   placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                                   focus:border-primary transition-all shadow-sm disabled:opacity-50"
                      />
                    </div>

                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                      <input
                        required
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange('email')}
                        disabled={sending}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                                   placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                                   focus:border-primary transition-all shadow-sm disabled:opacity-50"
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-slate-400" aria-hidden="true" />
                      <textarea
                        required
                        placeholder="Your Message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange('message')}
                        disabled={sending}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy resize-none
                                   placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                                   focus:border-primary transition-all shadow-sm disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full inline-flex items-center justify-center gap-2 text-base font-semibold text-white
                                 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                                 disabled:opacity-60 disabled:cursor-not-allowed
                                 px-5 py-3 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                                 transition-all duration-200
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {sending ? (
                        <>
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send size={18} aria-hidden="true" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>

        {/* Info sidebar */}
        <div className="md:col-span-2 space-y-4">
          <Card className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)]">
            <CardContent className="py-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-primary-light flex items-center justify-center shrink-0">
                <Mail size={18} className="text-primary-dark" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Email us</p>
                <p className="text-sm text-slate-500 mt-0.5">support@subahealth.care</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)]">
            <CardContent className="py-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-primary-light flex items-center justify-center shrink-0">
                <Clock size={18} className="text-primary-dark" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Response time</p>
                <p className="text-sm text-slate-500 mt-0.5">Within 24 hours, Mon–Sat</p>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary-light/40 to-sky-50/40 px-5 py-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              For urgent medical concerns, please contact a healthcare provider directly or call your local
              emergency number. This form is for general questions and feedback only.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes resultIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </main>
  )
}