import React from 'react'
import { ArrowLeft } from 'lucide-react'

const capabilities = [
  {
    label: 'AI / ML',
    detail: 'scikit-learn classifiers for risk scoring and triage predictions.',
  },
  {
    label: 'OCR',
    detail: 'EasyOCR reads prescriptions and lab reports straight from photos.',
  },
  {
    label: 'NLP',
    detail: 'Small rule-based parsers pull symptoms and terms out of free text.',
  },
  {
    label: 'Computer Vision',
    detail: 'OpenCV handles basic image analysis on scanned documents.',
  },
]

function ScanDivider() {
  return (
    <div className="flex items-center gap-4 my-12" aria-hidden="true">
      <div className="h-px flex-1 bg-sky-100" />
      <svg width="72" height="20" viewBox="0 0 72 20" className="text-sky-400 shrink-0">
        <polyline
          points="0,10 22,10 27,2 32,18 37,10 72,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="h-px flex-1 bg-sky-100" />
    </div>
  )
}

export default function About() {
  return (
   <div className="max-w-3xl mx-auto px-6 pb-20 pt-32">
      {/* Return to desktop */}
      <button
        onClick={() => { window.location.href = '/' }}
        className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 border border-sky-200 rounded-full px-4 py-2 mb-16 hover:bg-sky-50 transition-colors"
      >
        <ArrowLeft size={16} />
        Return to Home
      </button>

      {/* Hero */}
      <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase mb-3">
        Final-Year Engineering Project
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mb-5 leading-tight">
        About SUBA Health Care Service
      </h1>
      <p className="text-sky-700 leading-relaxed mb-4 text-[15px]">
        SUBA Health Care Service is an AI-powered healthcare analytics platform that brings
        Artificial Intelligence, Machine Learning, Data Science, OCR, NLP, and basic Computer
        Vision together into one practical, easy-to-use web application.
      </p>
      <p className="text-sky-700 leading-relaxed text-[15px]">
        It intentionally favors lightweight, beginner-friendly models over large, resource-heavy
        ones — so the platform stays fast, explainable, and simple to understand end to end.
      </p>

      <ScanDivider />

      {/* Capabilities grid */}
      <h2 className="text-sm font-semibold tracking-widest text-sky-900 uppercase mb-6">
        What's under the hood
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {capabilities.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-sky-100 bg-sky-50/40 p-5 hover:border-sky-300 transition-colors"
          >
            <p className="text-sm font-semibold text-sky-900 mb-1.5">{item.label}</p>
            <p className="text-sm text-sky-700 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      <ScanDivider />

      {/* Developer badge */}
      <div className="relative rounded-xl border border-sky-100 bg-sky-50/40 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-10 h-10 bg-sky-100 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-semibold text-lg shrink-0">
            S
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase mb-1">
              Developed by
            </p>
            <p className="font-semibold text-sky-900 leading-snug">Suba</p>
            <p className="text-sm text-sky-700 leading-snug">
              Computer Science and Engineering Student<br />
              Annapoorana Engineering College
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}