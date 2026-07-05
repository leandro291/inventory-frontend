import { useHome } from './hooks/useHome.js'
import { Header } from './components/Header/header.jsx'

export function HomePage() {
  const { stats, loading, error } = useHome()

  return (
    <main>
      <Header stats={stats} loading={loading} error={error} />
    </main>
  )
}
