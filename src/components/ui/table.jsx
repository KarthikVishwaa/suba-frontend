import React from 'react'

// shadcn/ui Table — ported to plain JSX for SUBA Health Care

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Table({ className, ...props }) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cx('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cx('[&_tr]:border-b [&_tr]:border-slate-200', className)}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cx('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

export function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cx('border-t border-slate-200 bg-slate-50/60 font-medium', className)}
      {...props}
    />
  )
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cx(
        'border-b border-slate-100 transition-colors hover:bg-sky-50/50 data-[state=selected]:bg-sky-50',
        className
      )}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cx(
        'h-10 px-3 text-left align-middle font-semibold whitespace-nowrap text-slate-500 text-xs uppercase tracking-wide',
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cx('p-3 align-middle whitespace-nowrap text-navy', className)}
      {...props}
    />
  )
}

export function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cx('mt-4 text-sm text-slate-500', className)}
      {...props}
    />
  )
}