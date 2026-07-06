import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bell,
  Bone,
  Bot,
  Brain,
  CalendarCheck,
  Camera,
  CheckCircle2,
  Cpu,
  Database,
  Droplets,
  FileCheck2,
  FileText,
  FlaskConical,
  HeartPulse,
  Languages,
  LayoutDashboard,
  LockKeyhole,
  MessageCircle,
  Mic,
  MonitorSmartphone,
  Network,
  ScanText,
  Search,
  ShieldCheck,
  Stethoscope,
  UploadCloud,
  UserRound,
  Utensils,
  Watch,
} from 'lucide-react'
import LiquidEther from './LiquidEther'
import TextReveal, { textRevealEase } from './TextReveal'

const previewStats = [
  { label: 'Health Score', value: '82', delta: '+4%' },
  { label: 'BMI', value: '22.4', delta: 'Normal' },
  { label: 'Reports Analyzed', value: '14', delta: '+2' },
  { label: 'Risk Level', value: 'Low', delta: 'Stable' },
]

const problemPoints = [
  'Difficult medical terminology',
  'Delayed report interpretation',
  'No centralized health records',
  'Lack of preventive health monitoring',
]

const technologies = [
  { icon: MonitorSmartphone, title: 'React.js', desc: 'Frontend' },
  { icon: Cpu, title: 'Python Flask', desc: 'Backend REST API' },
  { icon: Database, title: 'SQLite', desc: 'Database' },
  { icon: Brain, title: 'Machine Learning', desc: 'Prediction Models' },
  { icon: ScanText, title: 'OCR', desc: 'Report Text Extraction' },
  { icon: MessageCircle, title: 'NLP', desc: 'AI Health Assistant' },
  { icon: Camera, title: 'OpenCV', desc: 'X-Ray Analysis' },
  { icon: BarChart3, title: 'Chart.js', desc: 'Analytics Dashboard' },
]

const workSteps = [
  { icon: UploadCloud, title: 'Upload Report' },
  { icon: Cpu, title: 'AI Processing' },
  { icon: ScanText, title: 'OCR Reads Text' },
  { icon: Brain, title: 'ML Analysis' },
  { icon: HeartPulse, title: 'Health Score' },
  { icon: ShieldCheck, title: 'Recommendations' },
]

const modules = [
  {
    icon: Bone,
    title: 'X-Ray Analyzer',
    points: ['Detects fractures', 'Confidence score', 'Image preprocessing'],
  },
  {
    icon: FlaskConical,
    title: 'Blood Report Analyzer',
    points: ['CBC extraction', 'Hemoglobin', 'WBC', 'Platelets', 'Sugar values'],
  },
  {
    icon: HeartPulse,
    title: 'Health Assessment',
    points: ['BMI', 'Lifestyle score', 'Risk prediction'],
  },
  {
    icon: Bot,
    title: 'AI Chatbot',
    points: ['Medical term explanation', 'Report summary', 'Health suggestions'],
  },
  {
    icon: Utensils,
    title: 'Calorie Counter',
    points: ['Food tracking', 'Water intake', 'Weight monitoring'],
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    points: ['Charts', 'Health history', 'Weekly trends'],
  },
]

const workflow = [
  'User',
  'Upload Report',
  'OCR Engine',
  'AI Processing',
  'Prediction Model',
  'Dashboard',
  'Health Insights',
]

const architecture = [
  { icon: MonitorSmartphone, title: 'React Frontend' },
  { icon: Cpu, title: 'Python Flask API' },
  { icon: Brain, title: 'AI Models' },
  { icon: Database, title: 'SQLite Database' },
  { icon: LayoutDashboard, title: 'Health Dashboard' },
]

const screenshots = [
  { icon: LockKeyhole, title: 'Login', tone: 'from-sky-50 to-white' },
  { icon: LayoutDashboard, title: 'Dashboard', tone: 'from-cyan-50 to-white' },
  { icon: Bone, title: 'X-ray Upload', tone: 'from-indigo-50 to-white' },
  { icon: FlaskConical, title: 'Blood Report Upload', tone: 'from-rose-50 to-white' },
  { icon: Bot, title: 'Chatbot', tone: 'from-emerald-50 to-white' },
  { icon: BarChart3, title: 'Analytics', tone: 'from-violet-50 to-white' },
  { icon: UserRound, title: 'Profile', tone: 'from-amber-50 to-white' },
]

const benefits = [
  'Early Health Screening',
  'Easy Medical Report Understanding',
  'Health Monitoring',
  'AI Assistance',
  'Time Saving',
  'Free Platform',
]

const projectStats = [
  { value: '7+', label: 'Flask API Routes' },
  { value: '6', label: 'AI Modules' },
  { value: '7', label: 'Database Tables' },
  { value: '8+', label: 'Backend Services' },
  { value: '100%', label: 'Responsive' },
  { value: '24/7', label: 'AI Assistant' },
]

const futureScope = [
  { icon: Activity, title: 'ECG Analysis' },
  { icon: Brain, title: 'Disease Prediction' },
  { icon: CalendarCheck, title: 'Appointment Booking' },
  { icon: Watch, title: 'Wearable Device Integration' },
  { icon: Mic, title: 'Voice Assistant' },
  { icon: Languages, title: 'Multi-language Support' },
  { icon: Stethoscope, title: 'Doctor Consultation' },
  { icon: Network, title: 'Cloud AI Models' },
]

const team = [
  'Project Guide',
  'Project Leader',
  'Frontend Developer',
  'Backend Developer',
  'AI/ML Developer',
]

const researchTech = [
  'Python',
  'Flask',
  'SQLite',
  'Artificial Intelligence',
  'Machine Learning',
  'OCR',
  'Computer Vision',
  'OpenCV',
  'React.js',
]

const faqs = [
  {
    question: 'Is this a replacement for doctors?',
    answer: 'No. It is an AI-assisted healthcare analysis tool designed to support understanding and screening.',
  },
  {
    question: 'How accurate is X-ray analysis?',
    answer: 'Predictions are generated using trained machine learning models and should be verified by medical professionals.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Uploaded reports are processed securely within the application workflow.',
  },
]

function AnimatedCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, ease: textRevealEase, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionIntro({ eyebrow, title, children, center = false }) {
  return (
    <div className={center ? 'max-w-3xl mx-auto text-center mb-12' : 'max-w-3xl mb-12'}>
      <TextReveal
        as="p"
        className="text-xs font-bold uppercase tracking-[0.18em] text-primary-dark mb-3"
      >
        {eyebrow}
      </TextReveal>
      <TextReveal
        as="h2"
        className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight"
        delay={0.05}
      >
        {title}
      </TextReveal>
      {children && (
        <TextReveal as="p" className="text-slate-600 mt-4 leading-relaxed" delay={0.1}>
          {children}
        </TextReveal>
      )}
    </div>
  )
}

function FlowRow({ items }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {items.map((item, index) => (
        <AnimatedCard key={item} className="relative" delay={index * 0.04}>
          <div className="h-full min-h-24 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <p className="font-semibold text-navy">{item}</p>
            <div className="mt-4 flex items-center justify-between text-primary-dark">
              <span className="text-xs font-semibold">Step {index + 1}</span>
              {index < items.length - 1 && <ArrowRight size={18} />}
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-white text-navy">
      <section className="relative min-h-screen flex flex-col overflow-hidden">
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

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/30 via-transparent to-white"
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-6 pt-28 text-center">
          <div>
            <TextReveal
              as="span"
              className="inline-block bg-white/90 backdrop-blur border border-slate-200 text-slate-600 text-xs font-medium px-4 py-1.5 rounded-lg shadow-sm mb-7"
            >
              AI-Powered Healthcare Analytics Platform
            </TextReveal>
<TextReveal
  as="h1"
  className="text-4xl md:text-6xl font-extrabold tracking-tight text-navy leading-tight mb-5"
  delay={0.08}
>
  Next-Generation{' '}
  <span className="text-navy">
    AI Health Analytics
  </span>{' '}
  <span className="inline-flex align-middle items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-primary-light rounded-2xl shadow-sm mx-1">
    <HeartPulse className="text-primary-dark w-6 h-6 md:w-8 md:h-8" />
  </span>
  Platform
</TextReveal>

            <TextReveal
              as="p"
              className="text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed"
              delay={0.16}
            >
              SUBA Health Care Service helps you analyze X-rays, blood reports, and daily vitals - turning raw health data into clear, simple insights.
            </TextReveal>

            <AnimatedCard className="flex flex-col sm:flex-row items-center justify-center gap-4" delay={0.24}>
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
            </AnimatedCard>
          </div>
        </div>

        <AnimatedCard className="relative z-10 max-w-4xl w-full mx-auto px-6 mt-14 text-left" delay={0.12}>
          <div className="rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl shadow-sky-100 overflow-hidden">
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

              <div className="flex-1 p-5">
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
                    <path d="M0 70 L57 55 L114 62 L171 40 L228 48 L285 28 L342 34 L400 18 L400 90 L0 90 Z" fill="url(#chartFill)" />
                    <path d="M0 70 L57 55 L114 62 L171 40 L228 48 L285 28 L342 34 L400 18" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="400" cy="18" r="4" fill="#0284C7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="Problem Statement" title="Why SUBA Health?" center>
          Millions of people receive medical reports but struggle to understand them. SUBA Health simplifies healthcare by using AI to analyze reports and present understandable insights.
        </SectionIntro>
        <div className="grid md:grid-cols-4 gap-4">
          {problemPoints.map((point, index) => (
            <AnimatedCard key={point} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm" delay={index * 0.05}>
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary-dark flex items-center justify-center mb-4">
                <FileCheck2 size={20} />
              </div>
              <p className="font-semibold text-navy">{point}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionIntro eyebrow="Technologies Used" title="Core technology stack" center>
            SUBA Health is developed using React.js for the frontend, Python Flask for the backend, SQLite for database management, and AI technologies including Machine Learning, OCR, NLP, and Computer Vision to analyze medical reports and health records.
          </SectionIntro>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {technologies.map((tech, index) => (
              <AnimatedCard key={tech.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm" delay={index * 0.04}>
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary-dark mb-4">
                  <tech.icon size={24} />
                </div>
                <h3 className="font-bold text-navy">{tech.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{tech.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="How It Works" title="From report upload to recommendations" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {workSteps.map((step, index) => (
            <AnimatedCard key={step.title} className="text-center" delay={index * 0.05}>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm min-h-36 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                  <step.icon size={23} />
                </div>
                <p className="font-semibold text-navy">{step.title}</p>
              </div>
              {index < workSteps.length - 1 && (
                <ArrowDown size={20} className="mx-auto mt-3 text-primary-dark lg:hidden" />
              )}
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionIntro eyebrow="AI Modules" title="Each module solves a clear healthcare task" center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <AnimatedCard key={module.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm" delay={index * 0.05}>
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary-dark flex items-center justify-center mb-5">
                  <module.icon size={24} />
                </div>
                <h3 className="font-bold text-navy text-lg mb-3">{module.title}</h3>
                <ul className="space-y-2">
                  {module.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-primary-dark mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="Workflow Diagram" title="User journey through the AI pipeline" center />
        <FlowRow items={workflow} />
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionIntro eyebrow="Project Architecture" title="System blocks and data flow" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {architecture.map((item, index) => (
              <AnimatedCard key={item.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center" delay={index * 0.05}>
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mx-auto mb-4">
                  <item.icon size={23} />
                </div>
                <p className="font-bold text-navy">{item.title}</p>
                {index < architecture.length - 1 && <ArrowRight size={18} className="hidden lg:block text-primary-dark mx-auto mt-4" />}
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="Screenshots" title="Important application screens" center>
          Add your final project screenshots here when they are ready. These frames are prepared for the required college evaluation screens.
        </SectionIntro>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screen, index) => (
            <AnimatedCard key={screen.title} className={`rounded-2xl border border-slate-100 bg-gradient-to-br ${screen.tone} shadow-sm overflow-hidden`} delay={index * 0.04}>
              <div className="flex items-center gap-2 border-b border-slate-100 bg-white/70 px-4 py-3">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <p className="ml-auto text-xs text-slate-400">{screen.title}</p>
              </div>
              <div className="p-6 min-h-44 flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white text-primary-dark shadow-sm flex items-center justify-center">
                  <screen.icon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-navy">{screen.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Screenshot placeholder</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="bg-primary-light py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionIntro eyebrow="Benefits" title="Why this platform matters" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <AnimatedCard key={benefit} className="bg-white/90 border border-white rounded-2xl p-5 shadow-sm flex items-center gap-3" delay={index * 0.04}>
                <CheckCircle2 className="text-primary-dark shrink-0" size={22} />
                <p className="font-semibold text-navy">{benefit}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="Statistics" title="Project stats" center />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 text-center">
          {projectStats.map((stat, index) => (
            <AnimatedCard key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm" delay={index * 0.04}>
              <p className="text-3xl font-extrabold text-primary-dark">{stat.value}</p>
              <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionIntro eyebrow="Future Scope" title="Future enhancements" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {futureScope.map((item, index) => (
              <AnimatedCard key={item.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm" delay={index * 0.04}>
                <item.icon className="text-primary-dark mb-4" size={24} />
                <p className="font-semibold text-navy">{item.title}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="Meet the Team" title="College project roles" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {team.map((role, index) => (
            <AnimatedCard key={role} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm text-center" delay={index * 0.05}>
              <div className="w-12 h-12 rounded-full bg-primary-light text-primary-dark flex items-center justify-center mx-auto mb-4">
                <UserRound size={23} />
              </div>
              <p className="font-semibold text-navy">{role}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <SectionIntro eyebrow="Research & Objectives" title="Objective">
            Develop an AI-powered healthcare platform capable of analyzing medical reports and assisting users in understanding their health status through Machine Learning and Natural Language Processing.
          </SectionIntro>
          <AnimatedCard className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-navy mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {researchTech.map((tech) => (
                <span key={tech} className="bg-primary-light text-primary-dark text-sm font-semibold px-3 py-1.5 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <SectionIntro eyebrow="FAQ" title="Frequently asked questions" center />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedCard key={faq.question} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm" delay={index * 0.05}>
              <h3 className="font-bold text-navy">{faq.question}</h3>
              <p className="text-slate-600 mt-2">{faq.answer}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      <section className="bg-primary-light py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <TextReveal as="h2" className="text-2xl md:text-3xl font-bold text-navy mb-3">
            Ready to explore SUBA Health?
          </TextReveal>
          <TextReveal as="p" className="text-slate-600 mb-7" delay={0.08}>
            Start analyzing reports, tracking metrics, and understanding health insights in one place.
          </TextReveal>
          <AnimatedCard delay={0.16}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-sky-200 transition-colors group"
            >
              Contact Us
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </AnimatedCard>
        </div>
      </section>
    </div>
  )
}