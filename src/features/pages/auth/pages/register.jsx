import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuthStore } from '../store/auth-store.js'
import { getRoles } from '../../roles/services/roleService.js'

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', last_name: '', email: '', password: '', id_role: '' })
  const [roles, setRoles] = useState([])
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const register = useAuthStore((s) => s.register)
  const navigate = useNavigate()

  useEffect(() => {
    getRoles()
      .then((data) => setRoles(Array.isArray(data) ? data : []))
      .catch(() => setRoles([]))
  }, [])

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleSubmit(e) {
    e.preventDefault(); setError(null); setSubmitting(true)
    register({ ...form, id_role: Number(form.id_role) })
      .then(() => navigate('/login', { replace: true }))
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
          <h1 className="text-2xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="mt-1 text-sm text-gray-500">Regístrate para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
              <input name="name" value={form.name} onChange={handleChange} required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Apellido</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Rol</label>
            <select name="id_role" value={form.id_role} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none">
              <option value="">Seleccionar rol</option>
              {roles.map((r) => (
                <option key={r.id_role} value={r.id_role}>{r.name}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Registrando...
              </>
            ) : 'Registrarse'}
          </button>

          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
