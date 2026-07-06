import React from 'react'

// shadcn/ui Card — ported to plain JSX for SUBA Health Care
// Usage: <Card><CardHeader><CardTitle/>...</CardHeader><CardContent/></Card>

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cx(
        'flex flex-col gap-5 rounded-xl border border-slate-200 bg-white py-5 text-navy shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cx('flex items-start justify-between gap-2 px-5', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, as: Comp = 'h3', ...props }) {
  return (
    <Comp
      data-slot="card-title"
      className={cx('leading-none font-semibold text-navy', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cx('text-sm text-slate-500', className)}
      {...props}
    />
  )
}

export function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cx('shrink-0 self-start', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cx('px-5', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return (
    <div data-slot="card-footer" className={cx('flex items-center px-5', className)} {...props} />
  )
}