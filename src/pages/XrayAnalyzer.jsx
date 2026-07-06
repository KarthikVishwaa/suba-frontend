import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UploadCloud, Eye, Trash2, Loader2, ScanLine, AlertCircle, ArrowLeft,
} from 'lucide-react'
import skeletonImage from '../components/assets/skliton.jpg'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '../components/ui/card'
import { Badge, Skeleton } from '../components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function XrayAnalyzer() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const fileInputRef = useRef(null)

  // clean up object URL when file changes / component unmounts
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  const acceptFile = (f) => {
    if (!f) return
    if (!['image/png', 'image/jpeg'].includes(f.type)) {
      setError('Please upload a PNG or JPG image.')
      return
    }
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError('')
  }

  const handleFileInput = (e) => {
    acceptFile(e.target.files[0])
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    acceptFile(e.dataTransfer.files[0])
  }

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    setResult(null)
    setError('')
  }

  // minimum loading time so the result never flashes in instantly — smoother UX
  const MIN_LOADING_MS = 2000

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    const startedAt = Date.now()
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await api.post('/xray/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      // hold the loading state until at least MIN_LOADING_MS has passed
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS - elapsed))
      }
      setResult(res.data.data)
    } catch (err) {
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS - elapsed))
      }
      setError(err.response?.data?.error || 'Analysis failed')
    } finally {
      setLoading(false)
    }
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
                <li className="text-primary-dark font-semibold">X-Ray Analyzer</li>
              </ol>
            </nav>
          </div>

          {/* title section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative hidden sm:flex">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200 to-primary-light/60 blur-xl opacity-50" />
                <img 
                  src={skeletonImage} 
                  alt="X-ray skeleton" 
                  className="relative w-16 h-16 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight">
                  X-Ray Fracture Analyzer
                </h1>
                <p className="mt-2 text-slate-600 max-w-lg">
                  Upload a high-quality X-ray image to run a lightweight AI-assisted fracture screening powered by computer vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Main content ================= */}
      <div className="relative max-w-4xl mx-auto px-6 pb-10 md:pb-16">
        {/* ---------- Upload card ---------- */}
      <Card className="mb-8 border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)] hover:shadow-[0_8px_32px_rgba(2,132,199,0.1)] transition-shadow duration-300">
        <CardHeader>
          <div>
            <CardTitle className="text-xl">Upload Medical Image</CardTitle>
            <CardDescription className="mt-2">
              Drag and drop your X-ray here, or click to browse. Supports PNG and JPG format.
            </CardDescription>
          </div>
          <CardAction>
            <span className="relative">
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-sky-200 to-primary-light/50 blur-lg opacity-60" />
              <span className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-primary-dark flex items-center justify-center shadow-lg">
                <ScanLine size={19} className="text-white" aria-hidden="true" />
              </span>
            </span>
          </CardAction>
        </CardHeader>

        <CardContent>
          {/* drop zone — shown until a file is chosen */}
          {!file && (
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload X-ray image: drag and drop, or press Enter to browse files"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed
                          px-6 py-16 sm:py-20 text-center cursor-pointer overflow-hidden
                          transition-all duration-300
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                          ${dragging
                            ? 'border-primary bg-gradient-to-b from-sky-100/50 to-primary-light/30 scale-[1.02]'
                            : 'border-slate-200 bg-gradient-to-br from-white via-sky-50/30 to-slate-50/40 hover:border-primary/50 hover:from-sky-50 hover:to-primary-light/20'}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100" aria-hidden="true">
                {dragging && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
                )}
              </div>
              <span className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                                ${dragging 
                                  ? 'bg-gradient-to-br from-primary to-primary-dark scale-110 shadow-xl' 
                                  : 'bg-gradient-to-br from-sky-100 to-primary-light text-primary-dark hover:from-sky-200 hover:to-primary-light/80'}`}>
                <UploadCloud size={28} aria-hidden="true" />
              </span>
              <div className="relative">
                <p className="text-base sm:text-lg font-semibold text-navy">
                  {dragging ? 'Drop your X-ray here' : 'Drag & drop your X-ray, or click to upload'}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  PNG or JPG • Recommended: 256×256 px or larger
                </p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleFileInput}
          />

          {/* attachment preview */}
          {file && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* thumbnail with hover actions */}
              <div className="group relative w-full lg:w-80 shrink-0 rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.08)]">
                <img
                  src={preview}
                  alt={`X-ray preview: ${file.name}`}
                  className="w-full aspect-square object-cover"
                />
                {loading && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={32} className="animate-spin text-primary-dark" aria-label="Analyzing" />
                      <p className="text-xs font-medium text-navy">Analyzing your X-ray…</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 group-hover:from-slate-900/40 transition-all duration-300
                                flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setViewerOpen(true)}
                    aria-label="View image full size"
                    className="w-11 h-11 rounded-full bg-white/95 text-primary-dark flex items-center justify-center
                               hover:bg-white hover:scale-110 transition-all shadow-lg"
                  >
                    <Eye size={19} />
                  </button>
                  <button
                    onClick={removeFile}
                    aria-label="Remove image"
                    className="w-11 h-11 rounded-full bg-white/95 text-danger flex items-center justify-center
                               hover:bg-danger hover:text-white hover:scale-110 transition-all shadow-lg"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>

              {/* file meta + analyze */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="mb-4">
                    <p className="font-semibold text-lg text-navy truncate" title={file.name}>{file.name}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-slate-500 bg-slate-100/60 rounded-full px-3 py-1">{formatBytes(file.size)}</span>
                      {!result && !loading && <Badge variant="outline">Ready to analyze</Badge>}
                      {loading && <Badge variant="secondary" className="animate-pulse">Analyzing</Badge>}
                      {result && (
                        <Badge variant={result.fracture_detected ? 'warning' : 'success'}>
                          {result.fracture_detected ? 'Requires attention' : 'Normal'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* analyzing progress marker */}
                  {loading && (
                    <div className="mt-5 p-4 rounded-xl border border-primary-light/40 bg-gradient-to-r from-sky-50/60 to-primary-light/20" role="status" aria-live="polite">
                      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden mb-2.5">
                        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-sky-400 animate-[analyzebar_1.2s_ease-in-out_infinite]" />
                      </div>
                      <style>{`@keyframes analyzebar { 0% { margin-left: -33% } 100% { margin-left: 100% } }`}</style>
                      <p className="text-xs text-slate-600 font-medium">Processing X-ray with AI models…</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 text-base font-semibold text-white
                               bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                               disabled:opacity-50 disabled:cursor-not-allowed
                               px-6 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                               transition-all duration-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Analyzing…
                      </>
                    ) : result ? (
                      <>
                        <ScanLine size={18} aria-hidden="true" /> Analyze Again
                      </>
                    ) : (
                      <>
                        <ScanLine size={18} aria-hidden="true" /> Analyze X-Ray
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* error */}
          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-danger/20 bg-gradient-to-r from-danger/5 to-danger/[0.03] px-5 py-4 shadow-sm"
            >
              <AlertCircle size={18} className="text-danger mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-danger mb-0.5">Analysis Failed</p>
                <p className="text-sm text-slate-600">{error}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ---------- Result card ---------- */}
      {loading && (
        <Card aria-label="Loading analysis result" className="border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)]">
          <CardHeader>
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <CardAction><Skeleton className="h-7 w-32 rounded-full" /></CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      )}

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
          <Card className="anim-result border-slate-200/80 shadow-[0_4px_24px_rgba(2,132,199,0.12)] bg-gradient-to-br from-white via-sky-50/20 to-white">
            <CardHeader>
              <div>
                <CardTitle className="text-xl">Analysis Complete</CardTitle>
                <CardDescription className="mt-2">AI-powered fracture screening results</CardDescription>
              </div>
              <CardAction>
                <Badge variant={result.fracture_detected ? 'warning' : 'success'} className="px-3 py-1.5 text-xs">
                  {result.fracture_detected ? 'Possible Fracture Detected' : 'No Fracture Detected'}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* confidence bar */}
              <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/80 to-sky-50/40 px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-navy">Confidence Score</span>
                  <span className="text-2xl font-bold tabular-nums bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    {Math.round(result.confidence_score * 100)}%
                  </span>
                </div>
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-slate-200 to-slate-100 overflow-hidden shadow-sm"
                  role="progressbar"
                  aria-valuenow={Math.round(result.confidence_score * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="AI confidence score"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${result.fracture_detected 
                      ? 'bg-gradient-to-r from-warning to-orange-400' 
                      : 'bg-gradient-to-r from-success to-emerald-400'}`}
                    style={{ width: `${Math.round(result.confidence_score * 100)}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-100/60 bg-gradient-to-br from-slate-50/60 to-white px-5 py-4">
                <p className="text-sm font-semibold text-navy mb-2">Clinical Assessment</p>
                <p className="text-sm text-slate-600 leading-relaxed">{result.explanation}</p>
              </div>

              <div className="rounded-xl border border-primary-light/30 bg-gradient-to-r from-sky-50/50 to-primary-light/10 px-4 py-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-navy">Disclaimer:</span> This is an AI screening result, not a medical diagnosis. Always consult a qualified radiologist or healthcare provider for official diagnosis and treatment.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={removeFile}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200
                             hover:border-slate-300 hover:bg-slate-50 transition-all
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Upload Different Image
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
            </CardContent>
          </Card>
        </>
      )}
      </div>

      {/* ---------- Image viewer Dialog ---------- */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-2xl p-4">
          <DialogHeader className="px-2 pt-2">
            <DialogTitle className="truncate">{file?.name}</DialogTitle>
            <DialogDescription>
              {file && formatBytes(file.size)} — X-ray preview
            </DialogDescription>
          </DialogHeader>
          {preview && (
            <div className="rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
              <img src={preview} alt={`Full size X-ray: ${file?.name}`} className="max-h-[65vh] w-auto object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}