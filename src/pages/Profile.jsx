import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { User } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <div className="card text-center">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
          <User className="text-primary-dark" size={28} />
        </div>
        <h1 className="text-xl font-bold text-navy">{user.name}</h1>
        <p className="text-slate text-sm mb-6">{user.email}</p>

        <div className="grid grid-cols-3 gap-4 text-sm text-left">
          <div><p className="text-slate">Age</p><strong>{user.age ?? '—'}</strong></div>
          <div><p className="text-slate">Gender</p><strong>{user.gender ?? '—'}</strong></div>
          <div><p className="text-slate">Height</p><strong>{user.height_cm ? `${user.height_cm} cm` : '—'}</strong></div>
        </div>
      </div>
    </div>
  )
}
