import { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './router/index.jsx'
import { useAuthStore } from './features/pages/auth/store/auth-store.js'

function App() {
  const init = useAuthStore((s) => s.init)

  useEffect(() => { init() }, [init])

  return <RouterProvider router={router} />
}

export default App
