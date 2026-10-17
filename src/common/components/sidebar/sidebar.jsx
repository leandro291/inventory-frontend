import { useNavigate } from 'react-router'
import { NAVIGATION } from '../../constants/navigation.js'
import { NavItem } from './nav_item.jsx'
import { useAuthStore } from '../../../features/pages/auth/store/auth-store.js'

export function Sidebar({ open, onClose }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  // En móvil es un drawer: cerrado se oculta con visibility (sale del foco de teclado y del árbol de accesibilidad).
  return (
    <aside
      id="sidebar"
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-[transform,visibility] duration-200 motion-reduce:transition-none lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full max-lg:invisible'
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span className="flex-1 text-lg font-bold text-gray-900">Inventario</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-indigo-600 lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav aria-label="Principal" className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAVIGATION.map((item) => (
          <NavItem key={item.name} name={item.name} href={item.href} icon={item.icon} onNavigate={onClose} />
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
            {user ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0 flex-1 text-sm">
            <p className="truncate font-medium text-gray-900">{user ? `${user.name} ${user.last_name}` : 'Usuario'}</p>
            <p className="truncate text-gray-500">{user?.email || ''}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
