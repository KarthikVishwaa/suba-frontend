import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler
} from 'chart.js'
import { Link } from 'react-router-dom'
import {
  HeartPulse, Scale, Flame, Droplets, Bone, FlaskConical, Utensils, Bot,
  ArrowRight, TrendingUp, FileText, Activity, Eye,
} from 'lucide-react'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '../components/ui/card'
import { Badge, Skeleton } from '../components/ui/badge'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '../components/ui/drawer'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const quickLinks = [
  { to: '/xray-analyzer', icon: Bone, label: 'X-Ray Analyzer' },
  { to: '/blood-report-analyzer', icon: FlaskConical, label: 'Blood Report Analyzer' },
  { to: '/health-assessment', icon: HeartPulse, label: 'Health Assessment' },
  { to: '/calorie-counter', icon: Utensils, label: 'Calorie Counter' },
  { to: '/ai-assistant', icon: Bot, label: 'AI Assistant' },
]

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A', padding: 10, cornerRadius: 8, displayColors: false,
      titleFont: { family: 'Inter' }, bodyFont: { family: 'Inter' },
    },
  },
  scales: {
    y: { beginAtZero: false, grid: { color: 'rgba(15,23,42,0.05)' }, ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } } },
    x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } } },
  },
}

function trendData(labels, data, color) {
  return {
    labels,
    datasets: [{
      data, borderColor: color, backgroundColor: `${color}1A`, fill: true,
      tension: 0.35, pointRadius: 3, pointBackgroundColor: color, borderWidth: 2,
    }],
  }
}

/* ================= Stat card ================= */
function StatCard({ icon: Icon, label, value, unit, loading }) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardAction>
          <span className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center" aria-hidden="true">
            <Icon size={18} className="text-primary-dark" />
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <p className="text-2xl font-bold tabular-nums text-navy">
            {value ?? '—'}
            {value != null && unit && <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

/* ================= Main dashboard ================= */
export default function Dashboard() {
  const [overview, setOverview] = useState(null)
  const [trends, setTrends] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    Promise.allSettled([
      api.get('/dashboard/overview').then(res => setOverview(res.data.data)),
      api.get('/dashboard/trends').then(res => setTrends(res.data.data)),
    ]).finally(() => setLoading(false))
  }, [])

  /* ---- data table rows: merge reports + xrays ---- */
  const records = [
    ...(overview?.recent_reports ?? []).map(r => ({
      key: `report-${r.id}`,
      kind: 'Blood Report',
      icon: FlaskConical,
      title: r.report_type,
      date: r.created_at,
      status: 'Analyzed',
      statusVariant: 'secondary',
    })),
    ...(overview?.recent_xrays ?? []).map(x => ({
      key: `xray-${x.id}`,
      kind: 'X-Ray Scan',
      icon: Bone,
      title: x.fracture_detected ? 'Possible fracture' : 'No fracture detected',
      date: x.created_at,
      confidence: Math.round(x.confidence_score * 100),
      status: x.fracture_detected ? 'Attention' : 'Normal',
      statusVariant: x.fracture_detected ? 'warning' : 'success',
    })),
  ]

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <main className="max-w-6xl mx-auto px-6 pt-28 pb-12">
      {/* ================= Header ================= */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 mb-1">{today}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">Your Health Dashboard</h1>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Activity size={13} aria-hidden="true" /> SUBA Health
        </Badge>
      </header>

      {/* ================= Stats ================= */}
      <section aria-labelledby="overview-heading" className="mb-8">
        <h2 id="overview-heading" className="sr-only">Health overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={HeartPulse} label="Health Score" value={overview?.health_score} unit="/100" loading={loading} />
          <StatCard icon={Scale} label="BMI" value={overview?.bmi} loading={loading} />
          <StatCard icon={Flame} label="Calories Today" value={overview?.calories_today} unit="kcal" loading={loading} />
          <StatCard icon={Droplets} label="Water Intake" value={overview?.water_today_ml} unit="ml" loading={loading} />
        </div>
      </section>

      {/* ================= Quick actions ================= */}
      <section aria-labelledby="quick-actions-heading" className="mb-10">
        <h2 id="quick-actions-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Quick Actions
        </h2>
        <nav aria-label="Health tools" className="flex flex-wrap gap-3">
          {quickLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5
                         text-sm font-medium text-navy shadow-sm hover:border-primary hover:shadow transition-all
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center" aria-hidden="true">
                <l.icon size={15} className="text-primary-dark" />
              </span>
              {l.label}
              <ArrowRight size={14} aria-hidden="true"
                className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-dark" />
            </Link>
          ))}
        </nav>
      </section>

      {/* ================= Records data table ================= */}
      <section aria-labelledby="records-heading" className="mb-10">
        <h2 id="records-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Records
        </h2>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription className="mt-1">Blood reports and X-ray screenings — click a row for details.</CardDescription>
            </div>
            <CardAction>
              <span className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center" aria-hidden="true">
                <FileText size={17} className="text-primary-dark" />
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3" aria-label="Loading records">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-11/12" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : records.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Type</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((r) => (
                    <TableRow key={r.key} onClick={() => setSelectedRecord(r)} className="cursor-pointer">
                      <TableCell>
                        <span className="flex items-center gap-2 font-medium">
                          <span className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center" aria-hidden="true">
                            <r.icon size={14} className="text-primary-dark" />
                          </span>
                          {r.kind}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate">{r.title}</TableCell>
                      <TableCell className="tabular-nums">{r.confidence != null ? `${r.confidence}%` : '—'}</TableCell>
                      <TableCell className="text-slate-500">{r.date ? new Date(r.date).toLocaleDateString() : '—'}</TableCell>
                      <TableCell><Badge variant={r.statusVariant}>{r.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedRecord(r) }}
                          aria-label={`View details of ${r.kind}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary-dark
                                     hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                        >
                          <Eye size={13} aria-hidden="true" /> View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-slate-500 py-4 text-center">
                No records yet — upload an X-ray or blood report to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ================= Trends ================= */}
      <section aria-labelledby="trends-heading">
        <h2 id="trends-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Trends
        </h2>
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : trends && trends.dates.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Health Score', data: trends.health_score, color: '#0284C7' },
              { title: 'BMI', data: trends.bmi, color: '#22C55E' },
              { title: 'Blood Sugar', data: trends.blood_sugar, color: '#F59E0B' },
              { title: 'Weight', data: trends.weight_kg, color: '#EF4444' },
            ].map((t) => (
              <Card key={t.title}>
                <CardHeader>
                  <div>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription className="mt-1">Based on your health assessments</CardDescription>
                  </div>
                  <CardAction>
                    <Badge variant="secondary"><TrendingUp size={12} aria-hidden="true" /> Trend</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Line options={lineOptions} data={trendData(trends.dates, t.data, t.color)}
                        aria-label={`Line chart showing ${t.title.toLowerCase()} trend`} role="img" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="items-center text-center py-10">
            <CardContent className="flex flex-col items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center" aria-hidden="true">
                <HeartPulse size={22} className="text-primary-dark" />
              </span>
              <div>
                <CardTitle as="p" className="mb-1">No trend data yet</CardTitle>
                <CardDescription>Complete a Health Assessment to start seeing your trends here.</CardDescription>
              </div>
              <Link
                to="/health-assessment"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark
                           px-4 py-2 rounded-lg transition-colors
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                Start Assessment <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {/* ================= Record details Drawer ================= */}
      <Drawer open={!!selectedRecord} onOpenChange={(v) => !v && setSelectedRecord(null)}>
        <DrawerContent>
          {selectedRecord && (
            <>
              <DrawerHeader>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center" aria-hidden="true">
                    <selectedRecord.icon size={19} className="text-primary-dark" />
                  </span>
                  <div>
                    <DrawerTitle>{selectedRecord.kind}</DrawerTitle>
                    <DrawerDescription>
                      {selectedRecord.date ? new Date(selectedRecord.date).toLocaleString() : 'Date unavailable'}
                    </DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                  <span className="text-sm text-slate-500">Result</span>
                  <span className="text-sm font-semibold text-navy">{selectedRecord.title}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                  <span className="text-sm text-slate-500">Status</span>
                  <Badge variant={selectedRecord.statusVariant}>{selectedRecord.status}</Badge>
                </div>
                {selectedRecord.confidence != null && (
                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500">AI Confidence</span>
                      <span className="text-sm font-semibold tabular-nums text-navy">{selectedRecord.confidence}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden" role="progressbar"
                         aria-valuenow={selectedRecord.confidence} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-full rounded-full bg-primary" style={{ width: `${selectedRecord.confidence}%` }} />
                    </div>
                  </div>
                )}
                <p className="text-xs text-slate-400 pt-1">
                  This is an AI screening result, not a medical diagnosis. Always consult a qualified doctor.
                </p>
              </div>

              <DrawerFooter>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark
                             transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Close
                </button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </main>
  )
}