import React from 'react'
import { Link } from 'react-router-dom'
import {
  Bone, FlaskConical, HeartPulse, Utensils, Bot, ShieldCheck,
  ArrowRight, Search, Bell, LayoutDashboard, FileText, Activity, Droplets,
} from 'lucide-react'
import LiquidEther from './LiquidEther'
import BlurText from './BlurText'

const features = [
  { icon: Bone, title: 'X-Ray Fracture Analyzer', desc: 'Upload an X-ray and get an AI-assisted fracture screening with confidence score.' },
  { icon: FlaskConical, title: 'Blood Report Analyzer', desc: 'OCR-powered extraction and analysis of your CBC and blood test reports.' },
  { icon: HeartPulse, title: 'Health Assessment', desc: 'BMI, health score, lifestyle score, and risk level from your daily vitals.' },
  { icon: Utensils, title: 'Calorie Counter', desc: 'Track meals, water, and weight with daily and weekly summaries.' },
  { icon: Bot, title: 'AI Health Assistant', desc: 'Ask questions about your health terms and reports in plain language.' },
  { icon: ShieldCheck, title: 'Analytics Dashboard', desc: 'Visual trends across your health score, BMI, sugar, and more.' },
]

const stats = [
  { value: '6', label: 'AI-Powered Modules' },
  { value: '100%', label: 'Lightweight Models' },
  { value: '24/7', label: 'Assistant Availability' },
  { value: '₹0', label: 'Free to Use' },
]

const previewStats = [
  { label: 'Health Score', value: '82', delta: '+4%' },
  { label: 'BMI', value: '22.4', delta: 'Normal' },
  { label: 'Reports Analyzed', value: '14', delta: '+2' },
  { label: 'Risk Level', value: 'Low', delta: 'Stable' },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* ============ HERO — full screen, starts at the very top ============ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* LiquidEther fluid background — fills the entire screen */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <LiquidEther
            colors={['#BAE6FD', '#38BDF8', '#0284C7']}
            mouseForce={22}
            cursorSize={110}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.6}
            autoIntensity={2.6}
            takeoverDuration={0.25}
            autoResumeDelay={2000}
            autoRampDuration={0.6}
          />
        </div>

        {/* soft white veil so text stays readable over the fluid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/30 via-transparent to-white"
        />

        {/* pt-28 clears the fixed floating navbar; flex-1 centers the content vertically */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-6 pt-28 text-center">
          <div>
            {/* badge */}
            <span className="inline-block bg-white/90 backdrop-blur border border-slate-200 text-slate-600 text-xs font-medium px-4 py-1.5 rounded-lg shadow-sm mb-7">
              AI-Powered Healthcare Analytics Platform
            </span>

            {/* headline — BlurText, scroll/mount-triggered, replays every reload */}
            <div className="mb-6">
              <BlurText
                text="Next-Generation"
                animateBy="words"
                direction="top"
                delay={120}
                stepDuration={0.4}
                threshold={0.1}
                className="justify-center text-4xl md:text-6xl font-extrabold tracking-tight text-navy leading-tight mb-2"
              />

              {/* second line: gradient phrase + icon + navy word, laid out in one flex row */}
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <BlurText
                  text="AI Health Analytics"
                  animateBy="words"
                  direction="top"
                  delay={120}
                  stepDuration={0.4}
                  threshold={0.1}
                  className="justify-center text-4xl md:text-6xl font-extrabold tracking-tight leading-tight
                             bg-gradient-to-r from-sky-400 via-primary to-sky-600 bg-clip-text text-transparent"
                />
                <span className="inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-primary-light rounded-2xl shadow-sm">
                  <HeartPulse className="text-primary-dark w-6 h-6 md:w-8 md:h-8" />
                </span>
                <BlurText
                  text="Platform"
                  animateBy="words"
                  direction="top"
                  delay={120}
                  stepDuration={0.4}
                  threshold={0.1}
                  className="justify-center text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-navy"
                />
              </div>
            </div>

            {/* subtext */}
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              SUBA Health Care Service helps you analyze X-rays, blood reports, and
              daily vitals — turning raw health data into clear, simple insights.
            </p>

            {/* CTAs — narrower, centered buttons on mobile instead of full-width stretch */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-56 sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-sky-200 transition-colors group"
              >
                Get Started
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="w-56 sm:w-auto inline-flex items-center justify-center bg-white/90 backdrop-blur border border-slate-200 hover:border-primary text-navy font-semibold px-6 py-3 rounded-xl shadow-sm transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* ============ DASHBOARD PREVIEW MOCKUP — anchored to hero bottom ============ */}
        <div className="relative z-10 max-w-4xl w-full mx-auto px-6 mt-14 text-left">
          <div className="rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl shadow-sky-100 overflow-hidden">
            {/* browser bar */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="bg-white border border-slate-200 text-slate-400 text-[11px] px-6 py-1 rounded-md">
                  suba-healthcare.app
                </span>
              </div>
            </div>

            <div className="flex">
              {/* sidebar */}
              <div className="hidden sm:flex flex-col items-center gap-4 w-14 py-5 border-r border-slate-100 bg-white">
                <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <HeartPulse size={18} className="text-white" />
                </span>
                <LayoutDashboard size={18} className="text-primary-dark" />
                <Bone size={18} className="text-slate-300" />
                <FileText size={18} className="text-slate-300" />
                <Activity size={18} className="text-slate-300" />
                <Droplets size={18} className="text-slate-300" />
              </div>

              {/* main panel */}
              <div className="flex-1 p-5">
                {/* top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy text-sm">Dashboard</span>
                    <span className="bg-primary-light text-primary-dark text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      SUBA Health
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                      <Search size={13} className="text-slate-400" />
                      <span className="text-[11px] text-slate-400">Search</span>
                    </div>
                    <Bell size={15} className="text-slate-400" />
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                      S
                    </span>
                  </div>
                </div>

                {/* stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {previewStats.map((s) => (
                    <div key={s.label} className="border border-slate-100 rounded-xl p-3 bg-white">
                      <p className="text-[11px] text-slate-400 mb-1">{s.label}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-lg font-bold text-navy">{s.value}</p>
                        <span className="text-[10px] font-semibold text-primary-dark bg-primary-light px-1.5 py-0.5 rounded">
                          {s.delta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* chart area */}
                <div className="border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-navy">Health Score Trend</p>
                    <span className="text-[10px] text-slate-400">Last 7 days</span>
                  </div>
                  <svg viewBox="0 0 400 90" className="w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 70 L57 55 L114 62 L171 40 L228 48 L285 28 L342 34 L400 18 L400 90 L0 90 Z"
                      fill="url(#chartFill)"
                    />
                    <path
                      d="M0 70 L57 55 L114 62 L171 40 L228 48 L285 28 L342 34 L400 18"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="400" cy="18" r="4" fill="#0284C7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">About the Platform</h2>
        <p className="text-slate-600 max-w-3xl mx-auto">
          SUBA Health Care Service brings together Artificial Intelligence, Machine Learning,
          OCR, NLP, and basic Computer Vision into one simple, practical healthcare dashboard —
          built with lightweight, beginner-friendly models so it's fast, explainable, and easy to use.
        </p>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-12">Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 text-primary-dark transition-colors group-hover:bg-primary group-hover:text-white">
                  <f.icon size={24} />
                </div>
                <h3 className="font-semibold text-navy mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="card">
              <p className="text-3xl font-extrabold text-primary-dark">{s.value}</p>
              <p className="text-sm text-slate-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="bg-primary-light py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">Get in Touch</h2>
          <p className="text-slate-600 mb-7">
            Have questions about the platform? Reach out — we'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-sky-200 transition-colors group"
          >
            Contact Us
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  )
}