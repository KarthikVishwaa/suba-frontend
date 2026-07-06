import React from 'react'

// shadcn/ui Badge + Skeleton — ported to plain JSX for SUBA Health Care

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

const badgeVariants = {
  default: 'bg-primary text-white',
  secondary: 'bg-primary-light text-primary-dark',
  outline: 'border-slate-200 text-slate-600',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-danger/10 text-danger',
}

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <span
      data-slot="badge"
      className={cx(
        'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  )
}

export function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cx('animate-pulse rounded-md bg-slate-100', className)}
      {...props}
    />
  )
}