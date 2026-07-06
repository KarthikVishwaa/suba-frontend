import React, { useEffect, useState } from 'react'
import api from '../services/api'
import Badge from '../components/common/Badge'

export default function HealthHistory() {
  const [healthRecords, setHealthRecords] = useState([])
  const [reports, setReports] = useState([])
  const [xrays, setXrays] = useState([])
  const [tab, setTab] = useState('assessments')

  useEffect(() => {
    api.get('/health/history').then(res => setHealthRecords(res.data.data))
    api.get('/blood-report/history').then(res => setReports(res.data.data))
    api.get('/xray/history').then(res => setXrays(res.data.data))
  }, [])

  const tabs = [
    { key: 'assessments', label: 'Health Assessments' },
    { key: 'reports', label: 'Blood Reports' },
    { key: 'xrays', label: 'X-Ray Analyses' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-navy mb-6">Health History</h1>

      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === t.key ? 'bg-primary text-white' : 'bg-white text-slate border border-slate-100'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'assessments' && (
        <div className="space-y-3">
          {healthRecords.length === 0 && <p className="text-slate text-sm">No assessments yet.</p>}
          {healthRecords.map(r => (
            <div key={r.id} className="card flex flex-wrap justify-between gap-3 text-sm">
              <span>{new Date(r.created_at).toLocaleDateString()}</span>
              <span>BMI: <strong>{r.bmi}</strong></span>
              <span>Health Score: <strong>{r.health_score}</strong></span>
              <span>Risk: <strong>{r.risk_level}</strong></span>
            </div>
          ))}
        </div>
      )}

      {tab === 'reports' && (
        <div className="space-y-3">
          {reports.length === 0 && <p className="text-slate text-sm">No blood reports yet.</p>}
          {reports.map(r => (
            <div key={r.id} className="card text-sm">
              <div className="flex justify-between mb-1">
                <strong>{r.report_type}</strong>
                <span className="text-slate">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-slate">{r.summary}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'xrays' && (
        <div className="space-y-3">
          {xrays.length === 0 && <p className="text-slate text-sm">No X-ray analyses yet.</p>}
          {xrays.map(x => (
            <div key={x.id} className="card flex justify-between items-center text-sm">
              <span>{new Date(x.created_at).toLocaleDateString()}</span>
              <Badge status={x.fracture_detected ? 'High' : 'Normal'} />
              <span>{Math.round(x.confidence_score * 100)}% confidence</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
