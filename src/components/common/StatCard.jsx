import React from 'react'

export default function StatCard({ icon: Icon, label, value, unit, accent = 'text-primary-dark' }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
        <Icon className={accent} size={22} />
      </div>
      <div>
        <p className="text-xs text-slate font-medium">{label}</p>
        <p className="text-2xl font-bold text-navy">
          {value ?? '—'} <span className="text-sm font-medium text-slate">{unit}</span>
        </p>
      </div>
    </div>
  )
}
