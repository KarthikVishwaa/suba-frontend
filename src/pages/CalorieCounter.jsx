import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Utensils, Droplets, Plus, ArrowLeft, AlertCircle, Flame, Loader2, TrendingDown } from 'lucide-react'
import nutritionImage from '../components/assets/calaries.png'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '../components/ui/card'
import { Badge, Skeleton } from '../components/ui/badge'

const DAILY_CALORIE_GOAL = 2000
const DAILY_WATER_GOAL = 2500

export default function CalorieCounter() {
  const [meal, setMeal] = useState({ meal_name: '', calories: '', meal_type: 'Lunch' })
  const [waterAmount, setWaterAmount] = useState('')
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')
  const [mealLoading, setMealLoading] = useState(false)
  const [waterLoading, setWaterLoading] = useState(false)
  const [loadingSummary, setLoadingSummary] = useState(true)
  const [addedMealId, setAddedMealId] = useState(null)

  const loadSummary = async () => {
    try {
      const res = await api.get('/calorie/summary/daily')
      setSummary(res.data.data)
    } catch (err) {
      console.error('Failed to load summary')
    } finally {
      setLoadingSummary(false)
    }
  }

  useEffect(() => {
    loadSummary()
    const interval = setInterval(loadSummary, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const addMeal = async (e) => {
    e.preventDefault()
    setError('')
    setMealLoading(true)
    try {
      const res = await api.post('/calorie/meal', { ...meal, calories: Number(meal.calories) })
      setAddedMealId(res.data.data?.id)
      setTimeout(() => setAddedMealId(null), 3000)
      setMeal({ meal_name: '', calories: '', meal_type: 'Lunch' })
      await loadSummary()
    } catch (err) {
      setError(err.response?.data?.error || 'Could not log meal')
    } finally {
      setMealLoading(false)
    }
  }

  const addWater = async (e) => {
    e.preventDefault()
    setError('')
    setWaterLoading(true)
    try {
      await api.post('/calorie/water', { amount_ml: Number(waterAmount) })
      setWaterAmount('')
      await loadSummary()
    } catch (err) {
      setError(err.response?.data?.error || 'Could not log water')
    } finally {
      setWaterLoading(false)
    }
  }

  const caloriePercent = summary ? Math.min((summary.total_calories_consumed / DAILY_CALORIE_GOAL) * 100, 100) : 0
  const waterPercent = summary ? Math.min((summary.total_water_ml / DAILY_WATER_GOAL) * 100, 100) : 0
  const netCalories = summary ? summary.net_calories : 0

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
                <li className="text-primary-dark font-semibold">Calorie Counter</li>
              </ol>
            </nav>
          </div>

          {/* title section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative hidden sm:flex">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200 to-primary-light/60 blur-xl opacity-50" />
                <img 
                  src={nutritionImage} 
                  alt="Nutrition tracking" 
                  className="relative w-16 h-16 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight">
                  Calorie Counter
                </h1>
                <p className="mt-2 text-slate-600 max-w-lg">
                  Track your meals, water intake, and daily nutrition with real-time summaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Main content ================= */}
      <div className="relative max-w-5xl mx-auto px-6 pb-10 md:pb-16">
        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-danger/20 bg-gradient-to-r from-danger/5 to-danger/[0.03] px-5 py-4 shadow-sm"
          >
            <AlertCircle size={18} className="text-danger mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-danger mb-0.5">Error</p>
              <p className="text-sm text-slate-600">{error}</p>
            </div>
          </div>
        )}

        {/* ---------- Two-column form section ---------- */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Meal form */}
          <Card className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(2,132,199,0.1)] transition-shadow duration-300">
            <CardHeader>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Utensils size={20} aria-hidden="true" className="text-primary-dark" />
                  Log a Meal
                </CardTitle>
                <CardDescription className="mt-2">
                  Add your meal with calories consumed.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={addMeal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Meal Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Grilled Chicken Salad"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={meal.meal_name}
                    onChange={(e) => setMeal({ ...meal, meal_name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Calories (kcal)</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g., 450"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={meal.calories}
                    onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Meal Type</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all shadow-sm appearance-none cursor-pointer"
                    value={meal.meal_type}
                    onChange={(e) => setMeal({ ...meal, meal_type: e.target.value })}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={mealLoading}
                  className="w-full inline-flex items-center justify-center gap-2 text-base font-semibold text-white
                             bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                             disabled:opacity-50 disabled:cursor-not-allowed
                             px-6 py-3 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                             transition-all duration-200 mt-2
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {mealLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Adding…
                    </>
                  ) : (
                    <>
                      <Plus size={18} aria-hidden="true" /> Add Meal
                    </>
                  )}
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Water form */}
          <Card className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(2,132,199,0.1)] transition-shadow duration-300">
            <CardHeader>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Droplets size={20} aria-hidden="true" className="text-primary-dark" />
                  Log Water Intake
                </CardTitle>
                <CardDescription className="mt-2">
                  Track your daily water consumption.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={addWater} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Amount (ml)</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g., 250"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                               placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                               focus:border-primary transition-all shadow-sm"
                    value={waterAmount}
                    onChange={(e) => setWaterAmount(e.target.value)}
                  />
                </div>

                <p className="text-xs text-slate-500">
                  Daily goal: <span className="font-semibold text-navy">{DAILY_WATER_GOAL} ml</span>
                </p>

                <button
                  type="submit"
                  disabled={waterLoading}
                  className="w-full inline-flex items-center justify-center gap-2 text-base font-semibold text-white
                             bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                             disabled:opacity-50 disabled:cursor-not-allowed
                             px-6 py-3 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                             transition-all duration-200 mt-2
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {waterLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Adding…
                    </>
                  ) : (
                    <>
                      <Plus size={18} aria-hidden="true" /> Add Water
                    </>
                  )}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* ---------- Summary section ---------- */}
        {loadingSummary ? (
          <Card aria-label="Loading summary" className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)]">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        ) : summary ? (
          <>
            <style>{`
              @keyframes resultIn {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              .anim-result { animation: resultIn 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
              @media (prefers-reduced-motion: reduce) { .anim-result { animation: none; } }
            `}</style>

            <Card className="anim-result border-slate-200/80 shadow-[0_4px_24px_rgba(2,132,199,0.12)] bg-gradient-to-br from-white via-sky-50/20 to-white">
              <CardHeader>
                <div>
                  <CardTitle className="text-xl">Today's Summary</CardTitle>
                  <CardDescription className="mt-2">Real-time nutrition tracking</CardDescription>
                </div>
                <CardAction>
                  <Badge variant="success" className="px-3 py-1.5 text-xs">
                    <TrendingDown size={12} aria-hidden="true" /> Live
                  </Badge>
                </CardAction>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Metrics grid */}
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Calories Consumed */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <p className="text-xs text-slate-500 font-medium mb-1">Calories Consumed</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                      {summary.total_calories_consumed}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">of {DAILY_CALORIE_GOAL} kcal</p>
                  </div>

                  {/* Calories Burned */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <p className="text-xs text-slate-500 font-medium mb-1">Calories Burned</p>
                    <p className="text-2xl font-bold text-success">
                      {summary.total_calories_burned}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">via exercise</p>
                  </div>

                  {/* Net Calories */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <p className="text-xs text-slate-500 font-medium mb-1">Net Calories</p>
                    <p className={`text-2xl font-bold ${netCalories < 0 ? 'text-success' : netCalories > DAILY_CALORIE_GOAL ? 'text-warning' : 'text-navy'}`}>
                      {netCalories}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">consumed - burned</p>
                  </div>

                  {/* Water Intake */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <p className="text-xs text-slate-500 font-medium mb-1">Water Intake</p>
                    <p className="text-2xl font-bold text-primary-dark">
                      {summary.total_water_ml}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">of {DAILY_WATER_GOAL} ml</p>
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-4">
                  {/* Calorie progress */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-navy">Calorie Progress</span>
                      <span className="text-sm font-semibold text-slate-600">{Math.round(caloriePercent)}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-gradient-to-r from-slate-200 to-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          caloriePercent <= 80
                            ? 'bg-gradient-to-r from-primary to-sky-400'
                            : caloriePercent <= 120
                            ? 'bg-gradient-to-r from-warning to-orange-400'
                            : 'bg-gradient-to-r from-danger to-red-400'
                        }`}
                        style={{ width: `${caloriePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Water progress */}
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-navy">Water Progress</span>
                      <span className="text-sm font-semibold text-slate-600">{Math.round(waterPercent)}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-gradient-to-r from-slate-200 to-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-primary to-sky-400"
                        style={{ width: `${waterPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Meals list */}
                {summary.meals && summary.meals.length > 0 && (
                  <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/60 to-white px-4 py-3">
                    <p className="text-sm font-semibold text-navy mb-3">Logged Meals</p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {summary.meals.map((m) => (
                        <div
                          key={m.id}
                          className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-all ${
                            addedMealId === m.id
                              ? 'bg-primary/10 border border-primary/30'
                              : 'hover:bg-slate-100/50'
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-navy">{m.meal_name}</p>
                            <p className="text-xs text-slate-500">{m.meal_type}</p>
                          </div>
                          <Badge variant="secondary" className="ml-2 shrink-0">
                            {m.calories} kcal
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : null}

        {/* Back to Dashboard */}
        {summary && (
          <div className="mt-6 flex justify-center">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                         shadow-md shadow-sky-200/40 transition-all
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}