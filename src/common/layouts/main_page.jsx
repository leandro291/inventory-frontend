import { Outlet } from 'react-router'
import { Sidebar } from '../components/sidebar/sidebar.jsx'

export function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pl-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
