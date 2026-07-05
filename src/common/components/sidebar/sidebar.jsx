import { NAVIGATION } from '../../constants/navigation.js'
import { NavItem } from './nav_item.jsx'

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span className="text-lg font-bold text-gray-900">Inventario</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAVIGATION.map((item) => (
          <NavItem key={item.name} name={item.name} href={item.href} icon={item.icon} />
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
            U
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">Usuario</p>
            <p className="text-gray-500">admin@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
