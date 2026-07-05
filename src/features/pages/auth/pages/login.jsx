import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuthStore } from '../store/auth-store.js'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault(); setError(null); setSubmitting(true)
    login(email, password)
      .then(() => navigate('/dashboard', { replace: true }))
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-gray-500">Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Ingresando...
              </>
            ) : 'Ingresar'}
          </button>

          <p className="text-center text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Regístrate</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
