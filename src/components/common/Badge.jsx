import React from 'react'

export default function Badge({ status }) {
  const map = {
    Normal: 'badge-normal',
    Low: 'badge-low',
    High: 'badge-high',
  }
  return <span className={map[status] || 'badge-normal'}>{status}</span>
}
