import React, { useEffect, useRef } from 'react'

// shadcn/ui Drawer (bottom sheet) — ported to plain JSX (no vaul) for SUBA Health Care
//
// Usage:
//   <Drawer open={open} onOpenChange={setOpen}>
//     <DrawerContent>
//       <DrawerHeader>
//         <DrawerTitle>Title</DrawerTitle>
//         <DrawerDescription>Description</DrawerDescription>
//       </DrawerHeader>
//       ...body...
//       <DrawerFooter>...buttons...</DrawerFooter>
//     </DrawerContent>
//   </Drawer>

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Drawer({ open, onOpenChange, children }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
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
        @keyframes drwOverlayIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes drwContentIn {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .drw-overlay { animation: drwOverlayIn 0.2s ease-out; }
        .drw-content { animation: drwContentIn 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (prefers-reduced-motion: reduce) {
          .drw-overlay, .drw-content { animation: none; }
        }
      `}</style>

      {/* overlay */}
      <div
        className="drw-overlay fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* bottom sheet */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="drw-content fixed inset-x-0 bottom-0 outline-none"
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

export function DrawerContent({ className, children, onOpenChange, ...props }) {
  return (
    <div
      className={cx(
        'mx-auto w-full max-w-lg rounded-t-3xl border border-b-0 border-slate-200 bg-white shadow-2xl',
        'max-h-[85vh] overflow-y-auto px-6 pb-8 pt-3',
        className
      )}
      {...props}
    >
      {/* drag handle */}
      <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" aria-hidden="true" />
      {children}
    </div>
  )
}

export function DrawerHeader({ className, ...props }) {
  return <div className={cx('flex flex-col gap-1.5 mb-4', className)} {...props} />
}

export function DrawerTitle({ className, ...props }) {
  return <h2 className={cx('text-lg font-semibold text-navy leading-none', className)} {...props} />
}

export function DrawerDescription({ className, ...props }) {
  return <p className={cx('text-sm text-slate-500', className)} {...props} />
}

export function DrawerFooter({ className, ...props }) {
  return <div className={cx('flex flex-col gap-2 mt-6', className)} {...props} />
}