import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

// shadcn/ui Dialog — ported to plain JSX (no radix) for SUBA Health Care
// A window overlaid on the primary window, rendering the content underneath inert.
//
// Usage:
//   <Dialog open={open} onOpenChange={setOpen}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Title</DialogTitle>
//         <DialogDescription>Description</DialogDescription>
//       </DialogHeader>
//       ...body...
//       <DialogFooter>...buttons...</DialogFooter>
//     </DialogContent>
//   </Dialog>

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Dialog({ open, onOpenChange, children }) {
  const contentRef = useRef(null)

  // Escape closes, body scroll locks, focus moves into the dialog
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // move focus into the dialog for keyboard users
    requestAnimationFrame(() => contentRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      <style>{`
        @keyframes dlgOverlayIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes dlgContentIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .dlg-overlay { animation: dlgOverlayIn 0.15s ease-out; }
        .dlg-content { animation: dlgContentIn 0.18s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .dlg-overlay, .dlg-content { animation: none; }
        }
      `}</style>

      {/* overlay — clicking it closes; content underneath is inert */}
      <div
        className="dlg-overlay fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* content */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="dlg-content fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[calc(100%-2rem)] max-w-lg outline-none"
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { onOpenChange })
            : child
        )}
      </div>
    </div>
  )
}

export function DialogContent({ className, children, onOpenChange, hideClose = false, ...props }) {
  return (
    <div
      className={cx(
        'relative rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl',
        className
      )}
      {...props}
    >
      {!hideClose && (
        <button
          onClick={() => onOpenChange?.(false)}
          aria-label="Close dialog"
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-lg
                     text-slate-400 hover:text-navy hover:bg-slate-100
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                     transition-colors"
        >
          <X size={16} />
        </button>
      )}
      {children}
    </div>
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cx('flex flex-col gap-1.5 mb-4 pr-8', className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cx('text-lg font-semibold text-navy leading-none', className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
  return <p className={cx('text-sm text-slate-500', className)} {...props} />
}

export function DialogFooter({ className, ...props }) {
  return <div className={cx('flex justify-end gap-2 mt-5', className)} {...props} />
}