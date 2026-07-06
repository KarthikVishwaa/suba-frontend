import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Send,
  Bot,
  ArrowLeft,
  Loader2,
  Sparkles,
  AlertCircle,
  Plus,
  History,
  Trash2,
  X,
  MessageSquare,
} from 'lucide-react'
import aiImage from '../components/assets/bot.png'
import api from '../services/api'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '../components/message-scroller'
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const SUGGESTIONS = [
  'What is Hemoglobin?',
  'What is BMI?',
  'What foods improve iron?',
  'What should I do if my sugar is high?',
]

const DAILY_LIMIT_DEFAULT = 20
const MIN_MESSAGE_LENGTH = 3
const STORAGE_KEY = 'suba_ai_chat_sessions'

// ---------- localStorage helpers ----------
function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {
    // Storage full or unavailable — fail silently, chat still works this session
  }
}

function makeTitle(text) {
  const clean = text.trim().replace(/\s+/g, ' ')
  return clean.length > 34 ? `${clean.slice(0, 34)}…` : clean
}

function relativeTime(iso) {
  const then = new Date(iso)
  const now = new Date()
  const isSameDay = then.toDateString() === now.toDateString()
  if (isSameDay) {
    return then.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (then.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return then.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export default function AIAssistant() {
  const navigate = useNavigate()

  const [sessions, setSessions] = useState([])
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [messages, setMessages] = useState([])

  const [historyOpen, setHistoryOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [usage, setUsage] = useState(null)

  const isFreshChat = useRef(true) // true until first message is sent in this session

  // Load saved sessions + today's usage on mount
  useEffect(() => {
    setSessions(loadSessions())

    const loadUsage = async () => {
      try {
        const res = await api.get('/assistant/usage')
        setUsage(res.data?.data || null)
      } catch (err) {
        console.error('Failed to load usage', err)
      }
    }
    loadUsage()
  }, [])

  const persist = (nextSessions) => {
    setSessions(nextSessions)
    saveSessions(nextSessions)
  }

  const startNewChat = () => {
    setActiveSessionId(null)
    setMessages([])
    setError('')
    setInput('')
    isFreshChat.current = true
    setHistoryOpen(false)
  }

  const selectSession = (id) => {
    const session = sessions.find((s) => s.id === id)
    if (!session) return
    setActiveSessionId(id)
    setMessages(session.messages)
    setError('')
    isFreshChat.current = false
    setHistoryOpen(false)
  }

  const deleteSession = (e, id) => {
    e.stopPropagation()
    const next = sessions.filter((s) => s.id !== id)
    persist(next)
    if (id === activeSessionId) {
      startNewChat()
    }
  }

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim() || input.trim().length < MIN_MESSAGE_LENGTH || loading) return

    const userMsg = input
    const userMessageId = `user-${Date.now()}`
    const botMessageId = `bot-${Date.now()}`

    const messagesWithUser = [
      ...messages,
      { id: userMessageId, role: 'user', text: userMsg, timestamp: new Date().toISOString() },
    ]
    setMessages(messagesWithUser)
    setInput('')
    setError('')
    setLoading(true)

    // Create (or reuse) the session this message belongs to
    let sessionId = activeSessionId
    let workingSessions = sessions

    if (isFreshChat.current) {
      sessionId = `session-${Date.now()}`
      const newSession = {
        id: sessionId,
        title: makeTitle(userMsg),
        messages: messagesWithUser,
        updatedAt: new Date().toISOString(),
      }
      workingSessions = [newSession, ...sessions]
      setActiveSessionId(sessionId)
      isFreshChat.current = false
      persist(workingSessions)
    } else {
      workingSessions = sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: messagesWithUser, updatedAt: new Date().toISOString() } : s
      )
      persist(workingSessions)
    }

    const finalizeMessages = (finalMessages) => {
      setMessages(finalMessages)
      const updated = workingSessions.map((s) =>
        s.id === sessionId ? { ...s, messages: finalMessages, updatedAt: new Date().toISOString() } : s
      )
      persist(updated)
    }

    try {
      const res = await api.post('/assistant/chat', { message: userMsg })

      const finalMessages = [
        ...messagesWithUser,
        {
          id: botMessageId,
          role: 'bot',
          text: res.data.data.response,
          timestamp: new Date().toISOString(),
        },
      ]
      finalizeMessages(finalMessages)

      if (res.data.data.usage) {
        setUsage(res.data.data.usage)
      } else {
        api
          .get('/assistant/usage')
          .then((r) => setUsage(r.data?.data || null))
          .catch(() => {})
      }
    } catch (err) {
      const status = err.response?.status
      let botText = '❌ Sorry, something went wrong. Please try again.'

      if (status === 401) {
        setError('Your session has expired. Please log in again.')
        botText = '⚠️ Your session expired. Please log in again to continue.'
        setTimeout(() => navigate('/login'), 1500)
      } else if (status === 429) {
        const used = err.response?.data?.used
        const limit = err.response?.data?.limit || DAILY_LIMIT_DEFAULT
        const msg =
          used != null
            ? `Daily limit reached (${used}/${limit} messages used today). Please try again tomorrow.`
            : err.response?.data?.error || 'Daily message limit reached. Please try again tomorrow.'
        setError(msg)
        botText = `⏳ ${msg}`
        setUsage({ messages_today: used ?? limit, daily_limit: limit, remaining: 0 })
      } else if (status === 503) {
        setError('The assistant is temporarily unavailable. Please try again shortly.')
        botText = '❌ The assistant is temporarily unavailable. Please try again shortly.'
      } else {
        setError(err.response?.data?.error || 'Failed to get response. Please try again.')
      }

      const finalMessages = [
        ...messagesWithUser,
        {
          id: botMessageId,
          role: 'bot',
          text: botText,
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]
      finalizeMessages(finalMessages)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
  }

  const remaining = usage
    ? Math.max(0, (usage.daily_limit ?? DAILY_LIMIT_DEFAULT) - (usage.messages_today ?? 0))
    : null

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <main className="flex flex-col h-[100dvh] overflow-hidden md:h-auto md:overflow-visible md:min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50 pt-28">
      {/* ================= Hero header with back button ================= */}
      <div className="shrink-0 relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white via-sky-50/30 to-white/60 backdrop-blur-xs">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-sky-200/20 to-primary-light/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-primary-light/20 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 md:py-12">
          {/* breadcrumb + back */}
          <div className="flex items-center justify-between mb-3 sm:mb-6">
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
                <li className="text-primary-dark font-semibold">AI Health Assistant</li>
              </ol>
            </nav>
          </div>

          {/* title section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative hidden sm:flex">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-200 to-primary-light/60 blur-xl opacity-50" />
                <img
                  src={aiImage}
                  alt="AI Assistant"
                  className="relative w-16 h-16 rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy via-primary-dark to-navy bg-clip-text text-transparent tracking-tight">
                  AI Health Assistant
                </h1>
                <p className="hidden sm:block mt-2 text-slate-600 max-w-lg">
                  Ask about health terms, your reports, or lifestyle advice in plain language. Powered by AI.
                </p>
              </div>
            </div>

            {usage && (
              <Badge
                variant={remaining === 0 ? 'destructive' : remaining <= 5 ? 'warning' : 'secondary'}
                className="shrink-0 self-start sm:self-center"
              >
                {remaining ?? '—'} / {usage.daily_limit ?? DAILY_LIMIT_DEFAULT} messages left today
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* ================= Chat section ================= */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-none md:block max-w-4xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-6 md:py-8">
        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="shrink-0 mb-3 sm:mb-4 flex items-start gap-3 rounded-xl border border-danger/20 bg-gradient-to-r from-danger/5 to-danger/[0.03] px-5 py-4 shadow-sm"
          >
            <AlertCircle size={18} className="text-danger mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-danger mb-0.5">Error</p>
              <p className="text-sm text-slate-600">{error}</p>
            </div>
          </div>
        )}

        <Card className="flex-1 min-h-0 md:flex-none border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.08)] flex flex-col overflow-hidden">
          <CardHeader className="shrink-0 border-b border-slate-100/60">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles size={20} aria-hidden="true" className="text-primary-dark" />
                {activeSessionId
                  ? sessions.find((s) => s.id === activeSessionId)?.title || 'Conversation'
                  : 'Conversation'}
              </CardTitle>
              <CardDescription className="mt-1">
                {messages.length === 0 ? 'Start by selecting a suggestion or asking a question' : `${Math.ceil(messages.length / 2)} turn${Math.ceil(messages.length / 2) !== 1 ? 's' : ''}`}
              </CardDescription>
            </div>
            <CardAction className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHistoryOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-primary
                           px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-primary/30 hover:bg-primary-light/30
                           transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <History size={14} aria-hidden="true" />
                <span className="hidden sm:inline">History</span>
              </button>
              <button
                type="button"
                onClick={startNewChat}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-dark
                           px-2.5 py-1.5 rounded-lg border border-primary/20 bg-primary-light/40 hover:bg-primary-light/70
                           transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Plus size={14} aria-hidden="true" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            </CardAction>
          </CardHeader>

          <CardContent className="flex-1 min-h-0 md:flex-none p-0 flex flex-col">
            <MessageScrollerProvider autoScroll defaultScrollPosition="last-anchor">
              <MessageScroller className="flex-1 min-h-0 md:flex-none flex flex-col">
                <MessageScrollerViewport className="flex-1 min-h-0 overflow-y-auto md:flex-none md:h-[480px]">
                  <MessageScrollerContent className="px-4 sm:px-6 py-4 space-y-3">
                    {/* No messages state */}
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-primary-light flex items-center justify-center mb-4">
                          <Bot size={32} className="text-primary-dark" aria-hidden="true" />
                        </div>
                        <p className="text-navy font-semibold mb-2">Start a conversation</p>
                        <p className="text-slate-500 text-sm mb-6 max-w-xs">
                          Ask me about health terms, your reports, or lifestyle advice.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {SUGGESTIONS.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-gradient-to-r from-sky-100 to-primary-light text-primary-dark px-3 py-1.5 rounded-full
                                         hover:from-sky-200 hover:to-primary-light/80 transition-all shadow-sm"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Messages */}
                    {messages.map((message) => (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={message.role === 'user'}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                      >
                        <div
                          className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-br-none shadow-md shadow-sky-200/40'
                              : message.isError
                              ? 'bg-gradient-to-br from-danger/10 to-danger/5 text-danger border border-danger/20 rounded-bl-none'
                              : 'bg-gradient-to-br from-slate-50 to-sky-50/40 text-navy border border-slate-100/60 rounded-bl-none'
                          }`}
                        >
                          {message.text}
                        </div>
                      </MessageScrollerItem>
                    ))}

                    {/* Loading indicator */}
                    {loading && (
                      <MessageScrollerItem messageId="loading-indicator">
                        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-100/60 w-fit">
                          <Loader2 size={16} className="animate-spin text-primary-dark" aria-hidden="true" />
                          <span className="text-sm text-slate-600">Assistant is thinking…</span>
                        </div>
                      </MessageScrollerItem>
                    )}
                  </MessageScrollerContent>
                </MessageScrollerViewport>

                {/* Scroll to latest button */}
                <MessageScrollerButton className="m-4 mt-2 shrink-0" />
              </MessageScroller>
            </MessageScrollerProvider>

            {/* Input form — pinned at the bottom on mobile (page is fixed-height), sticks within the card on desktop */}
            <form
              onSubmit={send}
              className="shrink-0 sticky bottom-0 z-10 flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100/60 bg-white/95 backdrop-blur-sm"
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <input
                type="text"
                placeholder="Ask a health question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading || remaining === 0}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-navy
                           placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                           focus:border-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />

              {input.trim().length > 0 && input.trim().length < MIN_MESSAGE_LENGTH ? (
                <span className="shrink-0 text-xs text-slate-400 px-2 whitespace-nowrap">
                  Enter at least {MIN_MESSAGE_LENGTH} characters
                </span>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !input.trim() || remaining === 0}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white
                             bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                             disabled:opacity-50 disabled:cursor-not-allowed
                             px-5 py-2.5 rounded-lg shadow-[0_4px_16px_rgba(2,132,199,0.3)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]
                             transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shrink-0"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={16} aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline">{loading ? 'Sending…' : 'Send'}</span>
                </button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Info text */}
        <p className="hidden md:block text-xs text-slate-500 text-center mt-4">
          Powered by AI • responses are educational, not medical advice.
        </p>
      </div>

      {/* ================= History panel (compact slide-over, not full screen) ================= */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-navy/30"
            onClick={() => setHistoryOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-navy flex items-center gap-2">
                <History size={16} className="text-primary-dark" aria-hidden="true" /> Chat History
              </h2>
              <button
                type="button"
                onClick={() => setHistoryOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-primary-light/30 transition-all"
                aria-label="Close"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="p-3">
              <button
                type="button"
                onClick={startNewChat}
                className="w-full inline-flex items-center gap-2 justify-center text-sm font-semibold text-white
                           bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary
                           px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <Plus size={16} aria-hidden="true" /> New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
              {sortedSessions.length === 0 && (
                <p className="text-xs text-slate-400 text-center px-4 py-8">
                  No past chats yet. Start a conversation to see it here.
                </p>
              )}

              {sortedSessions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectSession(s.id)}
                  className={`group w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl transition-all ${
                    s.id === activeSessionId
                      ? 'bg-primary-light/50 text-primary-dark'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare size={15} className="shrink-0 opacity-60" aria-hidden="true" />
                  <span className="flex-1 min-w-0 truncate text-sm">{s.title || 'New Chat'}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{relativeTime(s.updatedAt)}</span>
                  <span
                    role="button"
                    onClick={(e) => deleteSession(e, s.id)}
                    className="opacity-0 group-hover:opacity-100 shrink-0 p-1 rounded-md text-slate-400 hover:text-danger hover:bg-danger/10 transition-all"
                    aria-label="Delete chat"
                  >
                    <Trash2 size={13} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}