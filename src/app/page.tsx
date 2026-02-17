'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState<'login' | 'change-password' | 'verify-email'>('login')
  const [formData, setFormData] = useState({ username: '', password: '', new_password: '', confirm_password: '', code: '' })
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('http://localhost:8000/api/adminapp/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: formData.username, password: formData.password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        if (data.must_change_password) {
          setStep('change-password')
        } else if (!data.email_verified) {
          await fetch('http://localhost:8000/api/adminapp/send-verification/', {
            method: 'POST',
            credentials: 'include'
          })
          setStep('verify-email')
        } else {
          router.push(`/${data.department}`)
        }
      } else {
        setError('Invalid username or password')
      }
    } catch {
      setError('Network error')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (formData.new_password !== formData.confirm_password) {
      setError('Passwords do not match')
      return
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/adminapp/change-password/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ new_password: formData.new_password, confirm_password: formData.confirm_password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        await fetch('http://localhost:8000/api/adminapp/send-verification/', {
          method: 'POST',
          credentials: 'include'
        })
        setStep('verify-email')
      }
    } catch {
      setError('Network error')
    }
  }

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('http://localhost:8000/api/adminapp/verify-email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: formData.code })
      })
      
      const data = await response.json()
      
      if (data.success) {
        const authResponse = await fetch('http://localhost:8000/api/adminapp/check-auth/', {
          credentials: 'include'
        })
        const authData = await authResponse.json()
        router.push(`/${authData.user.department}`)
      } else {
        setError('Invalid verification code')
      }
    } catch {
      setError('Network error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center" style={{fontFamily: 'Inter, sans-serif'}}>QMSync</h1>
        
        {error && <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>}
        
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" required value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
          </form>
        )}
        
        {step === 'change-password' && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">You must change your password before continuing.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" required value={formData.new_password} onChange={(e) => setFormData({...formData, new_password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input type="password" required value={formData.confirm_password} onChange={(e) => setFormData({...formData, confirm_password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Change Password</button>
          </form>
        )}
        
        {step === 'verify-email' && (
          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">A verification code has been sent to your email.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
              <input type="text" required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded" maxLength={6} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Verify Email</button>
          </form>
        )}
      </div>
    </div>
  )
}
