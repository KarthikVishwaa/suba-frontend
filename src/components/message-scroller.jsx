import React, { createContext, useContext, useRef, useEffect, useState } from 'react'

// MessageScrollerProvider - owns scroll state and behavior
const MessageScrollerContext = createContext(null)

export function MessageScrollerProvider({ children, autoScroll = true, defaultScrollPosition = 'end' }) {
  const viewportRef = useRef(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(autoScroll)

  const checkIfAtBottom = () => {
    if (!viewportRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = viewportRef.current
    const atBottom = scrollHeight - scrollTop - clientHeight < 50
    setIsAtBottom(atBottom)
  }

  const scrollToEnd = () => {
    if (viewportRef.current) {
      setTimeout(() => {
        viewportRef.current?.scrollTo({
          top: viewportRef.current.scrollHeight,
          behavior: 'smooth',
        })
        setShouldAutoScroll(true)
      }, 0)
    }
  }

  const scrollToStart = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      setShouldAutoScroll(false)
    }
  }

  const scrollToMessage = (messageId) => {
    const element = document.querySelector(`[data-message-id="${messageId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      setShouldAutoScroll(false)
      return true
    }
    return false
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleScroll = () => {
      checkIfAtBottom()
    }

    const handleWheel = () => {
      setShouldAutoScroll(false)
    }

    viewport.addEventListener('scroll', handleScroll)
    viewport.addEventListener('wheel', handleWheel)

    return () => {
      viewport.removeEventListener('scroll', handleScroll)
      viewport.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Auto-scroll to end when new messages arrive and user is at bottom
  useEffect(() => {
    if (autoScroll && shouldAutoScroll && isAtBottom) {
      scrollToEnd()
    }
  }, [autoScroll, shouldAutoScroll, isAtBottom])

  return (
    <MessageScrollerContext.Provider
      value={{
        viewportRef,
        isAtBottom,
        shouldAutoScroll,
        setShouldAutoScroll,
        scrollToEnd,
        scrollToStart,
        scrollToMessage,
      }}
    >
      {children}
    </MessageScrollerContext.Provider>
  )
}

// Hook to use MessageScroller context
export function useMessageScroller() {
  const context = useContext(MessageScrollerContext)
  if (!context) {
    throw new Error('useMessageScroller must be used inside MessageScrollerProvider')
  }
  return context
}

// MessageScroller - the styled container
export function MessageScroller({ children, className = '' }) {
  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      {children}
    </div>
  )
}

// MessageScrollerViewport - the scrollable area
export const MessageScrollerViewport = React.forwardRef(({ children, className = '' }, ref) => {
  const { viewportRef } = useMessageScroller()
  const mergedRef = ref || viewportRef

  return (
    <div
      ref={mergedRef}
      className={`flex-1 overflow-y-auto overflow-x-hidden ${className}`}
      role="region"
      aria-label="Messages"
      tabIndex={0}
    >
      {children}
    </div>
  )
})

MessageScrollerViewport.displayName = 'MessageScrollerViewport'

// MessageScrollerContent - the transcript container
export function MessageScrollerContent({ children, className = '', ...props }) {
  return (
    <div
      className={`flex flex-col w-full ${className}`}
      role="log"
      aria-relevant="additions"
      aria-live="polite"
      {...props}
    >
      {children}
    </div>
  )
}

// MessageScrollerItem - individual message wrapper
export function MessageScrollerItem({ children, messageId, className = '', scrollAnchor = false }) {
  const ref = useRef(null)

  useEffect(() => {
    if (scrollAnchor && ref.current) {
      // Anchor the message near the top when it's first added
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [scrollAnchor])

  return (
    <div ref={ref} data-message-id={messageId} className={className}>
      {children}
    </div>
  )
}

// MessageScrollerButton - scroll to latest button
export function MessageScrollerButton({ className = '' }) {
  const { isAtBottom, scrollToEnd } = useMessageScroller()

  return (
    <button
      onClick={scrollToEnd}
      disabled={isAtBottom}
      inert={isAtBottom ? 'true' : undefined}
      tabIndex={isAtBottom ? -1 : 0}
      data-active={!isAtBottom}
      aria-label="Scroll to latest message"
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 
                  px-4 py-2 rounded-full text-sm font-medium
                  bg-gradient-to-r from-primary to-primary-dark text-white
                  shadow-lg hover:shadow-xl transition-all
                  disabled:opacity-0 disabled:pointer-events-none disabled:invisible
                  ${className}`}
    >
      ↓ Latest
    </button>
  )
}