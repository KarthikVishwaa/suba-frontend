import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, TrendingUp, AlertCircle, ArrowLeft, Activity, Droplet, Moon, Zap } from 'lucide-react'
import healthImage from '../components/assets/health.png'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '../components/ui/card'
import { Badge, Skeleton } from '../components/ui/badge'

const initialForm = {
  age: '', height_cm: '', weight_kg: '', blood_pressure: '120/80',
  blood_sugar: '', exercise_level: 'Moderate', sleep_hours: '', water_intake_l: '',
}

export default function HealthAssessment() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const startedAt = Date.now()
    try {
      const payload = {
        ...form,
        age: Number(form.age),
        height_cm: Number(form.height_cm),
        weight_kg: Number(form.weight_kg),
        blood_sugar: Number(form.blood_sugar),
        sleep_hours: Number(form.sleep_hours),
        water_intake_l: Number(form.water_intake_l),
      }
      const res = await api.post('/health/assessment', payload)
      const elapsed = Date.now() - startedAt
      if (elapsed < 1500) {
        await new Promise((resolve) => setTimeout(resolve, 1500 - elapsed))
      }
      setResult(res.data.data)
    } catch (err) {
      const elapsed = Date.now() - startedAt
      if (elapsed < 1500) {
        await new Promise((resolve) => setTimeout(resolve, 1500 - elapsed))
      }
      setError(err.response?.data?.error || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setForm(initialForm)
    setResult(null)
    setError('')
  }

  const getRiskColor = (level) => {
    if (!level) return 'default'
    const lower = level.toLowerCase()
    if (lower === 'low') return 'success'
    if (lower === 'moderate') return 'warning'
    return 'destructive'
  }

  const getBMIColor = (category) => {
    if (!category) return 'default'
    const lower = category.toLowerCase()
    if (lower.includes('normal')) return 'success'
    if (lower.includes('over')) return 'warning'
    return 'destructive'
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50 pt-28">
      {/* ================= Hero header with back button ================= */}
      <div className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white via-sky-50/30 to-white/60 backdrop-blur-xs">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-200/20 to-primary-light/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-primary-light/20 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-8 md:py-12">
          {/* breadcrumb + back */}
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
                <li className="text-primary-dark font-semibold">Health Assessment</li>
              </ol>
            </nav>
          </div>

          {/* title section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative hidden sm:flex">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200 to-primary-light/60 blur-xl opacity-50" />
                <img 
                  src={healthImage} 
                  alt="Health assessment" 
                  className="relative w-16 h-16 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight">
                  General Health Assessment
                </h1>
                <p className="mt-2 text-slate-600 max-w-lg">
                  Enter your vitals and lifestyle data to receive a personalized health score, BMI analysis, and actionable recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Main content ================= */}
      <div className="relative max-w-4xl mx-auto px-6 pb-10 md:pb-16">
        {/* ---------- Assessment form card ---------- */}
        <Card className="mb-8 border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(2,132,199,0.1)] transition-shadow duration-300">
          <CardHeader>
            <div>
              <CardTitle className="text-xl">Your Health Information</CardTitle>
              <CardDescription className="mt-2">
                Provide accurate measurements for the most reliable assessment.
              </CardDescription>
            </div>
            <CardAction>
              <span className="relative">
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-sky-200 to-primary-light/50 blur-lg opacity-60" />
                <span className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-primary-dark flex items-center justify-center shadow-lg">
                  <Activity size={19} className="text-white" aria-hidden="true" />
                </span>
              </span>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Age, Height, Weight */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Age</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 28"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.age}
                    onChange={handleChange('age')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Height (cm)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 175"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.height_cm}
                    onChange={handleChange('height_cm')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 70"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.weight_kg}
                    onChange={handleChange('weight_kg')}
                  />
                </div>
              </div>

              {/* Row 2: Blood Pressure, Blood Sugar */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Blood Pressure</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 120/80"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.blood_pressure}
                    onChange={handleChange('blood_pressure')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 95"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.blood_sugar}
                    onChange={handleChange('blood_sugar')}
                  />
                </div>
              </div>

              {/* Row 3: Exercise, Sleep, Water */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Exercise Level</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all shadow-sm appearance-none cursor-pointer"
                    value={form.exercise_level}
                    onChange={handleChange('exercise_level')}
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Sleep Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    placeholder="e.g., 7.5"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.sleep_hours}
                    onChange={handleChange('sleep_hours')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Water Intake (liters)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g., 2.5"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={form.water_intake_l}
                    onChange={handleChange('water_intake_l')}
                  />
                </div>
              </div>

              {/* Error alert */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-danger/20 bg-gradient-to-r from-danger/5 to-danger/[0.03] px-5 py-4 shadow-sm"
                >
                  <AlertCircle size={18} className="text-danger mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-danger mb-0.5">Assessment Failed</p>
                    <p className="text-sm text-slate-600">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-base font-semibold text-white
                             bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                             disabled:opacity-50 disabled:cursor-not-allowed
                             px-6 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                             transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {loading ? (
                    <>
                      <Zap size={18} className="animate-pulse" aria-hidden="true" /> Calculating…
                    </>
                  ) : (
                    <>
                      <TrendingUp size={18} aria-hidden="true" /> Get My Health Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* ---------- Loading skeleton ---------- */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} aria-label="Loading result" className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)]">
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ---------- Results section ---------- */}
        {result && !loading && (
          <>
            <style>{`
              @keyframes resultIn {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .anim-result { animation: resultIn 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
              @media (prefers-reduced-motion: reduce) { .anim-result { animation: none; } }
            `}</style>

            {/* Results grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Your Results Card */}
              <Card className="anim-result border-slate-200/80 shadow-[0_4px_24px_rgba(2,132,199,0.12)] bg-gradient-to-br from-white via-sky-50/20 to-white">
                <CardHeader>
                  <div>
                    <CardTitle className="text-xl">Your Results</CardTitle>
                    <CardDescription className="mt-2">Personalized health metrics</CardDescription>
                  </div>
                  <CardAction>
                    <Badge variant="success" className="px-3 py-1.5 text-xs">
                      <Heart size={12} aria-hidden="true" /> Complete
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* BMI */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 font-medium">BMI</span>
                      <Badge variant={getBMIColor(result.bmi_category)} className="text-xs px-2 py-0.5">
                        {result.bmi_category}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                      {result.bmi}
                    </p>
                  </div>

                  {/* Health Score */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 font-medium">Health Score</span>
                      <span className="text-sm font-semibold text-navy">{result.health_score}/100</span>
                    </div>
                    <div className="h-2 rounded-full bg-gradient-to-r from-slate-200 to-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${result.health_score >= 75 ? 'bg-gradient-to-r from-success to-emerald-400' : result.health_score >= 50 ? 'bg-gradient-to-r from-warning to-orange-400' : 'bg-gradient-to-r from-danger to-red-400'}`}
                        style={{ width: `${result.health_score}%` }}
                      />
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm text-slate-600 font-medium">Lifestyle</span>
                    <Badge variant={result.lifestyle_category?.toLowerCase().includes('healthy') ? 'success' : 'warning'}>
                      {result.lifestyle_category}
                    </Badge>
                  </div>

                  {/* Risk Level */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3 flex items-center justify-between">
                    <span className="text-sm text-slate-600 font-medium">Risk Level</span>
                    <Badge variant={getRiskColor(result.risk_level)}>
                      {result.risk_level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions Card */}
              <Card className="anim-result border-slate-200/80 shadow-[0_4px_24px_rgba(2,132,199,0.12)] bg-gradient-to-br from-white via-sky-50/20 to-white">
                <CardHeader>
                  <div>
                    <CardTitle className="text-xl">Recommendations</CardTitle>
                    <CardDescription className="mt-2">Actionable health advice</CardDescription>
                  </div>
                  <CardAction>
                    <Badge variant="secondary" className="px-3 py-1.5 text-xs">
                      <Zap size={12} aria-hidden="true" /> Tips
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.suggestions && result.suggestions.length > 0 ? (
                    result.suggestions.map((suggestion, i) => (
                      <div key={i} className="rounded-lg border border-primary-light/30 bg-gradient-to-r from-sky-50/50 to-primary-light/10 px-3 py-2.5">
                        <p className="text-xs text-slate-700 leading-relaxed flex gap-2">
                          <span className="text-primary-dark font-bold shrink-0">→</span>
                          <span>{suggestion}</span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No suggestions available.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-primary-light/30 bg-gradient-to-r from-sky-50/50 to-primary-light/10 px-5 py-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-navy">Disclaimer:</span> This assessment is for informational purposes only and should not replace professional medical advice. Consult a healthcare provider for personalized guidance.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-6">
              <button
                onClick={reset}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200
                           hover:border-slate-300 hover:bg-slate-50 transition-all
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                Start Over
              </button>
              <Link
                to="/dashboard"
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white
                           bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                           shadow-md shadow-sky-200/40 transition-all
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                           inline-flex items-center justify-center"
              >
                Back to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}